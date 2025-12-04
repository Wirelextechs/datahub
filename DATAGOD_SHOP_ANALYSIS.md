# DataGod.store My Shop & Shop Dashboard Analysis

**Date:** December 4, 2025  
**Analysis Time:** 12:17 PM (Africa/Accra)  
**Status:** ✅ Complete Analysis

---

## 📊 Overview

The datagod.store platform has two main agent-related pages:
1. **My Shop** - Product management and shop customization
2. **Shop Dashboard** - Profit tracking, orders, and withdrawals

---

## 🏪 MY SHOP PAGE

### Purpose
Allows agents to manage their shop products, pricing, and shop information.

### Key Features

#### 1. Shop Header Section
- **Shop Name Display** - Shows the agent's shop name
- **Shop Status** - Indicates if shop is active/inactive
- **Edit Shop Button** - Opens dialog to edit shop details

#### 2. Edit Shop Dialog
**Fields:**
- Shop Name (text input)
- Shop Description (textarea)
- Shop Logo (image upload)
- Shop Banner (image upload)
- Shop Status (toggle: Active/Inactive)

**Actions:**
- Save Changes button
- Cancel button

#### 3. Products Display
**Layout:** Grid of product cards showing:
- Product Image
- Product Name
- Product Size (e.g., "1GB", "2GB", "3GB")
- Customer Price (e.g., "GHS 5.00")
- Agent Profit Margin (e.g., "GHS 0.50")
- Network Type (MTN, AirtelTigo, Telecel)
- Validity (e.g., "NON EXPIRE")

#### 4. Product Actions (Per Product Card)
Each product has action buttons:

**Edit Price Button**
- Opens dialog to edit pricing
- Shows current customer price
- Shows current profit margin
- Allows agent to set custom prices
- Allows agent to set custom profit margins
- Save/Cancel buttons

**Edit Product Button**
- Opens dialog to edit product details
- Allows changing product name, description, etc.

**Delete Product Button**
- Removes product from shop

**View Details Button**
- Shows full product information

#### 5. Network Tabs
- **MTN** - Shows MTN products
- **AirtelTigo (AT)** - Shows AirtelTigo products
- **Telecel** - Shows Telecel products
- Tabs filter the product display

#### 6. Add Product Button
- Allows agent to add new products to their shop
- Opens dialog with product creation form

---

## 📈 SHOP DASHBOARD PAGE

### Purpose
Provides agents with analytics, profit tracking, order management, and withdrawal functionality.

### Key Sections

#### 1. Top Statistics Cards
Four main stat cards displayed:

**Card 1: Available Balance**
- Shows current available balance (e.g., "GHS 0.10")
- Subtitle: "Ready to withdraw"
- Icon: Wallet icon
- Color: Blue/Teal

**Card 2: Total Profit**
- Shows all-time profit (e.g., "GHS 0.10")
- Subtitle: "All time profit"
- Icon: Trending up icon
- Color: Green

**Card 3: Total Orders**
- Shows total number of orders (e.g., "1")
- Subtitle: "All orders"
- Icon: Shopping cart icon
- Color: Orange/Yellow

**Card 4: Pending Withdrawals**
- Shows number of pending withdrawal requests (e.g., "0")
- Subtitle: "Awaiting approval"
- Icon: Wallet/Money icon
- Color: Pink/Red

#### 2. Request Withdrawal Button
- Large purple button
- Positioned prominently below stat cards
- Opens withdrawal request dialog
- Allows agent to request withdrawal of available balance

#### 3. Tabbed Interface
Four main tabs for different views:

**Tab 1: Recent Orders (1)**
- Shows recent orders from customers
- Displays order details:
  - Order ID
  - Customer Name
  - Product Purchased
  - Amount
  - Order Date
  - Order Status
- Pagination for multiple orders
- Search/Filter functionality

**Tab 2: Profit History (1)**
- Shows historical profit records
- Displays:
  - Date
  - Product Sold
  - Customer
  - Profit Amount
  - Transaction Status
- Sortable by date, amount, etc.
- Pagination support

**Tab 3: Withdrawals (1)**
- Shows pending withdrawal requests
- Displays:
  - Withdrawal Amount
  - Requested Date
  - Status (Pending/Approved/Rejected)
  - Bank Details
  - Action buttons (Cancel, etc.)
- "Request Withdrawal" button

**Tab 4: Withdrawal History**
- Shows completed withdrawal transactions
- Displays:
  - Withdrawal Amount
  - Requested Date
  - Completed Date
  - Status (Approved/Rejected)
  - Bank Details
  - Transaction Reference

