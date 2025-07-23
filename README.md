# Food Order Application 🍽️

> A comprehensive food delivery platform designed to deliver tasty and hygienic food to customers with modern web technologies.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5+-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Documentation](#documentation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Food Order Application is a full-stack web application that enables customers to order food online and provides administrators with tools to manage orders, menu items, and tiffin services. The system supports real-time order tracking, user authentication, and subscription-based tiffin services.

### Key Actors
- **👥 Customers**: End users who browse menu and place orders
- **👨‍💼 Admin**: Master admin with authentication (manages orders and menu)
- **🚚 Delivery Person**: (Planned feature for order delivery)

## ✨ Features

### Customer Features
- 🔐 User registration and authentication
- 📱 Browse menu with categories and filters
- 🛒 Order management (create, track, cancel)
- 📅 Monthly subscription-based tiffin service
- 🔔 Real-time order status notifications
- 💳 Payment integration (Stripe - planned)
- ⭐ Reviews and feedback system (planned)

### Admin Features
- 🔑 Secure admin authentication
- 📊 Live order tracking and management
- 🍽️ Tiffin menu management (CRUD operations)
- 👥 User management
- 📈 Analytics and reporting (planned)
- 🎛️ System configuration

### Technical Features
- 🏗️ RESTful API architecture
- 🔒 JWT-based authentication with token blacklisting
- 📨 Message queue integration (RabbitMQ)
- 🐳 Docker containerization
- 📱 Responsive web design
- ⚡ Real-time updates

## 🏗️ Architecture

The application follows a modern layered architecture:

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React Admin Panel]
        B[Customer Web App]
    end

    subgraph "Backend Layer"
        C[Express.js API Server]
        D[Authentication Middleware]
        E[Business Logic Services]
    end

    subgraph "Data Layer"
        F[(MongoDB Database)]
        G[RabbitMQ Message Queue]
    end

    A --> C
    B --> C
    C --> D
    C --> E
    E --> F
    E --> G
```

## 📚 Documentation

Comprehensive documentation is available in the following files:

- **[📖 Complete Project Documentation](PROJECT_DOCUMENTATION.md)** - Detailed system documentation
- **[🎨 UML Diagrams](UML_DIAGRAMS.md)** - Visual system design diagrams
- **[🔌 API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[🚀 Deployment Guide](PROJECT_DOCUMENTATION.md#deployment)** - Production deployment instructions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- RabbitMQ
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-order
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd admin
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Access the application**
   - Admin Panel: http://localhost:5174
   - API Server: http://localhost:3000
   - Customer App: http://localhost:5173 (if available)

### Docker Setup

```bash
# Backend with Docker
cd backend
docker-compose up -d
```

## 📁 Project Structure

```
food-order/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   ├── dao/           # Data access objects
│   │   ├── middleware/    # Custom middleware
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Configuration files
│   ├── package.json
│   └── Dockerfile
├── admin/                  # React Admin Panel
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── Pages/         # Page components
│   │   ├── Redux/         # State management
│   │   ├── Axios/         # HTTP client
│   │   └── routes/        # Frontend routing
│   ├── package.json
│   └── vite.config.js
├── docs/                  # Documentation files
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/users/register` - User registration
- `POST /api/auth/users/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/users/logout` - User logout

### Order Management
- `POST /api/user/order/create-order` - Create new order
- `PATCH /api/user/order/cancel-order/:id` - Cancel order
- `GET /api/user/order/track-order/:id` - Track order

### Tiffin Management
- `GET /api/user/tiffin` - Get available tiffins
- `POST /api/admin/tiffin` - Create tiffin (Admin)
- `PUT /api/admin/tiffin/:id` - Update tiffin (Admin)
- `DELETE /api/admin/tiffin/:id` - Delete tiffin (Admin)

For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🛠️ Technologies Used

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **Message Queue**: RabbitMQ (CloudAMQP)
- **Validation**: Custom middleware
- **Logging**: Morgan
- **Environment**: dotenv

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **UI Library**: Shadcn/ui + Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **Icons**: Tabler Icons
- **Forms**: React Hook Form + Zod

### DevOps & Tools
- **Containerization**: Docker
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Documentation**: Markdown + Mermaid

## 🔒 Security Features

- **Authentication**: JWT tokens with secure storage
- **Password Security**: bcrypt hashing
- **Token Management**: Blacklist for logout
- **CORS**: Configured for specific origins
- **Input Validation**: Server-side validation
- **Environment Variables**: Secure configuration

## 🚀 Deployment

### Environment Variables

**Backend (.env)**
```env
PORT=3000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/food-order
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=24h
RABBIT_URL=amqps://username:password@rabbitmq-server.com/vhost
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000/api
```

### Production Deployment

1. **Build the applications**
   ```bash
   # Backend
   cd backend && npm run build

   # Frontend
   cd admin && npm run build
   ```

2. **Deploy using Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Set up reverse proxy** (Nginx/Apache)
4. **Configure SSL certificates**
5. **Set up monitoring and logging**

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend tests
cd admin
npm test
npm run test:e2e
```

## 📊 Performance

- **Database**: Indexed queries for optimal performance
- **Caching**: Redis integration (planned)
- **CDN**: Static asset optimization
- **Compression**: Gzip enabled
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code structure and patterns
- Write comprehensive tests for new features
- Update documentation for API changes
- Follow commit message conventions
- Ensure all tests pass before submitting PR

## 🐛 Troubleshooting

### Common Issues

**Database Connection**
```bash
# Check MongoDB connection
mongosh "your_mongodb_connection_string"
```

**Authentication Issues**
```bash
# Clear browser storage
localStorage.clear()
```

**CORS Errors**
- Verify frontend URL in backend CORS configuration
- Check environment variables

For more troubleshooting tips, see [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md#troubleshooting)

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Basic order management
- ✅ Admin panel
- ✅ User authentication
- ✅ Tiffin management

### Phase 2 (Planned)
- 🔄 Payment integration (Stripe)
- 🔄 Real-time notifications
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Delivery management
- 📋 Multi-restaurant support
- 📋 AI-powered recommendations
- 📋 Progressive Web App

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Abhishek Kushwaha]
- **Backend Developer**: [Abhishek Kushwaha]
- **Frontend Developer**: [Abhishek Kushwaha]
- **UI/UX Designer**: [Abhishek Kushwaha]

## 📞 Support

- **Email**: abhishekkushwahaak0121@gmail.com
- **Documentation**: [Project Documentation](PROJECT_DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/your-repo/food-order/issues)

---

<div align="center">
  <p>Made with ❤️ for food lovers everywhere</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>