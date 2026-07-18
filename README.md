# Prise CMS

> A centralized Content Management System (CMS) for managing all Prise platform modules, companies, and business operations.

## Overview

Prise CMS is the administration portal of the **Prise Platform**, providing a single interface to manage companies, users, modules, permissions, and operational data across the ecosystem.

The CMS acts as the control center for different Prise modules, allowing administrators to configure, monitor, and manage each business application from one place.

---

## Modules

The CMS currently supports the management of multiple Prise modules including:

### 🏢 Company Management
- Create and manage companies
- Company profile management
- Theme and branding configuration
- Company-specific settings

### 🛍 Showcase
An e-commerce management module.

Features include:

- Product Management
- Categories
- Tags
- Brands
- Banners
- Product Images
- Inventory Management
- Product Variants
- Product Status
- SEO Information

### ⏰ ClockMe
A workforce and attendance management module.

Features include:

- Employee Management
- Attendance Tracking
- Shift Management
- Time Logs
- Workforce Monitoring

### 📦 Future Modules

The architecture is designed to be modular, allowing additional business modules to be integrated without affecting the existing system.



## Key Features

- Multi-company support
- Modular architecture
- Role-based access control
- Dashboard analytics
- Dynamic module management
- Secure authentication
- Responsive admin interface
- Scalable architecture
- REST API integration

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- React Query
- React Hook Form
- Tailwind CSS
- Shadcn UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Architecture

```
Prise CMS
│
├── Company Management
│
├── Showcase
│   ├── Products
│   ├── Categories
│   ├── Tags
│   ├── Brands
│   └── Banners
│
├── ClockMe
│   ├── Employees
│   ├── Attendance
│   ├── Shifts
│   └── Time Logs
│
└── Future Modules
```

---

## User Roles

The CMS supports multiple administrative levels.

### Level 1 Administrator
- Full system access
- Manage all companies
- Configure modules
- Create administrators

### Level 2 Administrator
- Platform administration
- Company management
- Operational management

### Level 3 Company Owner
- Manage their own company
- Configure company modules
- Manage employees and users

### Level 4 Staff/Admin
- Limited access based on assigned permissions

---

## Project Goals

The primary goal of Prise CMS is to provide:

- A centralized administration platform
- Easy management of multiple businesses
- Modular business applications
- Scalable enterprise architecture
- Consistent user experience across all modules

---

## Installation

Clone the repository:

```bash
git clone https://github.com/johnbaishya/prise-cms.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Folder Structure

```
src/
├── components/
├── features/
├── pages/
├── layouts/
├── routes/
├── services/
├── hooks/
├── utils/
├── types/
└── assets/
```

---

## Screenshots

> Screenshots will be added soon.

---

## Roadmap

- Dashboard improvements
- Advanced analytics
- Notification system
- Audit logs
- File management
- Activity history
- Multi-language support
- Theme customization
- Plugin system
- Additional business modules

---

## License

This project is currently private and maintained by the Snaptap development team.

---

## Author

**John Baishya**

Full Stack Developer

- React
- React Native
- Node.js
- TypeScript
- MongoDB

GitHub: https://github.com/johnbaishya