#### 4. Withdrawal Request Dialog
**Fields:**
- Amount to Withdraw (number input)
- Bank Name (dropdown)
- Account Number (text input)
- Account Holder Name (text input)
- Phone Number (text input)

**Actions:**
- Submit Request button
- Cancel button

**Validation:**
- Amount must be <= Available Balance
- All fields required
- Account number format validation

#### 5. Empty States
- When no data exists, shows appropriate empty state message
- Example: "No orders yet" for Recent Orders tab

---

## 🎨 UI/UX Design Patterns

### Color Scheme
- **Primary:** Blue (#0066FF or similar)
- **Success:** Green (#00CC66 or similar)
- **Warning:** Orange/Yellow (#FFAA00 or similar)
- **Danger:** Red/Pink (#FF3366 or similar)
- **Neutral:** Gray (#CCCCCC or similar)

### Layout
- **Sidebar Navigation:** Left sidebar with menu items
- **Main Content:** Right side with full-width content
- **Cards:** Stat cards with icons and values
- **Tabs:** Horizontal tab navigation
- **Tables:** Data displayed in table format with pagination

### Responsive Design
- Mobile: Single column layout
- Tablet: Two column layout
- Desktop: Full layout with sidebar

### Icons Used
- Wallet icon (for balance/money)
- Trending up icon (for profit)
- Shopping cart icon (for orders)
- Money/Wallet icon (for withdrawals)
- Edit icon (for edit actions)
- Delete icon (for delete actions)
- Eye icon (for view details)

---

## 🔄 User Workflows

### Workflow 1: Manage Shop Products
1. Agent navigates to "My Shop"
2. Sees list of products in grid layout
3. Can filter by network (MTN, AT, Telecel)
4. Can edit product prices using "Edit Price" button
5. Can edit product details using "Edit Product" button
6. Can delete products using "Delete" button
7. Can add new products using "Add Product" button

### Workflow 2: Edit Shop Information
1. Agent navigates to "My Shop"
2. Clicks "Edit Shop" button
3. Fills in shop details (name, description, logo, banner)
4. Saves changes
5. Shop information is updated

### Workflow 3: View Profit Analytics
1. Agent navigates to "Shop Dashboard"
2. Sees stat cards with key metrics
3. Clicks on "Profit History" tab
4. Views detailed profit records
5. Can sort/filter by date, amount, etc.

### Workflow 4: Request Withdrawal
1. Agent navigates to "Shop Dashboard"
2. Sees "Available Balance" stat card
3. Clicks "Request Withdrawal" button
4. Fills in withdrawal details (amount, bank, account)
5. Submits request
6. Withdrawal appears in "Withdrawals" tab with "Pending" status
7. Admin approves/rejects withdrawal
8. Withdrawal moves to "Withdrawal History" tab

### Workflow 5: Track Orders
1. Agent navigates to "Shop Dashboard"
2. Clicks "Recent Orders" tab
3. Views list of recent customer orders
4. Can see order details, amounts, dates, status
5. Can search/filter orders

---

## 📱 Data Models

### Shop Model
```
{
  id: string,
  agentId: string,
  shopName: string,
  shopDescription: string,
  shopLogo: string (URL),
  shopBanner: string (URL),
  isActive: boolean,
  createdAt: date,
  updatedAt: date
}
```

### Product Model
```
{
  id: string,
  shopId: string,
  productName: string,
  productSize: string (e.g., "1GB"),
  customerPrice: number,
  agentProfitMargin: number,
  networkType: string (MTN, AT, Telecel),
  validity: string (e.g., "NON EXPIRE"),
  productImage: string (URL),
  isActive: boolean,
  createdAt: date,
  updatedAt: date
}
```

### Order Model
```
{
  id: string,
  shopId: string,
  customerId: string,
  productId: string,
  quantity: number,
  totalAmount: number,
  profitAmount: number,
  orderDate: date,
  status: string (Pending, Completed, Cancelled),
  createdAt: date
}
```

### Profit Record Model
```
{
  id: string,
  shopId: string,
  orderId: string,
  profitAmount: number,
  transactionDate: date,
  status: string (Completed, Pending),
  createdAt: date
}
```

### Withdrawal Model
```
{
  id: string,
  shopId: string,
  amount: number,
  bankName: string,
  accountNumber: string,
  accountHolderName: string,
  phoneNumber: string,
  status: string (Pending, Approved, Rejected),
  requestedDate: date,
  completedDate: date,
  transactionReference: string,
  createdAt: date,
  updatedAt: date
}
```

---

## 🔐 Permissions & Access Control

### Agent Access
- ✅ View own shop
- ✅ Edit own shop details
- ✅ Manage own products
- ✅ View own profit history
- ✅ Request withdrawals
- ✅ View withdrawal status
- ❌ View other agents' shops
- ❌ Approve withdrawals (admin only)

### Admin Access
- ✅ View all shops
- ✅ View all products
- ✅ View all orders
- ✅ View all profit records
- ✅ Approve/Reject withdrawals
- ✅ View all withdrawal requests
- ✅ Manage agents

---

## 🎯 Key Features to Replicate

### For DataHub My Shop Page
1. ✅ Shop header with edit button
2. ✅ Product grid display with network tabs
3. ✅ Edit Price dialog
4. ✅ Edit Product dialog
5. ✅ Delete Product functionality
6. ✅ Add Product button
7. ✅ Product filtering by network

### For DataHub Shop Dashboard
1. ✅ Four stat cards (Available Balance, Total Profit, Total Orders, Pending Withdrawals)
2. ✅ Request Withdrawal button
3. ✅ Tabbed interface (Recent Orders, Profit History, Withdrawals, Withdrawal History)
4. ✅ Recent Orders tab with order list
5. ✅ Profit History tab with profit records
6. ✅ Withdrawals tab with pending requests
7. ✅ Withdrawal History tab with completed transactions
8. ✅ Withdrawal request dialog
9. ✅ Empty states for no data

---

## 🎨 Design Elements

### Stat Cards
- Icon on left side
- Value in large font
- Subtitle below value
- Background color based on type
- Responsive layout

### Tabs
- Horizontal tab navigation
- Active tab highlighted
- Tab count in parentheses (e.g., "Recent Orders (1)")
- Content changes on tab click

### Buttons
- Primary button: Purple/Blue
- Secondary button: Gray
- Danger button: Red
- Success button: Green
- Buttons have hover effects

### Forms
- Input fields with labels
- Dropdown selects
- Textarea for descriptions
- File upload for images
- Form validation with error messages
- Submit and Cancel buttons

### Tables
- Column headers
- Row data
- Pagination controls
- Search/Filter functionality
- Sortable columns
- Action buttons per row

---

## 📋 Implementation Checklist

### Phase 1: My Shop Page
- [ ] Create My Shop page component
- [ ] Add shop header section
- [ ] Add Edit Shop dialog
- [ ] Create product grid layout
- [ ] Add network tabs (MTN, AT, Telecel)
- [ ] Add Edit Price dialog
- [ ] Add Edit Product dialog
- [ ] Add Delete Product functionality
- [ ] Add Add Product button
- [ ] Add product filtering logic
- [ ] Style with Tailwind CSS
- [ ] Add responsive design
- [ ] Test all interactions

### Phase 2: Shop Dashboard
- [ ] Create Shop Dashboard page component
- [ ] Add four stat cards
- [ ] Add Request Withdrawal button
- [ ] Create tabbed interface
- [ ] Add Recent Orders tab
- [ ] Add Profit History tab
- [ ] Add Withdrawals tab
- [ ] Add Withdrawal History tab
- [ ] Add Withdrawal request dialog
- [ ] Add empty states
- [ ] Add pagination for tables
- [ ] Add search/filter functionality
- [ ] Style with Tailwind CSS
- [ ] Add responsive design
- [ ] Test all interactions

### Phase 3: Backend Integration
- [ ] Create API endpoints for shop management
- [ ] Create API endpoints for product management
- [ ] Create API endpoints for order retrieval
- [ ] Create API endpoints for profit tracking
- [ ] Create API endpoints for withdrawal management
- [ ] Add database models
- [ ] Add authentication/authorization
- [ ] Add data validation
- [ ] Add error handling

### Phase 4: Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Browser compatibility testing
- [ ] Mobile responsiveness testing
- [ ] Performance testing
- [ ] Security testing
- [ ] Deploy to production

---

## 🚀 Next Steps

1. Create My Shop page component
2. Create Shop Dashboard page component
3. Implement all UI elements
4. Add interactivity and state management
5. Connect to backend APIs
6. Test thoroughly
7. Deploy to production

---

**Analysis Complete!** ✅

This analysis provides a comprehensive understanding of the datagod.store My Shop and Shop Dashboard functionality. The next step is to replicate these features in your DataHub project.

