// Global Types based on Prisma schema
// These types mirror your Prisma models for frontend use.

export type Role = "USER" | "ADMIN"
export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELED"

export interface UserType {
    id: number
    name: string
    email: string
    password?: string
    role: Role
    image?: string | null
    createdAt: string
    updatedAt: string
}

export interface CategoryType {
    id: number
    name: string
    createdAt: string
}

export interface ProductType {
    id: number
    name: string
    description?: string
    price: number
    stock: number
    image?: string | null
    categoryId: number
    userId: number
    createdAt: string
    updatedAt: string
    category?: CategoryType
    user?: UserType
}

export interface CartItemType {
    id: number
    cartId: number
    productId: number
    quantity: number
    product?: ProductType
}

export interface CartType {
    id: number
    userId: number
    items: CartItemType[]
    updatedAt: string
}

export interface WishlistType {
    id: number
    userId: number
    productId: number
    createdAt: string
    product?: ProductType
}

export interface OrderItemType {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: number
    product?: ProductType
}

export interface PaymentType {
    id: number
    method: string
    status: string
    transactionId?: string | null
    createdAt: string
}

export interface ShippingType {
    id: number
    courier: string
    trackingId?: string | null
    status: string
    shippedAt?: string | null
    deliveredAt?: string | null
    address: string
    city: string
    province: string
    postalCode: string
}

export interface CouponType {
    id: number
    code: string
    discount: number
    validFrom: string
    validTo: string
    isActive: boolean
}

export interface OrderType {
    id: number
    userId: number
    total: number
    status: OrderStatus
    paymentId?: number | null
    shippingId?: number | null
    couponId?: number | null
    createdAt: string
    updatedAt: string
    items?: OrderItemType[]
    payment?: PaymentType
    shipping?: ShippingType
    coupon?: CouponType
}

export interface AddressType {
    id: number
    userId: number
    label: string
    recipient: string
    phone: string
    address: string
    city: string
    province: string
    postalCode: string
    isDefault: boolean
}

export interface ActivityLogType {
    id: number
    userId: number
    action: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt: string
}

export interface NotificationType {
    id: number
    userId: number
    title: string
    message: string
    isRead: boolean
    createdAt: string
}

export interface ReviewType {
    id: number
    userId: number
    productId: number
    rating: number
    comment?: string | null
    createdAt: string
    user?: UserType
    product?: ProductType
}

export interface HistoryType {
    id: number
    userId: number
    action: string
    detail?: string | null
    createdAt: string
}
