# Anashi Candles

This project is now arranged into separate `frontend` and `backend` folders.

## Structure

`frontend/`
React + Vite website UI.

`frontend/src/assets/products`
Product images.

`frontend/src/components`
Reusable frontend UI components.

`frontend/src/pages`
Frontend pages like Home, Shop, Cart, Checkout.

`frontend/src/data`
Frontend product and notice data.

`backend/`
Simple Express server.

`backend/server.js`
Backend entry file.

## How To Run

### Frontend

1. Open terminal in project root:
   `cd /Users/anand/Desktop/candle`
2. Install frontend packages:
   `cd frontend && npm install`
3. Start frontend:
   `npm run dev`
4. Open:
   `http://localhost:3000`

### Backend

1. Open another terminal:
   `cd /Users/anand/Desktop/candle/backend`
2. Install backend packages:
   `npm install`
3. Start backend:
   `npm run dev`
4. API check:
   `http://localhost:5000/api/health`

## Root Shortcuts

From `/Users/anand/Desktop/candle` you can also use:

`npm run dev:frontend`
Run frontend from root.

`npm run dev:backend`
Run backend from root.

`npm run build:frontend`
Build frontend from root.

`npm run lint:frontend`
Type-check frontend from root.
