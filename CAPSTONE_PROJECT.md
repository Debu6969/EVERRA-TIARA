# 🎓 Capstone Project: Eveera Tiara E-commerce Platform

## 📋 Project Overview

**Eveera Tiara** is a full-stack e-commerce web application specializing in premium perfumes. This project demonstrates proficiency in modern web development technologies including Node.js, Express.js, server-side rendering with EJS, database management with Supabase, and responsive front-end design.

### Project Type
**Full-Stack Web Application (E-commerce Platform)**

### Duration
**8-12 weeks** (recommended timeline)



## 🎯 Learning Objectives

By completing this capstone project, students will demonstrate:

1. **Backend Development**
   - RESTful API design and implementation
   - Server-side routing and middleware
   - Session management and authentication
   - Database design and integration
   - Error handling and validation

2. **Frontend Development**
   - Server-side rendering with EJS templates
   - Responsive web design
   - JavaScript DOM manipulation
   - AJAX/fetch API usage
   - User experience optimization

3. **Database Management**
   - PostgreSQL database design
   - SQL query writing
   - Row Level Security (RLS) policies
   - Data relationships and normalization

4. **DevOps & Deployment**
   - Environment configuration
   - Version control with Git
   - Application deployment
   - Security best practices

5. **Professional Skills**
   - Code organization and documentation
   - Problem-solving and debugging
   - Project planning and time management
   - Testing and quality assurance

---

## 🛠️ Technology Stack

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
- **HTML5** - Markup
- **CSS3** - Styling (custom, elegant Fragrant theme)
  - Elegant brown color palette
  - Premium serif typography
  - Gradient backgrounds
  - Modern card designs
- **Vanilla JavaScript** - Client-side interactivity
  - AJAX for reviews
  - Form handling
  - Dynamic content loading

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **dotenv** - Environment variable management

---

## 📚 Prerequisites

Before starting this project, students should have knowledge of:

- ✅ **JavaScript Fundamentals**
  - Variables, functions, arrays, objects
  - ES6+ features (arrow functions, destructuring, async/await)
  - DOM manipulation

- ✅ **HTML & CSS**
  - Semantic HTML
  - CSS selectors, flexbox, grid
  - Responsive design principles

- ✅ **Node.js Basics**
  - npm package management
  - Module system (ES6 modules)
  - File system operations

- ✅ **Database Concepts**
  - SQL basics (SELECT, INSERT, UPDATE, DELETE)
  - Table relationships
  - Primary/foreign keys

- ✅ **Git Basics**
  - Committing changes
  - Branching
  - Pushing to remote repositories

---

## 📖 Project Structure

```
eveera-tiara-esm/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
│
├── middleware/           # Custom middleware
│   ├── validation.js     # Input validation functions (including review validation)
│   ├── logger.js         # Request logging
│   └── security.js       # Security headers & rate limiting
│
├── routes/               # Route handlers
│   ├── index.js          # Home page routes
│   ├── auth.js           # Authentication routes
│   ├── products.js       # Product listing routes
│   ├── cart.js           # Shopping cart routes
│   ├── admin.js          # Admin panel routes
│   ├── profile.js        # User profile routes
│   └── reviews.js        # Product reviews routes
│
├── views/                # EJS templates
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Home page (with hero, features, testimonials, FAQs, newsletter)
│   ├── cart.ejs          # Shopping cart
│   ├── checkout.ejs      # Checkout page
│   ├── profile.ejs       # User profile
│   ├── error.ejs         # Error page
│   ├── auth/             # Authentication views
│   ├── products/         # Product views (with reviews section)
│   ├── admin/            # Admin panel views
│   └── partials/         # Reusable components (header, navbar, footer)
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
    ├── products-seed.sql # Sample product data
    └── reviews-schema.sql # Reviews table schema
```

---

## 🚀 Phase-by-Phase Implementation Guide

### **Phase 1: Project Setup (Week 1)**

#### Tasks:
1. **Environment Setup**
   - Install Node.js (v18 or higher)
   - Install Git
   - Create GitHub account
   - Set up code editor (VS Code recommended)

2. **Project Initialization**
   - Clone/download project files
   - Run `npm install` to install dependencies
   - Create `.env` file from `.env.example`
   - Set up Supabase account and project

3. **Database Setup**
   - Create Supabase project
   - Run SQL scripts to create tables:
     - `profiles`
     - `products`
     - `orders`
     - `order_items`
     - `reviews` (for product reviews feature)
   - Configure Row Level Security (RLS) policies
   - Seed database with sample products

4. **Initial Testing**
   - Start server: `npm run dev`
   - Verify home page loads
   - Test database connection

#### Deliverables:
- ✅ Working development environment
- ✅ Database tables created
- ✅ Sample data seeded
- ✅ Server running successfully

