export class CreateOrderDto {
    userId: number;
    shippingAddressId: number;
    products: {
      productId: number;
      quantity: number;
    }[];
  }