
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const { configDotenv } = require('dotenv');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/inventorydb');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Product.deleteMany();
});

test('create, increase & decrease stock', async () => {
  const createRes = await request(app).post('/api/products').send({ name: 'Earphone', stock_quantity: 5 ,description:'A black colored Earphones with mic'});
  expect(createRes.status).toBe(201);
  const id = createRes.body._id;

  const inc = await request(app).put(`/api/products/${id}/increase`).send({ amount: 3 });
  expect(inc.body.stock_quantity).toBe(8);

  const dec = await request(app).put(`/api/products/${id}/decrease`).send({ amount: 4 });
  expect(dec.body.stock_quantity).toBe(4);

  const decFail = await request(app).put(`/api/products/${id}/decrease`).send({ amount: 10 });
  expect(decFail.status).toBe(400);
});

test('low stock endpoint', async () => {
  await Product.create([{ name: 'A', stock_quantity: 1, low_stock_threshold: 5 }, { name: 'B', stock_quantity: 10, low_stock_threshold: 5 }]);
  const res = await request(app).get('/api/products/low-stock');
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe('A');
});