---

### **Phase 2: Authentication System (Week 2)**

#### Tasks:
1. **User Registration**
   - Create registration form
   - Implement email validation
   - Password strength requirements
   - User profile creation in database

2. **User Login**
   - Login form implementation
   - Session management
   - Password verification
   - Redirect logic

3. **Session Management**
   - Session storage configuration
   - Session expiration handling
   - Logout functionality

4. **Profile Management**
   - User profile page
   - Display user information
   - Order history display

#### Deliverables:
- ✅ Users can register accounts
- ✅ Users can log in/out
- ✅ Sessions persist across requests
- ✅ Profile page displays user data

#### Learning Outcomes:
- Understanding authentication flow
- Session vs. token-based auth
- Password security best practices

---

### **Phase 3: Product Catalog (Week 3)**

#### Tasks:
1. **Product Display**
   - Home page with featured products
   - Elegant hero banner section
   - Features/services section
   - Testimonials section
   - FAQs section
   - Newsletter subscription
   - Product listing page
   - Product detail page
   - Image handling

2. **Search & Filter**
   - Search functionality
   - Category filtering
   - Price sorting
   - Pagination (optional)

3. **Product Management (Admin)**
   - Admin product list
   - Add new products
   - Edit existing products
   - Delete products

4. **Product Reviews (New Feature)**
   - Review submission system
   - Rating display (1-5 stars)
   - Review validation
   - Review management (edit/delete)
   - Average rating calculation

#### Deliverables:
- ✅ Product catalog displays correctly
- ✅ Elegant Fragrant-themed homepage design
- ✅ Search and filter work
- ✅ Admin can manage products
- ✅ Responsive product cards
- ✅ Product reviews system functional

#### Learning Outcomes:
- Database querying
- Dynamic content rendering
- CRUD operations
- User-generated content management
- Rating systems implementation

---

### **Phase 4: Shopping Cart (Week 4)**

#### Tasks:
1. **Cart Functionality**
   - Add items to cart
   - Update quantities
   - Remove items
   - Calculate totals

2. **Session-Based Cart**
   - Store cart in session
   - Persist cart across pages
   - Cart count display

3. **Checkout Process**
   - Checkout page design
   - Shipping information form
   - Order creation
   - Order confirmation

#### Deliverables:
- ✅ Shopping cart works without login
- ✅ Cart persists in session
- ✅ Users can checkout
- ✅ Orders are saved to database

#### Learning Outcomes:
- State management
- Form handling
- Data persistence

---

### **Phase 5: Admin Panel (Week 5)**

#### Tasks:
1. **Admin Dashboard**
   - Statistics display
   - Recent orders
   - Revenue calculations

2. **Order Management**
   - View all orders
   - Filter orders by status
   - Update order status
   - View order details

3. **User Management (Optional)**
   - View registered users
   - Promote users to admin
   - User activity tracking

#### Deliverables:
- ✅ Admin dashboard with statistics
- ✅ Order management interface
- ✅ Status update functionality

#### Learning Outcomes:
- Admin role implementation
- Data aggregation
- Dashboard design

---

### **Phase 6: UI/UX Enhancement (Week 6)**

#### Tasks:
1. **Responsive Design**
   - Mobile-first approach
   - Tablet optimization
   - Desktop layouts
   - Cross-browser testing

2. **User Experience**
   - Loading states
   - Error messages
   - Success notifications
   - Form validation feedback
   - Smooth animations and transitions

