# Food Order Application - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [System Architecture Diagram](#system-architecture-diagram)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Authentication Flow](#authentication-flow)
7. [Frontend Architecture](#frontend-architecture)
8. [Deployment](#deployment)
9. [Development Setup](#development-setup)

## Project Overview

The Food Order Application is a comprehensive food delivery platform designed to deliver tasty and hygienic food to customers. The system supports multiple user roles and provides features for order management, tiffin services, and administrative controls.

### Key Features
- **Order Management**: Create, track, and cancel food orders
- **Tiffin Service**: Monthly subscription-based tiffin service
- **Menu Management**: Dynamic menu with categories and filters
- **User Management**: Customer registration and authentication
- **Admin Panel**: Administrative controls and order tracking
- **Real-time Notifications**: Order status updates
- **Payment Integration**: Stripe payment gateway (planned)

### Actors
1. **Customer**: End users who place orders
2. **Admin**: Master admin with authentication (no registration)
3. **Delivery Person**: (Planned feature)

## Architecture Overview

The application follows a modern full-stack architecture:

### Backend Stack
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Message Queue**: RabbitMQ for asynchronous processing
- **API**: RESTful API design
- **Containerization**: Docker support

### Frontend Stack
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **UI Library**: Shadcn/ui components with Tailwind CSS
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router

## System Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[React Admin Panel]
        B[Customer Web App]
    end
    
    subgraph "API Gateway"
        C[Express.js Server]
    end
    
    subgraph "Authentication"
        D[JWT Auth Middleware]
        E[Blacklist Token Store]
    end
    
    subgraph "Business Logic"
        F[User Service]
        G[Admin Service]
        H[Order Service]
        I[Tiffin Service]
    end
    
    subgraph "Data Access Layer"
        J[User DAO]
        K[Admin DAO]
        L[Order DAO]
        M[Tiffin DAO]
    end
    
    subgraph "Database"
        N[(MongoDB)]
    end
    
    subgraph "Message Queue"
        O[RabbitMQ]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    C --> F
    C --> G
    C --> H
    C --> I
    F --> J
    G --> K
    H --> L
    I --> M
    J --> N
    K --> N
    L --> N
    M --> N
    C --> O
```

## Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name
        String email UK
        String password
        Date createdAt
        Date updatedAt
    }
    
    ADMIN {
        ObjectId _id PK
        String name
        String email UK
        String password
        Date createdAt
        Date updatedAt
    }
    
    ORDER {
        ObjectId _id PK
        ObjectId user FK
        Array items
        Number totalPrice
        String status
        Date createdAt
        Date updatedAt
    }
    
    TIFFIN {
        ObjectId _id PK
        String name
        String category
        Array items
        Number price
        String specialToday
        String image
        String description
        Boolean availability
        Date createdAt
        Date updatedAt
    }
    
    BLACKLIST_TOKEN {
        ObjectId _id PK
        String token
        Date createdAt
        Date expires
    }
    
    USER ||--o{ ORDER : places
    ORDER ||--o{ TIFFIN : contains
```

### Model Schemas

#### User Model
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamps: true
}
```

#### Admin Model
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamps: true
}
```

#### Order Model
```javascript
{
  user: { type: ObjectId, ref: "User", required: true },
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "completed", "cancelled"], 
    default: "pending" 
  },
  timestamps: true
}
```

#### Tiffin Model
```javascript
{
  name: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Regular', 'Premium', 'Diet', 'South Indian', 'North Indian', 'Custom'],
    default: 'Regular'
  },
  items: [{ type: String, required: true }],
  price: { type: Number, required: true },
  specialToday: { type: String, default: "No special today" },
  image: { type: String },
  description: { type: String },
  availability: { type: Boolean, default: true },
  timestamps: true
}
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: TBD

### Authentication Endpoints

#### User Authentication
- `POST /auth/users/register` - Register new user
- `POST /auth/users/login` - User login
- `GET /auth/users/logout` - User logout (requires auth)
- `GET /auth/users/profile` - Get user profile (requires auth)

#### Admin Authentication
- `POST /auth/admin/register` - Register new admin
- `POST /auth/admin/login` - Admin login
- `GET /auth/admin/logout` - Admin logout (requires auth)
- `GET /auth/admin/profile` - Get admin profile (requires auth)

### Order Management
- `POST /user/order/create-order` - Create new order (requires auth)
- `PATCH /user/order/cancel-order/:orderId` - Cancel order (requires auth)
- `GET /user/order/track-order/:orderId` - Track order (requires auth)

### Tiffin Management

#### User Tiffin Routes
- `GET /user/tiffin` - Get all available tiffins

#### Admin Tiffin Routes
- `POST /admin/tiffin` - Create new tiffin (requires admin auth)
- `GET /admin/tiffin` - Get all tiffins (requires admin auth)
- `PUT /admin/tiffin/:id` - Update tiffin (requires admin auth)
- `DELETE /admin/tiffin/:id` - Delete tiffin (requires admin auth)

## Authentication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant DB as Database
    participant BL as Blacklist
    
    Note over C,BL: User Registration/Login
    C->>S: POST /auth/users/login {email, password}
    S->>DB: Find user by email
    DB-->>S: User data
    S->>S: Compare password with bcrypt
    S->>S: Generate JWT token
    S-->>C: Return {user, token}
    
    Note over C,BL: Authenticated Request
    C->>S: Request with Authorization header
    S->>S: Extract token from header/cookie
    S->>S: Verify JWT token
    S->>BL: Check if token is blacklisted
    BL-->>S: Token status
    S->>DB: Find user by email from token
    DB-->>S: User data
    S->>S: Attach user to request
    S-->>C: Process request
    
    Note over C,BL: Logout
    C->>S: GET /auth/users/logout
    S->>BL: Add token to blacklist
    S-->>C: Logout successful
```

## Frontend Architecture

### Component Structure

```mermaid
graph TD
    A[App.jsx] --> B[AppRoutes]
    A --> C[Redux Provider]

    B --> D[Dashboard Page]
    B --> E[Login Page]
    B --> F[Orders Page]
    B --> G[Menu Page]
    B --> H[Users Page]

    D --> I[AppSidebar]
    D --> J[SiteHeader]
    D --> K[SectionCards]
    D --> L[ChartAreaInteractive]
    D --> M[DataTable]

    E --> N[LoginForm]

    I --> O[NavMain]
    I --> P[NavDocuments]
    I --> Q[NavSecondary]
    I --> R[NavUser]
```

### Redux Store Structure

```mermaid
graph LR
    A[Redux Store] --> B[Auth Slice]
    A --> C[Dashboard Slice]
    A --> D[Orders Slice]
    A --> E[Menu Slice]
    A --> F[Users Slice]

    B --> B1[isAuthenticated]
    B --> B2[user]
    B --> B3[loading]
    B --> B4[error]

    C --> C1[stats]
    C --> C2[recentOrders]
    C --> C3[salesChart]

    D --> D1[orders]
    D --> D2[selectedOrder]
    D --> D3[pagination]
    D --> D4[filters]

    E --> E1[menuItems]
    E --> E2[categories]
    E --> E3[loading]

    F --> F1[users]
    F --> F2[selectedUser]
    F --> F3[pagination]
```

### State Management Flow

```mermaid
sequenceDiagram
    participant C as Component
    participant A as Action Creator
    participant M as Middleware
    participant R as Reducer
    participant S as Store
    participant API as API Service

    C->>A: Dispatch async action
    A->>M: Create thunk
    M->>API: HTTP request
    API-->>M: Response data
    M->>R: Dispatch success/error action
    R->>S: Update state
    S-->>C: State change notification
    C->>C: Re-render with new state
```

## Order Management Flow

```mermaid
stateDiagram-v2
    [*] --> Pending: Create Order
    Pending --> Completed: Admin confirms
    Pending --> Cancelled: User/Admin cancels
    Completed --> [*]
    Cancelled --> [*]

    note right of Pending
        Order created by user
        Payment processing
        Awaiting confirmation
    end note

    note right of Completed
        Order fulfilled
        Payment confirmed
        Delivery completed
    end note

    note right of Cancelled
        Order cancelled
        Refund processed
        Notification sent
    end note
```

## Tiffin Service Flow

```mermaid
flowchart TD
    A[Admin Creates Tiffin] --> B[Set Category & Items]
    B --> C[Set Price & Availability]
    C --> D[Upload Image & Description]
    D --> E[Save to Database]
    E --> F[Display in Menu]

    F --> G[User Views Menu]
    G --> H[Filter by Category]
    H --> I[Select Tiffin]
    I --> J[Add to Order]
    J --> K[Proceed to Checkout]

    K --> L[Create Order]
    L --> M[Payment Processing]
    M --> N[Order Confirmation]
    N --> O[RabbitMQ Notification]
    O --> P[Admin Dashboard Update]
```

## Message Queue Architecture

```mermaid
graph LR
    subgraph "Producers"
        A[Order Service]
        B[User Service]
        C[Admin Service]
    end

    subgraph "RabbitMQ"
        D[Order Queue]
        E[Notification Queue]
        F[Email Queue]
    end

    subgraph "Consumers"
        G[Order Processor]
        H[Notification Service]
        I[Email Service]
    end

    A --> D
    B --> E
    C --> F

    D --> G
    E --> H
    F --> I
```

## Security Architecture

```mermaid
graph TB
    subgraph "Client Security"
        A[HTTPS/TLS]
        B[CORS Policy]
        C[Input Validation]
    end

    subgraph "Authentication"
        D[JWT Tokens]
        E[Bcrypt Hashing]
        F[Token Blacklisting]
    end

    subgraph "Authorization"
        G[Role-based Access]
        H[Route Protection]
        I[Middleware Guards]
    end

    subgraph "Data Security"
        J[MongoDB Security]
        K[Environment Variables]
        L[Password Policies]
    end

    A --> D
    B --> G
    C --> E
    D --> F
    G --> H
    H --> I
    E --> L
    F --> J
    I --> K
```

## Deployment

### Docker Configuration

The application includes Docker support for easy deployment:

#### Backend Dockerfile
```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: "3.8"
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

### Environment Variables

#### Backend (.env)
```env
PORT=3000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/food-order
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=24h
RABBIT_URL=amqps://username:password@rabbitmq-server.com/vhost
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

### Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        A[Load Balancer]
        B[Frontend Server]
        C[Backend Server 1]
        D[Backend Server 2]
        E[MongoDB Cluster]
        F[RabbitMQ Cluster]
        G[Redis Cache]
    end

    subgraph "CDN"
        H[Static Assets]
        I[Images]
    end

    A --> B
    A --> C
    A --> D
    C --> E
    D --> E
    C --> F
    D --> F
    C --> G
    D --> G
    B --> H
    B --> I
```

## Development Setup

### Prerequisites
- Node.js 18+
- MongoDB 6+
- RabbitMQ
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-order/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to admin directory**
   ```bash
   cd food-order/admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Database Setup

1. **MongoDB Connection**
   - Set up MongoDB Atlas or local MongoDB instance
   - Update MONGO_URL in backend .env file

2. **Database Schema**
   - Models are automatically created on first run
   - No manual schema setup required

### Development Workflow

```mermaid
gitgraph
    commit id: "Initial Setup"
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Add user model"
    commit id: "Add auth middleware"
    commit id: "Add login/register"
    checkout main
    merge feature/user-auth

    branch feature/order-management
    checkout feature/order-management
    commit id: "Add order model"
    commit id: "Add order service"
    commit id: "Add order routes"
    checkout main
    merge feature/order-management

    commit id: "Release v1.0"
```

### Testing

#### Backend Testing
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage
```

#### Frontend Testing
```bash
# Component tests
npm test

# E2E tests
npm run test:e2e
```

### Code Quality

#### ESLint Configuration
```json
{
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80
}
```

## API Response Formats

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

### Pagination Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

## Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── env.js             # Environment configuration
│   │   ├── connectDB.js       # Database connection
│   │   └── cookie.config.js   # Cookie configuration
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── admin.controller.js
│   │   ├── order.controller.js
│   │   └── adminTiffin.controller.js
│   ├── dao/                   # Data Access Objects
│   │   ├── user.dao.js
│   │   ├── admin.dao.js
│   │   ├── order.dao.js
│   │   └── tiffin.dao.js
│   ├── middleware/
│   │   ├── user.middleware.js
│   │   └── admin.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── admin.model.js
│   │   ├── order.model.js
│   │   ├── tiffin.model.js
│   │   └── blacklistToken.model.js
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── admin.route.js
│   │   ├── order.route.js
│   │   ├── userTiffin.route.js
│   │   └── adminTiffin.route.js
│   ├── services/
│   │   ├── user.service.js
│   │   ├── admin.service.js
│   │   ├── order.service.js
│   │   ├── adminTiffin.service.js
│   │   └── rabbit.js
│   └── utils/
│       ├── asyncHandler.js
│       ├── bcrypt.js
│       └── jsonWebToken.js
├── package.json
├── Dockerfile
└── docker-compose.yml
```

### Frontend Structure
```
admin/
├── src/
│   ├── App.jsx                # Main app component
│   ├── main.jsx              # Entry point
│   ├── index.css             # Global styles
│   ├── components/
│   │   ├── ui/               # Shadcn UI components
│   │   ├── app-sidebar.jsx
│   │   ├── login-form.jsx
│   │   └── nav-*.jsx
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Orders.jsx
│   ├── Redux/
│   │   ├── store.js
│   │   ├── Provider.jsx
│   │   ├── hooks.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── dashboardSlice.js
│   │       ├── ordersSlice.js
│   │       ├── menuSlice.js
│   │       └── usersSlice.js
│   ├── Axios/
│   │   └── AxiosInstance.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   └── lib/
│       └── utils.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── components.json
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check MongoDB connection
mongosh "mongodb+srv://cluster.mongodb.net/food-order"

# Verify environment variables
echo $MONGO_URL
```

#### 2. Authentication Problems
```bash
# Clear browser localStorage
localStorage.clear()

# Check JWT token validity
jwt.verify(token, process.env.JWT_SECRET)
```

#### 3. CORS Issues
```javascript
// Update CORS configuration in app.js
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'],
  credentials: true
}));
```

#### 4. RabbitMQ Connection
```bash
# Check RabbitMQ status
rabbitmqctl status

# Verify connection URL
echo $RABBIT_URL
```

### Debug Mode

#### Backend Debug
```bash
# Enable debug logging
DEBUG=* npm run dev

# MongoDB debug
MONGOOSE_DEBUG=true npm run dev
```

#### Frontend Debug
```bash
# Enable React DevTools
npm install -g react-devtools

# Redux DevTools
# Install Redux DevTools browser extension
```

## Performance Optimization

### Backend Optimization
- **Database Indexing**: Add indexes on frequently queried fields
- **Caching**: Implement Redis for session and data caching
- **Connection Pooling**: Configure MongoDB connection pooling
- **Compression**: Enable gzip compression for responses

### Frontend Optimization
- **Code Splitting**: Implement React.lazy for route-based splitting
- **Bundle Analysis**: Use webpack-bundle-analyzer
- **Image Optimization**: Implement lazy loading and WebP format
- **Memoization**: Use React.memo and useMemo for expensive operations

## Security Best Practices

### Backend Security
- **Input Validation**: Validate all user inputs
- **Rate Limiting**: Implement API rate limiting
- **Helmet.js**: Add security headers
- **SQL Injection**: Use parameterized queries
- **XSS Protection**: Sanitize user inputs

### Frontend Security
- **Content Security Policy**: Implement CSP headers
- **Secure Storage**: Use secure methods for token storage
- **HTTPS**: Enforce HTTPS in production
- **Dependency Scanning**: Regular security audits

## Monitoring and Logging

### Application Monitoring
```mermaid
graph LR
    A[Application] --> B[Winston Logger]
    A --> C[Morgan HTTP Logger]
    B --> D[Log Files]
    C --> D
    D --> E[Log Aggregation]
    E --> F[Monitoring Dashboard]
```

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

## Future Enhancements

### Planned Features
1. **Payment Integration**
   - Stripe payment gateway
   - Multiple payment methods
   - Refund management

2. **Delivery Management**
   - Delivery person module
   - Real-time tracking
   - Route optimization

3. **Mobile Application**
   - React Native app
   - Push notifications
   - Offline support

4. **Advanced Analytics**
   - Sales reporting
   - Customer analytics
   - Performance metrics

5. **Multi-tenant Support**
   - Restaurant partnerships
   - White-label solution
   - Franchise management

### Technical Improvements
- **Microservices Architecture**: Break down into smaller services
- **GraphQL API**: Implement GraphQL for flexible queries
- **Event Sourcing**: Implement event-driven architecture
- **Machine Learning**: Recommendation engine for food suggestions
- **Progressive Web App**: PWA capabilities for better mobile experience

## Contributing

### Development Guidelines
1. Follow the existing code structure
2. Write comprehensive tests
3. Update documentation
4. Follow commit message conventions
5. Create pull requests for all changes

### Code Review Process
1. Automated testing must pass
2. Code coverage should not decrease
3. Security scan must pass
4. Performance impact assessment
5. Documentation updates required

---

## Contact Information

- **Project Lead**: [Abhishek Kushwaha]
- **Email**: abhishekkushwahaak0121@gmail.com
- **Repository**: https://github.com/professor0121/food-order
- **Documentation**: https://github.com/professor0121/food-order/blob/main/PROJECT_DOCUMENTATION.md

---

*Last Updated: 2025-07-23*
*Version: 1.0.0*
