CREATE DATABASE CoffeeShop_db;
USE CoffeeShop_db;

-- Bảng Users (Người dùng)
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã người dùng
    FullName VARCHAR(255) NOT NULL,  -- Tên người dùng
    Email VARCHAR(255) NOT NULL UNIQUE,  -- Địa chỉ email
    Password VARCHAR(255) NOT NULL,  -- Mật khẩu
    AvatarURL VARCHAR(255),  -- URL ảnh đại diện
    Role ENUM('customer', 'employee', 'admin') DEFAULT 'customer',  -- Vai trò người dùng
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo tài khoản
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Thời gian cập nhật tài khoản
);

-- Bảng Addresses (Địa chỉ)
CREATE TABLE Addresses (
    AddressID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,  -- Liên kết với bảng Users
    Address TEXT,
    PhoneNumber VARCHAR(15),   -- Số điện thoại liên quan đến địa chỉ
    IsPrimary BOOLEAN DEFAULT FALSE,  -- Địa chỉ chính hay không
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)  -- Sửa tên CustomerID thành UserID
);

-- Bảng Categories (Danh mục sản phẩm)
CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã danh mục
    Name VARCHAR(100) NOT NULL,  -- Tên danh mục (VD: Đồ uống, Món ăn)
    Description TEXT,  -- Mô tả về danh mục
    IsActive BOOLEAN DEFAULT TRUE,  -- Trạng thái hoạt động của danh mục
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo danh mục
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Thời gian cập nhật danh mục
);

-- Bảng Products (Thông tin sản phẩm chung)
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã sản phẩm
    Name VARCHAR(255) NOT NULL,  -- Tên sản phẩm
    Description TEXT,  -- Mô tả sản phẩm
    Price DECIMAL(10, 2) NOT NULL,  -- Giá sản phẩm cơ bản
    IsAvailable BOOLEAN DEFAULT TRUE,  -- Trạng thái có sẵn chung cho sản phẩm
    StockQuantity INT DEFAULT 0,  -- Tồn kho chung cho sản phẩm
    IsActive BOOLEAN DEFAULT TRUE,  -- Trạng thái hoạt động của sản phẩm
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo sản phẩm
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Thời gian cập nhật sản phẩm
);

-- Bảng ProductVariants (Biến thể sản phẩm)
CREATE TABLE ProductVariants (
    VariantID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT NOT NULL,
    VariantName VARCHAR(100) NOT NULL,  -- Ví dụ: Size M, Topping Trân Châu
    Price DECIMAL(10,2) NOT NULL,  -- Giá cho biến thể
    StockQuantity INT DEFAULT 0,  -- Số lượng tồn kho cho biến thể
    IsAvailable BOOLEAN DEFAULT TRUE,  -- Tình trạng có sẵn cho biến thể
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- Bảng ProductCategories (Danh mục sản phẩm)
CREATE TABLE ProductCategories (
    ProductID INT,  -- Mã sản phẩm
    CategoryID INT,  -- Mã danh mục
    PRIMARY KEY (ProductID, CategoryID),  -- Khóa chính là sự kết hợp giữa sản phẩm và danh mục
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE,  -- Liên kết với bảng Products
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE  -- Liên kết với bảng Categories
);

-- Bảng Orders (Đơn hàng)
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã đơn hàng
    UserID INT,  -- Mã khách hàng (Liên kết với bảng Users)
    ShippingAddressID INT,  -- ID địa chỉ giao hàng từ bảng Addresses
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo đơn hàng
    Status ENUM('Pending', 'Completed', 'Canceled', 'InProgress') DEFAULT 'Pending',  -- Trạng thái đơn hàng
    TotalAmount DECIMAL(10, 2) NOT NULL,  -- Tổng giá trị đơn hàng
    DiscountAmount DECIMAL(10, 2) DEFAULT 0,  -- Giá trị giảm giá (nếu có)
    PaymentStatus ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',  -- Trạng thái thanh toán
    ShippingType ENUM('Delivery', 'Pickup') DEFAULT 'Delivery',  -- Phương thức giao hàng
    PaymentMethod ENUM('Cash', 'CreditCard', 'E-Wallet', 'BankTransfer') DEFAULT 'Cash',  -- Phương thức thanh toán
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo đơn hàng
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Thời gian cập nhật đơn hàng
    FOREIGN KEY (UserID) REFERENCES Users(UserID),  -- Liên kết với bảng Users
    FOREIGN KEY (ShippingAddressID) REFERENCES Addresses(AddressID)  -- Liên kết với bảng Addresses
);

