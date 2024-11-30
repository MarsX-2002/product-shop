# Product Shop

A full-stack e-commerce application built with React, TypeScript, and Express.js.

## Features

- 🛍️ Product Management (CRUD operations)
- 🛒 Shopping Cart functionality
- 💅 Material-UI components
- 🖼️ Image support with fallback
- 📱 Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI (v5)
- React Context API for state management
- Emotion for styling

### Backend
- Express.js
- Node.js
- In-memory data storage

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MarsX-2002/product-shop.git
cd product-shop
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```
The server will run on http://localhost:3001

2. Start the frontend development server:
```bash
cd client
npm start
```
The application will open in your browser at http://localhost:3000

## Usage

- View all products on the main page
- Add new products using the + button
- Edit or delete existing products
- Add products to cart
- Adjust quantities in the cart
- Checkout (simulation)

## Project Structure

```
product-shop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React Context
│   │   └── services/      # API services
│   └── public/            # Static files
└── server/                # Backend Express application
    └── public/            # Static images
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
