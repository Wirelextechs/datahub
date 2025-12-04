# DataHub - Premium Data Solution Platform

A comprehensive data management platform built with Next.js, featuring user dashboards, admin panels, and shop management systems.

## 🚀 Features

### User Dashboard
- **My Orders** - View and manage all data orders with search and filtering
- **Wallet** - Manage wallet balance, top-ups, and view transaction history
- **Transactions** - Complete transaction history with detailed information
- **Support Center** - Create support tickets and access FAQs
- **Profile** - Manage user profile and account settings
- **Complaints** - Track and manage complaints

### Admin Dashboard
- **User Management** - View, edit, and manage all users
- **Orders Management** - Monitor and manage all platform orders
- **Complaints Management** - Handle customer complaints and support tickets
- **Shop Approvals** - Approve or reject shop applications
- **Platform Settings** - Configure commission rates, withdrawal limits, and system settings

### Shop Dashboard
- **Profit Tracking** - Monitor available balance and total profits
- **Order Management** - View recent orders and profit history
- **Withdrawal System** - Request withdrawals with multiple payment methods
- **Performance Metrics** - Track shop performance and statistics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL
- **Authentication**: Custom JWT-based authentication
- **Icons**: Lucide React
- **Animations**: Motion

## 📋 Prerequisites

- Node.js 18+ or Bun
- PostgreSQL 12+
- Git

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Wirelextechs/datahub.git
cd datahub
```

2. **Install dependencies**
```bash
bun install
# or
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/datahub_db
```

4. **Set up the database**
```bash
createdb -h localhost datahub_db
```

5. **Run the development server**
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
datahub/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   │   ├── users/
│   │   ├── orders/
│   │   ├── complaints/
│   │   ├── approvals/
│   │   └── settings/
│   ├── dashboard/             # User dashboard pages
│   │   ├── orders/
│   │   ├── wallet/
│   │   ├── transactions/
│   │   ├── support/
│   │   ├── shop-dashboard/
│   │   └── profile/
│   ├── api/                   # API routes
│   │   └── auth/
│   ├── login/                 # Authentication pages
│   ├── signup/
│   └── layout.tsx
├── components/                # Reusable UI components
│   └── ui/
├── lib/                       # Utility functions
├── public/                    # Static assets
└── package.json
```

## 🔐 Authentication

### Default Admin Account
- **Email**: prosperwedam4424@gmail.com
- **Password**: password123
- **Role**: Admin

### Login
Navigate to `/login` and enter your credentials.

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 UI Components

The project uses shadcn/ui components including:
- Card
- Button
- Input
- Select
- Tabs
- Dialog
- And many more...

## 📱 Responsive Design

All pages are fully responsive and optimized for:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku
- And more...

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Prosper Wedam**
- Email: prosperwedam4424@gmail.com
- GitHub: [@Wirelextechs](https://github.com/Wirelextechs)

## 🆘 Support

For support, email support@datahub.com or open an issue on GitHub.

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- User dashboard with orders, wallet, and transactions
- Admin dashboard with user and order management
- Shop dashboard with profit tracking
- Support center with ticket management
- Complete authentication system

---

**Last Updated**: December 4, 2025