-- Bảng OrderDetails (Chi tiết đơn hàng)
CREATE TABLE OrderDetails (
    OrderDetailID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã chi tiết đơn hàng
    OrderID INT,  -- Mã đơn hàng
    ProductID INT,  -- Mã sản phẩm
    VariantID INT,  -- Mã biến thể sản phẩm (nếu có)
    Quantity INT NOT NULL,  -- Số lượng sản phẩm
    Price DECIMAL(10, 2) NOT NULL,  -- Giá sản phẩm tại thời điểm đặt hàng
    Total DECIMAL(10, 2) NOT NULL,  -- Tổng tiền cho sản phẩm (Quantity * Price)
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo chi tiết đơn hàng
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),  -- Liên kết với bảng Orders
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),  -- Liên kết với bảng Products
    FOREIGN KEY (VariantID) REFERENCES ProductVariants(VariantID)  -- Liên kết với bảng ProductVariants (nếu có)
);

-- Bảng Promotions (Khuyến mãi)
CREATE TABLE Promotions (
    PromotionID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    StartDate DATETIME,
    EndDate DATETIME,
    DiscountType ENUM('Percentage', 'FixedPrice', 'BuyOneGetOne') NOT NULL,  -- Loại khuyến mãi (Percentage, FixedAmount)
    DiscountValue DECIMAL(10, 2)
);

-- Bảng ProductPromotions (Khuyến mãi sản phẩm)
CREATE TABLE ProductPromotions (
    ProductID INT,
    PromotionID INT,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (PromotionID) REFERENCES Promotions(PromotionID)
);

-- Bảng Carts (Giỏ hàng)
CREATE TABLE Carts (
    CartID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã giỏ hàng
    UserID INT,  -- Mã khách hàng
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo giỏ hàng
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Thời gian cập nhật giỏ hàng
    FOREIGN KEY (UserID) REFERENCES Users(UserID)  -- Liên kết với bảng Users
);

-- Bảng CartItems (Mục giỏ hàng)
CREATE TABLE CartItems (
    CartItemID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã mục giỏ hàng
    CartID INT,  -- Mã giỏ hàng
    ProductID INT,  -- Mã sản phẩm
    VariantID INT,  -- ID biến thể sản phẩm (nếu có)
    Quantity INT NOT NULL,  -- Số lượng sản phẩm
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian thêm vào giỏ hàng
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Thời gian cập nhật giỏ hàng
    FOREIGN KEY (CartID) REFERENCES Carts(CartID) ON DELETE CASCADE,  -- Liên kết với bảng Carts
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),  -- Liên kết với bảng Products
    FOREIGN KEY (VariantID) REFERENCES ProductVariants(VariantID)  -- Liên kết với bảng ProductVariants (nếu có)
);

-- Bảng Reviews (Đánh giá sản phẩm)
CREATE TABLE Reviews (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã đánh giá
    ProductID INT,  -- Mã sản phẩm
    UserID INT,  -- Mã khách hàng
    Rating INT,  -- Điểm đánh giá (1-5 sao)
    Comment TEXT,  -- Nội dung đánh giá
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian đánh giá
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Thời gian cập nhật
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),  -- Liên kết với sản phẩm
    FOREIGN KEY (UserID) REFERENCES Users(UserID)  -- Liên kết với khách hàng
);

-- Bảng Feedback (Phản hồi)
CREATE TABLE Feedback (
    FeedbackID INT AUTO_INCREMENT PRIMARY KEY,  -- Mã phản hồi
    UserID INT,  -- Mã khách hàng
    FeedbackType ENUM('Product', 'Service', 'Shipping') NOT NULL,  -- Loại phản hồi (Sản phẩm, Dịch vụ, Vận chuyển...)
    Message TEXT,  -- Nội dung phản hồi
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian gửi phản hồi
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Thời gian cập nhật
    FOREIGN KEY (UserID) REFERENCES Users(UserID)  -- Liên kết với khách hàng
);

