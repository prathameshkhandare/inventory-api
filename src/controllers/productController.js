const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, stock_quantity = 0, low_stock_threshold = 0 } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    if (stock_quantity < 0) {
      return res.status(400).json({ error: 'stock_quantity must be >= 0' });
    }
    if (low_stock_threshold < 0) {
      return res.status(400).json({ error: 'low_stock_threshold must be >= 0' });
    }

    const product = await Product.create({ name, description, stock_quantity, low_stock_threshold });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Get one product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Update the product by ID
exports.updateProduct = async (req, res, next) => {
  try {
    const { stock_quantity,low_stock_threshold } = req.body;
   
    if (stock_quantity !== undefined && stock_quantity < 0) {
       return res.status(400).json({ error: 'stock_quantity must be >= 0' });
    }
    if (low_stock_threshold !== undefined && low_stock_threshold < 0) {
       return res.status(400).json({ error: 'low_stock_threshold must be >= 0' });
      }

    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Delete the product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Increase stock 
exports.increaseStock = async (req, res, next) => {
  try {
    const amount = parseInt(req.body.amount ?? 1);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: 'Amount must be > 0' });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.stock_quantity += amount;
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Decrease stock
exports.decreaseStock = async (req, res, next) => {
  try {
    const amount = parseInt(req.body.amount ?? 1);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: 'Amount must be > 0' });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stock_quantity < amount)
      return res.status(400).json({ error: 'Insufficient stock' });

    product.stock_quantity -= amount;
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Low stock products
exports.getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      $expr: { $lt: ['$stock_quantity', '$low_stock_threshold'] }
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
