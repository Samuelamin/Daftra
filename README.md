# Daftra Task
A Laravel + React single‐page e-commerce application.
Backend is built with Laravel (Sanctum for API auth) and exposes a RESTful API; frontend lives inside resources/js and is bundled via Vite.

## API Reference

#### Sign up
```http
  POST /api/sign-up
```

#### Sign in
```http
  POST /api/sign-up
```

#### Filter Products
```http
  POST /api/products/
```
 
#### Get Authenticated User
```http
  GET /api/user
```
 
#### Sign Out
```http
GET /api/sign-out
```
 
### List My Orders
```http
  GET /api/user-orders
```
 
### Place a New Order
```http
  POST /api/user-orders
```
 
### Get a Single Order
```http
  GET /api/user-orders/{id}
```
 

## 🛠️ Setup Instructions
1. **Clone & install**  
   ```bash
   git clone git@github.com:your-org/PaymentGateways.git
   cd PaymentGateways
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan db:seed --class=CategoryProductSeeder
   npm install
   npm run build
   php artisan ser




## Project Structure
```
|—— app
|    |—— Events
|        |—— OrderPlaced.php
|    |—— Helper
|        |—— Common.php
|    |—— Http
|        |—— Controllers
|            |—— Api
|                |—— ApiDataController.php
|                |—— UserOrdersController.php
|            |—— Auth
|                |—— ApiAuthenticationController.php
|        |—— Resources
|            |—— Api
|                |—— CategoryRessource.php
|                |—— ProductResource.php
|    |—— Listeners
|        |—— NotifyAdminOfNewOrder.php
|    |—— Models
|        |—— Category.php
|        |—— Order.php
|        |—— OrderDetails.php
|        |—— Product.php
|        |—— User.php
|    |—— Providers
|        |—— AppServiceProvider.php
|        |—— EventServiceProvider.php
|—— database
|    |—— .gitignore
|    |—— database.sqlite
|    |—— factories
|        |—— UserFactory.php
|    |—— migrations
|        |—— 0001_01_01_000000_create_users_table.php
|        |—— 0001_01_01_000001_create_cache_table.php
|        |—— 0001_01_01_000002_create_jobs_table.php
|        |—— 2025_05_20_124348_create_personal_access_tokens_table.php
|        |—— 2025_05_20_133520_create_categories_table.php
|        |—— 2025_05_20_133525_create_products_table.php
|        |—— 2025_05_20_333556_create_orders_table.php
|        |—— 2025_05_20_333656_create_order_details_table.php
|    |—— seeders
|        |—— CategoryProductSeeder.php
|—— resources
|    |—— css
|        |—— app.css
|    |—— js
|        |—— Context
|            |—— AuthContext.jsx
|        |—— api
|            |—— axios.jsx
|        |—— app.tsx
|        |—— pages
|            |—— AboutPage.jsx
|            |—— AppRoutes.jsx
|            |—— AuthPages
|                |—— SignIn.jsx
|                |—— SignUpPage.jsx
|            |—— Components
|                |—— Cart
|                    |—— CartPage.jsx
|                |—— Home
|                    |—— FilterDrawer.jsx
|                    |—— Home.jsx
|                    |—— ProductCard.jsx
|                    |—— ProductDetailsDrawer.jsx
|                |—— Orders
|                    |—— OrderDetailsPage.jsx
|                    |—— OrdersPage.jsx
|            |—— Layout
|                |—— AnnouncementBar.jsx
|                |—— AppLayout.jsx
|                |—— HeaderLayout.jsx
|                |—— Loading.jsx
|            |—— middlewares
|                |—— AuthLayout.jsx
|                |—— GuestLayout.jsx
|            |—— welcome.tsx
|        |—— ssr.tsx
|    |—— views
|        |—— app.blade.php
|—— routes
|    |—— api.php
|    |—— auth.php
|    |—— console.php
|    |—— settings.php
|    |—— web.php
