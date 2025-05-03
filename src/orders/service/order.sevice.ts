import { Address } from 'src/databases/entities/address.entity';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/databases/entities/product.entity';
import { User } from 'src/databases/entities/user.entity';
import { Order } from 'src/databases/entities/order.entity';
import { OrderDetail } from 'src/databases/entities/orderDetai.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  // Tạo đơn hàng mới
  async createOrder(createOrderDto: CreateOrderDto) {
    const { shippingAddressId, userId, orderDetails, paymentMethod } = createOrderDto;

    // Kiểm tra người dùng tồn tại
    const user = await this.userRepository.findOne({ where: { UserID: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Kiểm tra role của user có phải là 'customer' hay không
    if (user.Role !== 'customer') {
      throw new ForbiddenException('Only customers can place orders');
    }

    const address = await this.addressRepository.findOne({ where: { AddressID: shippingAddressId } });
    if (!address) throw new NotFoundException('Address not found');

    // Tạo đơn hàng mới
    const order = this.orderRepository.create({
      User: user,
      ShippingAddress: address,
      PaymentMethod: paymentMethod,
      TotalAmount: 0, // Tổng giá trị sẽ tính sau
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalAmount = 0;
    const detailsToSave: OrderDetail[] = [];

    for (const detailDto of orderDetails) {
      const product = await this.productRepository.findOne({
        where: { ProductID: detailDto.productId },
      });

      if (!product) throw new NotFoundException('Product not found');
    
      const detail = this.orderDetailRepository.create({
        Order: savedOrder,
        Product: product,
        Quantity: detailDto.quantity,
        Price: product.Price,
        Total: detailDto.quantity * product.Price, // Dùng giá của sản phẩm
      });

      detailsToSave.push(detail);

      totalAmount += detail.Total; // Cập nhật tổng giá trị đơn hàng
    }

    // Lưu thông tin chi tiết đơn hàng
    await this.orderDetailRepository.save(detailsToSave);

    // Cập nhật tổng giá trị của đơn hàng
    savedOrder.TotalAmount = totalAmount;
    await this.orderRepository.save(savedOrder);

    // Trả về đơn hàng đã lưu với các chi tiết
    const fullOrder = await this.orderRepository.findOne({
      where: { OrderID: savedOrder.OrderID },
      relations: ['OrderDetails', 'User.Orders', 'OrderDetails.Product', 'User', 'OrderDetails.Order', 'OrderDetails.Variant', 'ShippingAddress'],
    });

    if (!fullOrder) throw new NotFoundException('Order not found');
    return fullOrder;
  }

  // Lấy tất cả đơn hàng của người dùng
  async getUserOrders(userId: number) {
    const user = await this.userRepository.findOne({
      where: { UserID: userId },
      relations: ['Orders', 'Orders.OrderDetails', 'Orders.ShippingAddress'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user.Orders;
  }

  // Lấy thông tin chi tiết đơn hàng
  async getOrderDetails(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { OrderID: orderId },
      relations: ['OrderDetails', 'OrderDetails.Product', 'ShippingAddress', 'User'],
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  // Cập nhật thông tin đơn hàng
  async updateOrder(orderId: number, updateOrderDto: any) {
    const order = await this.orderRepository.findOne({ where: { OrderID: orderId } });

    if (!order) throw new NotFoundException('Order not found');

    // Cập nhật thông tin theo yêu cầu từ updateOrderDto
    order.Status = updateOrderDto.status || order.Status;
    order.PaymentMethod = updateOrderDto.paymentMethod || order.PaymentMethod;

    await this.orderRepository.save(order);

    return order;
  }

  // Hủy đơn hàng
  async cancelOrder(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { OrderID: orderId },
    });

    if (!order) throw new NotFoundException('Order not found');
    
    // Kiểm tra nếu đơn hàng đã thanh toán hay chưa
    if (order.PaymentStatus === 'Paid') {
      throw new ForbiddenException('Cannot cancel a paid order');
    }

    order.Status = 'Cancelled'; // Cập nhật trạng thái đơn hàng
    await this.orderRepository.save(order);

    return order;
  }

  // Xóa đơn hàng
  async deleteOrder(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { OrderID: orderId },
    });

    if (!order) throw new NotFoundException('Order not found');

    // Kiểm tra nếu đơn hàng có chi tiết và các phụ thuộc liên quan, nếu không có khóa ngoại sẽ không thể xóa
    await this.orderDetailRepository.delete({ Order: order });
    await this.orderRepository.delete(orderId);

    return { message: 'Order deleted successfully' };
  }

  // Tìm kiếm đơn hàng theo điều kiện (trạng thái, người dùng)
  async searchOrders(status?: string, userId?: number) {
    const query = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.User', 'user')
      .leftJoinAndSelect('order.OrderDetails', 'orderDetails')
      .leftJoinAndSelect('order.ShippingAddress', 'address')
      .where('order.Status = :status', { status })
      .orWhere('order.UserID = :userId', { userId });

    const orders = await query.getMany();

    return orders;
  }

  // Kiểm tra tình trạng của đơn hàng
  async checkOrderStatus(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { OrderID: orderId },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order.Status; // Trả về trạng thái hiện tại của đơn hàng
  }
}
