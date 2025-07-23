# Food Order Application - UML Diagrams

## Class Diagram

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +Date createdAt
        +Date updatedAt
        +register()
        +login()
        +logout()
        +updateProfile()
    }
    
    class Admin {
        +ObjectId _id
        +String name
        +String email
        +String password
        +Date createdAt
        +Date updatedAt
        +register()
        +login()
        +logout()
        +manageTiffins()
        +manageOrders()
    }
    
    class Order {
        +ObjectId _id
        +ObjectId user
        +Array items
        +Number totalPrice
        +String status
        +Date createdAt
        +Date updatedAt
        +create()
        +cancel()
        +track()
        +updateStatus()
    }
    
    class Tiffin {
        +ObjectId _id
        +String name
        +String category
        +Array items
        +Number price
        +String specialToday
        +String image
        +String description
        +Boolean availability
        +Date createdAt
        +Date updatedAt
        +create()
        +update()
        +delete()
        +toggleAvailability()
    }
    
    class BlacklistToken {
        +ObjectId _id
        +String token
        +Date createdAt
        +Date expires
        +add()
        +check()
        +cleanup()
    }
    
    class OrderItem {
        +String name
        +Number quantity
        +Number price
        +calculateSubtotal()
    }
    
    User "1" -- "0..*" Order
    Order "1" -- "0..*" OrderItem
    Admin "1" -- "0..*" Tiffin
    Order "1" -- "1" Tiffin
    User "1" -- "0..*" BlacklistToken
    Admin "1" -- "0..*" BlacklistToken
```

## Use Case Diagram

```mermaid
graph TB
    subgraph "Food Order System"
        subgraph "Customer Use Cases"
            UC1[Register Account]
            UC2[Login/Logout]
            UC3[Browse Menu]
            UC4[Filter Tiffins]
            UC5[Place Order]
            UC6[Track Order]
            UC7[Cancel Order]
            UC8[View Order History]
        end
        
        subgraph "Admin Use Cases"
            UC9[Admin Login]
            UC10[Manage Tiffins]
            UC11[Create Tiffin]
            UC12[Update Tiffin]
            UC13[Delete Tiffin]
            UC14[View All Orders]
            UC15[Update Order Status]
            UC16[Manage Users]
            UC17[View Analytics]
        end
        
        subgraph "System Use Cases"
            UC18[Send Notifications]
            UC19[Process Payments]
            UC20[Generate Reports]
            UC21[Backup Data]
        end
    end
    
    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6
    Customer --> UC7
    Customer --> UC8
    
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
    Admin --> UC13
    Admin --> UC14
    Admin --> UC15
    Admin --> UC16
    Admin --> UC17
    
    System --> UC18
    System --> UC19
    System --> UC20
    System --> UC21
```

## Activity Diagram - Order Process

```mermaid
flowchart TD
    A[Start] --> B[User Browses Menu]
    B --> C[Select Tiffin Items]
    C --> D[Add to Cart]
    D --> E{More Items?}
    E -->|Yes| C
    E -->|No| F[Review Cart]
    F --> G[Proceed to Checkout]
    G --> H[Enter Delivery Details]
    H --> I[Select Payment Method]
    I --> J[Process Payment]
    J --> K{Payment Success?}
    K -->|No| L[Show Error Message]
    L --> I
    K -->|Yes| M[Create Order]
    M --> N[Send Confirmation]
    N --> O[Notify Admin]
    O --> P[Admin Reviews Order]
    P --> Q{Accept Order?}
    Q -->|No| R[Cancel Order]
    R --> S[Refund Payment]
    S --> T[Notify User]
    Q -->|Yes| U[Prepare Order]
    U --> V[Update Status to Preparing]
    V --> W[Notify User]
    W --> X[Order Ready]
    X --> Y[Update Status to Ready]
    Y --> Z[Dispatch for Delivery]
    Z --> AA[Update Status to Delivered]
    AA --> BB[Order Complete]
    T --> CC[End]
    BB --> CC
```

## Sequence Diagram - User Registration

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant E as Email Service
    
    U->>F: Fill registration form
    F->>F: Validate input
    F->>B: POST /auth/users/register
    B->>B: Validate request data
    B->>DB: Check if email exists
    DB-->>B: Email check result
    
    alt Email already exists
        B-->>F: Error: Email already registered
        F-->>U: Show error message
    else Email is new
        B->>B: Hash password with bcrypt
        B->>DB: Create new user
        DB-->>B: User created successfully
        B->>B: Generate JWT token
        B->>E: Send welcome email
        B-->>F: Success response with token
        F->>F: Store token in localStorage
        F-->>U: Registration successful
        F->>F: Redirect to dashboard
    end
```

## Sequence Diagram - Order Creation

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant MQ as RabbitMQ
    participant A as Admin
    
    U->>F: Select items and place order
    F->>B: POST /user/order/create-order
    B->>B: Validate user authentication
    B->>B: Validate order items
    B->>B: Calculate total price
    B->>DB: Create order record
    DB-->>B: Order created with ID
    B->>MQ: Publish order notification
    B-->>F: Order created successfully
    F-->>U: Show order confirmation
    
    MQ->>A: New order notification
    A->>A: Review order details
    A->>B: Update order status
    B->>DB: Update order in database
    B->>MQ: Publish status update
    MQ->>F: Order status notification
    F-->>U: Order status updated
```

## Component Diagram

```mermaid
graph TB
    subgraph "Frontend Components"
        A[React App]
        B[Redux Store]
        C[Axios Instance]
        D[UI Components]
        E[Pages]
        F[Hooks]
    end
    
    subgraph "Backend Components"
        G[Express Server]
        H[Controllers]
        I[Services]
        J[DAOs]
        K[Models]
        L[Middleware]
        M[Utils]
    end
    
    subgraph "External Services"
        N[MongoDB]
        O[RabbitMQ]
        P[Email Service]
        Q[Payment Gateway]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    C --> G
    
    G --> H
    H --> I
    I --> J
    J --> K
    G --> L
    I --> M
    
    J --> N
    I --> O
    I --> P
    I --> Q
```

## Deployment Diagram

```mermaid
graph TB
    subgraph "Client Tier"
        A[Web Browser]
        B[Mobile App]
    end
    
    subgraph "Load Balancer"
        C[Nginx/HAProxy]
    end
    
    subgraph "Application Tier"
        D[Frontend Server 1]
        E[Frontend Server 2]
        F[Backend Server 1]
        G[Backend Server 2]
    end
    
    subgraph "Data Tier"
        H[MongoDB Primary]
        I[MongoDB Secondary]
        J[Redis Cache]
    end
    
    subgraph "Message Queue"
        K[RabbitMQ Cluster]
    end
    
    subgraph "External Services"
        L[Email Service]
        M[Payment Gateway]
        N[CDN]
    end
    
    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    C --> G
    
    D --> F
    D --> G
    E --> F
    E --> G
    
    F --> H
    G --> H
    H --> I
    F --> J
    G --> J
    F --> K
    G --> K
    
    F --> L
    G --> L
    F --> M
    G --> M
    D --> N
    E --> N
```
