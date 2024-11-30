import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, 'public')));

// In-memory products storage
let data = {
  products: [
    {
      id: 1,
      productName: "PC",
      productPrice: 2500,
      productImage: "http://localhost:3001/images/pc.png",
    },
    {
      id: 2,
      productName: "Laptop",
      productPrice: 1500,
      productImage: "http://localhost:3001/images/laptop.png",
    },
    {
      id: 3,
      productName: "Mobile Phone",
      productPrice: 500,
      productImage: "http://localhost:3001/images/mobile.png",
    },
  ],
};

const findProductById = (productId) => {
  const product = data.products.find((e) => e.id === Number(productId));
  return product;
};

const deleteProduct = (id) => {
  data.products = data.products.filter((p) => p.id !== Number(id));
};

const updateProductHandler = (newProduct) => {
  const index = data.products.findIndex(p => p.id === Number(newProduct.id));
  if (index === -1) return false;
  
  data.products[index] = { ...data.products[index], ...newProduct };
  return true;
};

// Get all products
app.get('/getallproducts', (req, res) => {
  try {
    res.json({ products: data.products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
app.get('/getproductbyid/:id', (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Requested product ID: ${id}`);
    const product = findProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create new product
app.post('/createproduct', (req, res) => {
  try {
    const newProduct = {
      id: data.products.length > 0 ? Math.max(...data.products.map(p => p.id)) + 1 : 1,
      ...req.body
    };
    data.products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
app.patch('/updateproduct', (req, res) => {
  try {
    const product = req.body;
    if (!product.id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    
    const success = updateProductHandler(product);
    if (success) {
      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
app.delete('/deleteproductbyid/:id', (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Requested product ID: ${id} thats being deleted`);
    deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
