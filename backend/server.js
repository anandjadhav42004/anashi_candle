import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'anashi-candles-backend' });
});

app.get('/api/store', (_req, res) => {
  res.json({
    brand: 'ANASHI CANDLES',
    status: 'IN STOCK',
    payment: 'Cash on Delivery',
    delivery: 'Free Delivery Available',
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
