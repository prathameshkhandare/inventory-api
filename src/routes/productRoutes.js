const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.post('/', controller.createProduct);
router.get('/', controller.getAllProducts);
router.get('/low-stock', controller.getLowStockProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);
router.put('/:id/increase', controller.increaseStock);
router.put('/:id/decrease', controller.decreaseStock);

module.exports = router;
