
// import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ProductImage } from 'src/databases/entities/product-image.entity';
// import { Product } from 'src/databases/entities/product.entity';
// import { User } from 'src/databases/entities/user.entity';
// import { Order } from 'src/databases/entities/order.entity';
// import { OrderDetail } from 'src/databases/entities/orderDetai.entity';
// import { CreateOrderDto } from '../dtos/create-order.dto';


// @Injectable()
// export class OrderService {

//   constructor(
//     @InjectRepository(User)
//     private userRepository :Repository<User>,

//     @InjectRepository(Product)
//     private productRepository :Repository<Product>,
    
//     @InjectRepository(Order)
//     private orderRepository :Repository<Order>,

//     @InjectRepository(OrderDetail)
//     private OrderDetailRepository :Repository<OrderDetail>,
//   ) {}

// async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
//     const { userId, Payme, orderDetails } = createOrderDto;

//     // Kiểm tra người dùng tồn tại
//     const user = await this.userRepository.findOne({ where: { UserID: userId } });
//     if (!user) throw new NotFoundException('User not found');

//     // Kiểm tra role của user có phải là 'customer' hay không
//     if (user.Role !== 'customer') {
//       throw new ForbiddenException('Only customers can place orders');
//     }

//     // Tạo đơn hàng mới
//     const order = this.orderRepository.create({
//       user,
//       paymentMethod,
//       Status: 'Pending',  // Trạng thái mặc định
//       TotalAmount: 0,     // Tổng giá trị sẽ tính sau
//     });

//     const savedOrder = await this.orderRepository.save(order);

//     let totalAmount = 0;
//     const detailsToSave: OrderDetail[] = [];

//     for (const detailDto of orderDetails) {
//       const product = await this.productRepository.findOne({
//         where: { productId: detailDto.productID },
//       });

//       if (!product) throw new NotFoundException('Product not found');
    
//       console.log('savedOrder:', savedOrder);
//       const detail = this.orderDetailRepository.create({
//         order: savedOrder,
//         product,
//         Quantity: detailDto.quantity,
//         Price: product.price,  // Dùng giá của sản phẩm
//       });

//       detailsToSave.push(detail);

//       totalAmount += product.price * detailDto.quantity;  // Cập nhật tổng giá trị đơn hàng
//     }

//     // Lưu thông tin chi tiết đơn hàng
//     await this.orderDetailRepository.save(detailsToSave);

//     // Cập nhật tổng giá trị của đơn hàng
//     savedOrder.TotalAmount = totalAmount;
//     await this.orderRepository.save(savedOrder);

//     // Trả về đơn hàng đã lưu với các chi tiết
//     const fullOrder = await  this.orderRepository.findOne({
//       where: { OrderID: savedOrder.OrderID },
//       relations: ['orderDetails', 'orderDetails.product', 'user'],
//     });
//     if (!fullOrder) throw new NotFoundException('Order not found');
//       return fullOrder;
//   } 
// }