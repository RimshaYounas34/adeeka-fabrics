# Adeeka Fabrics — MERN Stack E-commerce Website

A fully animated fashion e-commerce website built with **MongoDB, Express, React, Node.js** (MERN), featuring Framer Motion animations, a working shopping cart, wishlist, and checkout flow.

- **Hero section** — styled after the "Elegance Woven For You" reference (arch photo, serif headline, gold accents).
- **Rest of the site** — styled after the Adeeka Fabrics reference layout: shop by category, new arrivals, luxury banner, collections, best sellers, brand story, why choose us, lookbook, testimonials, newsletter, footer.

---

## Project structure

```
adeeka-fabrics/
├── backend/          # Express + MongoDB API
└── frontend/          # React + Vite + Tailwind + Framer Motion
```

---

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your MongoDB connection string:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/adeeka_fabrics
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

> No MongoDB installed locally? Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) and paste its connection string into `MONGO_URI` instead.

Seed the database with sample products:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will run at `http://localhost:5000`. Test it by opening `http://localhost:5000/api/products` in your browser — you should see the seeded product list as JSON.

### API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List products (supports `?category=`, `?collection=`, `?isNewArrival=true`, `?isBestSeller=true`, `?search=`, `?sort=price_asc\|price_desc`, `?limit=`) |
| GET | `/api/products/:slug` | Get a single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get logged-in user (requires `Authorization: Bearer <token>`) |
| POST | `/api/orders` | Place an order (requires auth) |
| GET | `/api/orders/mine` | Get logged-in user's orders (requires auth) |

---

## 2. Frontend setup

Open a **new terminal window** (keep the backend running):

```bash
cd frontend
npm install
```

By default the frontend talks to `http://localhost:5000/api`. If you deploy the backend elsewhere, create a `.env` file in `frontend/`:

```
VITE_API_URL=https://your-backend-url.com/api
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

> **Note:** The frontend also works even if the backend isn't running yet — it automatically falls back to local demo product data (see `src/data/products.js`), so you can preview the design immediately. Once your backend + MongoDB are running and seeded, it will use real data automatically.

---

## 3. Building for production

```bash
cd frontend
npm run build
```

This outputs static files to `frontend/dist` which you can deploy to Vercel, Netlify, or any static host. Deploy the `backend` folder to Render, Railway, or any Node host, and point `VITE_API_URL` at it.

---

## 4. What's included

- **Animated hero** with staggered text reveal, floating arch-shaped image, gold accent styling
- **Sticky navbar** with announcement bar, mobile drawer menu, live cart/wishlist counters
- **Shop by category**, **new arrivals**, **best sellers** — all pulling live data from MongoDB via the API
- **Product cards** with hover reveal (add to bag, wishlist heart), scroll-triggered fade-in animations
- **Slide-in cart drawer** with quantity controls and running subtotal
- **Wishlist** page, persisted in the browser
- **Checkout page** with shipping form and order summary, posts to the orders API when logged in
- **Toast notifications** for cart/wishlist actions
- **Page transition animations** between routes
- Fully responsive, mobile-first layout

## 5. Next steps you may want to add

- Product detail page with size/color selection and image gallery
- Admin dashboard for managing products/orders
- Real payment gateway integration (Stripe / JazzCash / EasyPaisa for PK)
- Image upload (Cloudinary) instead of hotlinked demo images
- Email notifications on order placement

Replace the placeholder Unsplash images in `frontend/src/data/products.js`, `backend/seed.js`, and the component files with your own product photography whenever you're ready.