3. **Visual Design - Fragrant Theme**
   - Elegant brown color palette (#8B4513, #A0522D)
   - Premium serif typography (Georgia)
   - Sophisticated gradient backgrounds
   - Refined product card designs
   - Elegant hero banner with overlay
   - Professional testimonials section
   - Clean FAQs layout
   - Newsletter subscription section
   - Consistent spacing and layout
   - Icon integration

#### Deliverables:
- ✅ Fully responsive design
- ✅ Smooth user interactions
- ✅ Professional elegant appearance matching Fragrant theme
- ✅ Accessible interface
- ✅ Premium perfume e-commerce aesthetic

#### Learning Outcomes:
- CSS Grid and Flexbox
- Responsive design principles
- UX best practices
- Theme implementation
- Color theory and typography

---

### **Phase 7: Security & Validation (Week 7)**

#### Tasks:
1. **Input Validation**
   - Server-side validation
   - Client-side validation
   - Sanitization
   - Error handling
   - Review validation (rating 1-5, comment sanitization)

2. **Security Measures**
   - SQL injection prevention
   - XSS protection
   - CSRF tokens
   - Rate limiting
   - Security headers
   - Review content sanitization

3. **Error Handling**
   - Try-catch blocks
   - Error logging
   - User-friendly error messages
   - 404 page

#### Deliverables:
- ✅ All inputs validated (including reviews)
- ✅ Security headers implemented
- ✅ Comprehensive error handling
- ✅ Secure authentication
- ✅ Review system security measures

#### Learning Outcomes:
- Security best practices
- Input validation techniques
- Error handling strategies
- User-generated content security

---

### **Phase 8: Testing & Documentation (Week 8)**

#### Tasks:
1. **Testing**
   - Manual testing of all features
   - Edge case testing
   - Browser compatibility
   - Performance testing

2. **Documentation**
   - Code comments
   - README updates
   - API documentation
   - User guide

3. **Code Quality**
   - Code review
   - Refactoring
   - Performance optimization
   - Clean code principles

#### Deliverables:
- ✅ All features tested
- ✅ Comprehensive documentation
- ✅ Clean, maintainable code
- ✅ Performance optimized

#### Learning Outcomes:
- Testing methodologies
- Documentation skills
- Code quality standards

---

## 📝 Assignment Requirements

### **Minimum Requirements (Must Have)**

1. ✅ User authentication (register, login, logout)
2. ✅ Product catalog with search/filter
3. ✅ Shopping cart functionality
4. ✅ Checkout process
5. ✅ Order management
6. ✅ Admin panel
7. ✅ Responsive design
8. ✅ Database integration
9. ✅ Error handling
10. ✅ Input validation
11. ✅ Product reviews and ratings system
12. ✅ Elegant homepage design with multiple sections

### **Bonus Features (Nice to Have)**

- ✅ **Product reviews/ratings** - Implemented with full CRUD functionality
- ⭐ Email notifications
- ⭐ Wishlist functionality
- ⭐ Payment gateway integration
- ⭐ Order tracking
- ⭐ Product recommendations
- ⭐ Multi-language support
- ⭐ Dark mode
- ⭐ Advanced search filters
- ⭐ Export order reports
- ⭐ Social media integration
- ⭐ Live chat support

---

## 📊 Assessment Criteria

### **Code Quality (25%)**
- Clean, readable code
- Proper code organization
- Consistent naming conventions
- Comments and documentation
- Error handling

### **Functionality (30%)**
- All features work correctly
- No critical bugs
- Edge cases handled
- User experience
- Performance

### **Database Design (15%)**
- Proper schema design
- Relationships defined
- RLS policies implemented
- Data integrity
- Query optimization

### **UI/UX Design (15%)**
- Professional elegant appearance (Fragrant theme)
- Responsive design
- User-friendly interface
- Accessibility
- Visual consistency
- Modern design trends
- Premium aesthetic

### **Security (10%)**
- Input validation
- Authentication security
- SQL injection prevention
- XSS protection
- Secure session management

### **Documentation (5%)**
- README completeness
- Code comments
- Setup instructions
- API documentation

---

## 🎯 Project Milestones

| Week | Milestone | Status |
|------|-----------|--------|
| 1 | Project Setup & Database | ⬜ |
| 2 | Authentication System | ⬜ |
| 3 | Product Catalog | ⬜ |
| 4 | Shopping Cart | ⬜ |
| 5 | Admin Panel | ⬜ |
| 6 | UI/UX Enhancement | ⬜ |
| 7 | Security & Validation | ⬜ |
| 8 | Testing & Documentation | ⬜ |

---

## 📚 Resources & References

### **Documentation**
- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Supabase Documentation](https://supabase.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)

### **Tutorials**
- Express.js Crash Course
- EJS Template Engine Tutorial
- Supabase Authentication Guide
- PostgreSQL Basics

### **Tools**
- [Postman](https://www.postman.com/) - API testing
- [Figma](https://www.figma.com/) - Design mockups
- [Canva](https://www.canva.com/) - Graphics
- [Unsplash](https://unsplash.com/) - Free images

---

## 🐛 Common Issues & Solutions

### **Issue: Database Connection Error**
**Solution:** 
- Verify `.env` file has correct Supabase credentials
- Check Supabase project is active
- Verify network connectivity

### **Issue: Session Not Persisting**
**Solution:**
- Check `SESSION_SECRET` is set
- Verify session middleware is configured
- Check cookie settings

### **Issue: EJS Template Errors**
**Solution:**
- Verify `express-ejs-layouts` is installed
- Check template syntax
- Ensure layout file exists

### **Issue: CORS Errors**
**Solution:**
- Configure CORS middleware
- Check Supabase RLS policies
- Verify API endpoints

---

## 💡 Tips for Success

1. **Start Early**: Don't wait until the deadline
2. **Version Control**: Commit frequently with meaningful messages
3. **Test Regularly**: Test each feature as you build it
4. **Ask Questions**: Use forums, documentation, and mentors
5. **Break It Down**: Tackle one feature at a time
6. **Document As You Go**: Write comments and notes
7. **Backup Your Work**: Use Git and cloud storage
8. **Focus on Core Features**: Don't get distracted by extras
9. **Get Feedback**: Show your work to peers/mentors
10. **Celebrate Milestones**: Reward yourself for progress

---

## 📞 Support & Help

### **Getting Help**
- Review documentation first
- Search for similar issues online
- Ask specific questions with code examples
- Use debugging tools (console.log, browser DevTools)

### **Code Review Checklist**
- [ ] Code follows consistent style
- [ ] Functions are well-named and documented
- [ ] Error handling is implemented
- [ ] Security measures are in place
- [ ] Database queries are optimized
- [ ] UI is responsive and accessible

---

## 🎓 Final Submission Checklist

Before submitting your project, ensure:

- [ ] All features are implemented and working
- [ ] Code is clean and well-documented
- [ ] README.md is complete and accurate
- [ ] `.env.example` file is included (no actual secrets)
- [ ] Database is seeded with sample data
- [ ] Application runs without errors
- [ ] All routes are tested
- [ ] Responsive design works on all devices
- [ ] Security measures are implemented
- [ ] Git repository is properly organized
- [ ] Project is deployed (optional but recommended)

---

## 🚀 Deployment Options

### **Recommended Platforms**
1. **Render** - Free tier available
2. **Railway** - Easy deployment
3. **Heroku** - Popular choice
4. **Vercel** - Good for static + serverless
5. **DigitalOcean** - More control

### **Deployment Checklist**
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Build process tested
- [ ] Domain configured (optional)
- [ ] SSL certificate enabled
- [ ] Monitoring set up

---

## 📈 Future Enhancements

After completing the capstone, consider:

1. **Advanced Features**
   - Real-time notifications
   - Advanced analytics
   - Machine learning recommendations
   - Mobile app development

2. **Technology Upgrades**
   - React/Vue.js frontend
   - GraphQL API
   - Microservices architecture
   - Docker containerization

3. **Business Features**
   - Inventory management
   - Supplier integration
   - Marketing automation
   - Customer support system

---

## 🏆 Success Stories

Students who complete this project will have:
- ✅ A professional portfolio piece
- ✅ Full-stack development experience
- ✅ Real-world problem-solving skills
- ✅ Database design knowledge
- ✅ Security awareness
- ✅ Deployment experience

---

## 📄 License

This project is provided for educational purposes. Students are encouraged to:
- Use it as a learning resource
- Modify and extend it
- Include it in their portfolio
- Share improvements with the community

---

## 🙏 Acknowledgments

This capstone project template is designed to provide a comprehensive learning experience in full-stack web development. Good luck with your project!

**Remember**: The goal is not just to complete the project, but to understand every part of it. Take your time, experiment, and most importantly, enjoy the learning process!

---

---

## 🆕 Latest Updates (2024)

### **Version 2.0.0 - Major Enhancements**

#### **New Features Added:**
1. **Product Reviews System** ✅
   - Users can submit reviews with ratings (1-5 stars)
   - Review display on product pages
   - Average rating calculation
   - Review management (edit/delete own reviews)
   - Admin can delete any review
   - Review validation and sanitization

2. **Elegant Fragrant Theme Design** ✅
   - Premium brown color palette (#8B4513, #A0522D)
   - Sophisticated serif typography (Georgia)
   - Elegant hero banner with gradient overlay
   - Features/services section
   - Customer testimonials section
   - FAQs section with elegant styling
   - Newsletter subscription section
   - Refined product card designs
   - Smooth animations and transitions

3. **Enhanced Homepage** ✅
   - "Essence of Elegance" hero section
   - Three feature cards (Premium Quality, Free Shipping, Money Back)
   - Customer testimonials display
   - Frequently Asked Questions section
   - Newsletter subscription form
   - Improved product showcase

4. **Database Schema Updates** ✅
   - Reviews table with proper relationships
   - RLS policies for reviews
   - Indexes for performance optimization

#### **Technical Improvements:**
- Added `routes/reviews.js` for review management
- Enhanced `middleware/validation.js` with review validation
- Updated CSS with Fragrant theme styling
- Improved JavaScript for reviews functionality
- Enhanced navbar with profile link
- Updated footer styling

#### **Files Added/Modified:**
- `routes/reviews.js` (new)
- `seed/reviews-schema.sql` (new)
- `views/index.ejs` (completely redesigned)
- `views/products/single.ejs` (added reviews section)
- `public/css/style.css` (major theme update)
- `public/js/main.js` (added reviews functionality)
- `views/partials/navbar.ejs` (enhanced)
- `app.js` (added reviews route)

---

*Last Updated: December 2024*
*Version: 2.0.0*

