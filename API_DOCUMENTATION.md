# Food Order Application - API Documentation

## Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.foodorder.com/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## User Authentication Endpoints

### Register User
**POST** `/auth/users/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "newUser": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Login User
**POST** `/auth/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### Logout User
**GET** `/auth/users/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Get User Profile
**GET** `/auth/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Admin Authentication Endpoints

### Register Admin
**POST** `/auth/admin/register`

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "admin": {
    "_id": "admin_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Login Admin
**POST** `/auth/admin/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin logged in successfully",
  "admin": {
    "_id": "admin_id",
    "name": "Admin User",
    "email": "admin@example.com"
  },
  "token": "jwt_token_here"
}
```

### Logout Admin
**GET** `/auth/admin/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Admin logout successful"
}
```

### Get Admin Profile
**GET** `/auth/admin/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "admin_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Order Management Endpoints

### Create Order
**POST** `/user/order/create-order`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "items": [
    {
      "name": "Chicken Biryani",
      "quantity": 2,
      "price": 150
    },
    {
      "name": "Paneer Curry",
      "quantity": 1,
      "price": 120
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "order_id",
    "user": "user_id",
    "items": [
      {
        "name": "Chicken Biryani",
        "quantity": 2,
        "price": 150
      }
    ],
    "totalPrice": 420,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Cancel Order
**PATCH** `/user/order/cancel-order/:orderId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "_id": "order_id",
    "status": "cancelled",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Track Order
**GET** `/user/order/track-order/:orderId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "user": "user_id",
    "items": [...],
    "totalPrice": 420,
    "status": "preparing",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:30:00.000Z"
  }
}
```

## Tiffin Management Endpoints

### Get All Tiffins (User)
**GET** `/user/tiffin`

**Query Parameters:**
- `category` (optional): Filter by category
- `available` (optional): Filter by availability

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "tiffin_id",
      "name": "Regular Thali",
      "category": "Regular",
      "items": ["Rice", "Dal", "Sabzi", "Roti"],
      "price": 100,
      "specialToday": "Extra Pickle",
      "image": "image_url",
      "description": "Healthy home-style meal",
      "availability": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create Tiffin (Admin)
**POST** `/admin/tiffin`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Premium Thali",
  "category": "Premium",
  "items": ["Basmati Rice", "Dal Makhani", "Paneer Curry", "Naan"],
  "price": 200,
  "specialToday": "Gulab Jamun",
  "image": "image_url",
  "description": "Premium quality meal with special items",
  "availability": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tiffin created successfully",
  "data": {
    "_id": "tiffin_id",
    "name": "Premium Thali",
    "category": "Premium",
    "items": ["Basmati Rice", "Dal Makhani", "Paneer Curry", "Naan"],
    "price": 200,
    "specialToday": "Gulab Jamun",
    "image": "image_url",
    "description": "Premium quality meal with special items",
    "availability": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Tiffins (Admin)
**GET** `/admin/tiffin`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Tiffins fetched successfully",
  "data": [
    {
      "_id": "tiffin_id",
      "name": "Regular Thali",
      "category": "Regular",
      "items": ["Rice", "Dal", "Sabzi", "Roti"],
      "price": 100,
      "availability": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Update Tiffin (Admin)
**PUT** `/admin/tiffin/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Updated Thali",
  "price": 110,
  "availability": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tiffin updated successfully",
  "data": {
    "_id": "tiffin_id",
    "name": "Updated Thali",
    "price": 110,
    "availability": false,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Delete Tiffin (Admin)
**DELETE** `/admin/tiffin/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Tiffin deleted successfully"
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

## Error Codes

| Error Code | Description |
|------------|-------------|
| `USER_NOT_FOUND` | User does not exist |
| `ADMIN_NOT_FOUND` | Admin does not exist |
| `INVALID_CREDENTIALS` | Invalid email or password |
| `EMAIL_ALREADY_EXISTS` | Email already registered |
| `TOKEN_EXPIRED` | JWT token has expired |
| `TOKEN_INVALID` | JWT token is invalid |
| `TOKEN_BLACKLISTED` | Token has been blacklisted |
| `ORDER_NOT_FOUND` | Order does not exist |
| `ORDER_ALREADY_CANCELLED` | Order is already cancelled |
| `TIFFIN_NOT_FOUND` | Tiffin does not exist |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `VALIDATION_ERROR` | Request validation failed |
| `DATABASE_ERROR` | Database operation failed |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **Order endpoints**: 10 requests per minute per user
- **Tiffin endpoints**: 20 requests per minute per user
- **Admin endpoints**: 50 requests per minute per admin

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1640995200
```

## Pagination

For endpoints that return lists, pagination is supported:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field (default: createdAt)
- `order`: Sort order (asc/desc, default: desc)

**Example Request:**
```
GET /admin/tiffin?page=2&limit=20&sort=name&order=asc
```

**Pagination Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 2,
    "totalPages": 5,
    "totalItems": 100,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

## Filtering and Search

### Tiffin Filtering
**GET** `/user/tiffin?category=Premium&available=true&search=chicken`

**Query Parameters:**
- `category`: Filter by category (Regular, Premium, Diet, etc.)
- `available`: Filter by availability (true/false)
- `search`: Search in name and description
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter

### Order Filtering
**GET** `/admin/orders?status=pending&user=user_id&date=2024-01-01`

**Query Parameters:**
- `status`: Filter by order status
- `user`: Filter by user ID
- `date`: Filter by creation date
- `minAmount`: Minimum order amount
- `maxAmount`: Maximum order amount

## Webhooks

For real-time updates, the system supports webhooks:

### Order Status Update
**POST** `{webhook_url}`

**Payload:**
```json
{
  "event": "order.status.updated",
  "data": {
    "orderId": "order_id",
    "status": "completed",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### New Order Created
**POST** `{webhook_url}`

**Payload:**
```json
{
  "event": "order.created",
  "data": {
    "orderId": "order_id",
    "userId": "user_id",
    "totalAmount": 420,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const FoodOrderAPI = require('food-order-sdk');

const client = new FoodOrderAPI({
  baseURL: 'http://localhost:3000/api',
  token: 'your_jwt_token'
});

// Create an order
const order = await client.orders.create({
  items: [
    { name: 'Chicken Biryani', quantity: 2, price: 150 }
  ]
});

// Get all tiffins
const tiffins = await client.tiffins.getAll({
  category: 'Premium',
  available: true
});
```

### Python
```python
from food_order_sdk import FoodOrderClient

client = FoodOrderClient(
    base_url='http://localhost:3000/api',
    token='your_jwt_token'
)

# Create an order
order = client.orders.create({
    'items': [
        {'name': 'Chicken Biryani', 'quantity': 2, 'price': 150}
    ]
})

# Get all tiffins
tiffins = client.tiffins.get_all(
    category='Premium',
    available=True
)
```

## Testing

### Postman Collection
A Postman collection is available for testing all API endpoints:
- [Download Postman Collection](./postman/food-order-api.json)

### cURL Examples

**Register User:**
```bash
curl -X POST http://localhost:3000/api/auth/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Create Order:**
```bash
curl -X POST http://localhost:3000/api/user/order/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token" \
  -d '{
    "items": [
      {"name": "Chicken Biryani", "quantity": 2, "price": 150}
    ]
  }'
```
