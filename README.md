# 🛍️ Eveera Tiara ESM – Professional Perfume E-commerce Platform

**Eveera Tiara** is a professional, full-stack e-commerce web application built with Node.js, Express.js, and Supabase. It features a complete perfume store with user authentication, shopping cart, order management, and an admin panel. This project is designed as a **capstone project** for students learning full-stack web development.

## ✨ Features

- 🔐 **User Authentication** - Secure registration, login, and session management
- 🛒 **Shopping Cart** - Session-based cart with real-time updates
- 💳 **Checkout System** - Complete order processing workflow
- 👤 **User Profiles** - Order history and account management
- 🎛️ **Admin Panel** - Product and order management dashboard
- 🔍 **Product Search & Filter** - Advanced product discovery
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🔒 **Security** - Input validation, rate limiting, security headers
- 💰 **Indian Currency** - All prices in Indian Rupees (₹)


## 🛠️ Tech Stack

### Backend
- **Node.js** (v18+) - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Template engine for server-side rendering
- **express-session** - Session management
- **bcryptjs** - Password hashing

### Database & Authentication
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication service
  - Row Level Security (RLS)

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling (no framework)
- **Vanilla JavaScript** - Client-side interactivity

### Security & Middleware
- Input validation middleware
- Request logging
- Rate limiting
- Security headers
- Error handling

---

## 📁 Project Structure

```
eveera-tiara-esm/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
│
├── middleware/           # Custom middleware
│   ├── validation.js     # Input validation functions
│   ├── logger.js         # Request logging
│   └── security.js       # Security headers & rate limiting
│
├── routes/               # Route handlers
│   ├── index.js          # Home page routes
│   ├── auth.js           # Authentication routes
│   ├── products.js       # Product listing routes
│   ├── cart.js           # Shopping cart routes
│   ├── admin.js          # Admin panel routes
│   └── profile.js        # User profile routes
│
├── views/                # EJS templates
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Home page
│   ├── cart.ejs          # Shopping cart
│   ├── checkout.ejs      # Checkout page
│   ├── profile.ejs       # User profile
│   ├── error.ejs         # Error page
│   ├── auth/             # Authentication views
│   ├── products/         # Product views
│   ├── admin/            # Admin panel views
│   └── partials/         # Reusable components
│
├── public/               # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   └── js/
│       └── main.js       # Client-side JavaScript
│
├── supabase/            # Supabase configuration
│   └── client.js        # Supabase client setup
│
└── seed/                # Database seeds
    └── products-seed.sql # Sample product data
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **Supabase account** (free tier available)
- **Git** (optional, for version control)

### Installation

1. **Clone or download the project**
   ```bash
   cd eveera-tiara-esm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   PORT=3000
   NODE_ENV=development
   
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   
   SESSION_SECRET=your_session_secret_here_change_in_production
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL scripts from `seed/products-seed.sql` to create tables
   - Seed the database with sample perfume products

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Visit the application**
   ```
   http://localhost:3000
   ```

---

## 🗄️ Database Schema

### Tables

1. **profiles** - User profile information
2. **products** - Perfume product catalog
3. **orders** - Customer orders
4. **order_items** - Individual items in each order

See `seed/products-seed.sql` for complete table definitions and sample data.

---

## 🔐 Creating an Admin User

To create an admin user, update the user's role in Supabase:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

After logging in, the user will have access to the admin panel at `/admin/dashboard`.

---

## 📚 Key Features Explained

### Authentication System
- User registration with email validation
- Secure password hashing with bcrypt
- Session-based authentication
- Protected routes with middleware

### Shopping Cart
- Session-based cart (works without login)
- Real-time quantity updates
- Cart persistence across pages
- Automatic total calculation

### Order Management
- Complete checkout workflow
- Order creation in database
- Order history for users
- Admin order management

### Admin Panel
- Dashboard with statistics
- Product CRUD operations
- Order status management
- Revenue tracking

---

## 🔒 Security Features

- ✅ Input validation and sanitization
- ✅ SQL injection prevention (via Supabase)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Security headers
- ✅ Secure session management
- ✅ Password hashing

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Checkout process
- [ ] Order creation
- [ ] Admin product management
- [ ] Admin order management
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Error handling

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify `.env` file has correct Supabase credentials
- Check Supabase project is active
- Verify network connectivity

**Session Not Persisting**
- Check `SESSION_SECRET` is set in `.env`
- Verify session middleware is configured
- Check cookie settings

**EJS Template Errors**
- Verify `express-ejs-layouts` is installed
- Check template syntax
- Ensure layout file exists

**Port Already in Use**
- Change `PORT` in `.env` file
- Kill process using port 3000: `lsof -ti:3000 | xargs kill`

---

## 📝 Scripts

```bash
# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Run tests (when configured)
npm test
```

---

## 🌐 Deployment

### Recommended Platforms

1. **Render** - Free tier available, easy setup
2. **Railway** - Simple deployment process
3. **Heroku** - Popular choice (paid plans)
4. **DigitalOcean** - More control, affordable

### Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Update `SESSION_SECRET` with a strong random string
- [ ] Configure Supabase RLS policies for production
- [ ] Set up SSL certificate
- [ ] Configure domain (optional)
- [ ] Set up monitoring/logging

---

## 📖 Documentation

- **Main README** - This file (setup and overview)
- **CAPSTONE_PROJECT.md** - Detailed student guide with learning objectives
- **Code Comments** - Inline documentation in source files

---

## 🤝 Contributing

This is an educational project. Students are encouraged to:
- Fork and modify the code
- Add new features
- Improve documentation
- Share improvements

---

## 📄 License

This project is provided for educational purposes. Feel free to use, modify, and include in your portfolio.

---

## 🙏 Acknowledgments

Built with:
- [Express.js](https://expressjs.com/)
- [Supabase](https://supabase.com/)
- [EJS](https://ejs.co/)

---

## 📞 Support

For issues or questions:
1. Check the [CAPSTONE_PROJECT.md](./CAPSTONE_PROJECT.md) guide
2. Review code comments
3. Check Supabase documentation
4. Search for similar issues online

---

## 🎯 Next Steps

After completing the basic setup:

1. ✅ Read [CAPSTONE_PROJECT.md](./CAPSTONE_PROJECT.md) for detailed instructions
2. ✅ Follow the phase-by-phase implementation guide
3. ✅ Complete all required features
4. ✅ Add bonus features (optional)
5. ✅ Deploy your application
6. ✅ Add to your portfolio

---

**Happy Coding! 🚀**

*Last Updated: 2024*
