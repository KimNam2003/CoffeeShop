import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderService } from '../service/order.sevice';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Tạo mới đơn hàng
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  // Lấy tất cả đơn hàng của một người dùng
  @Get('user/:userId')
  async getUserOrders(@Param('userId') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  // Lấy thông tin chi tiết đơn hàng
  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: number) {
    return this.orderService.getOrderDetails(orderId);
  }

  // Cập nhật thông tin đơn hàng (trạng thái, phương thức thanh toán, v.v)
  @Patch(':orderId')
  async updateOrder(
    @Param('orderId') orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }

  // Hủy đơn hàng
  @Patch(':orderId/cancel')
  async cancelOrder(@Param('orderId') orderId: number) {
    return this.orderService.cancelOrder(orderId);
  }

  // Xóa đơn hàng
  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: number) {
    return this.orderService.deleteOrder(orderId);
  }

  // Tìm kiếm đơn hàng theo trạng thái hoặc userId
  @Get('search')
  async searchOrders(
    @Param('status') status: string,
    @Param('userId') userId: number,
  ) {
    return this.orderService.searchOrders(status, userId);
  }

  // Kiểm tra trạng thái đơn hàng
  @Get(':orderId/status')
  async checkOrderStatus(@Param('orderId') orderId: number) {
    return this.orderService.checkOrderStatus(orderId);
  }
}
