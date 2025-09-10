# 🎫 Internal Support Ticket & Issue Tracking System (MERN Stack)

This is a **full-stack internal support ticket and issue tracking system** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It provides a robust and secure platform for employees to raise tickets, for admins to manage and assign them, and for support agents to resolve them. The system also includes **role-based access control**, **email notifications**, and a clean UI built with **MUI (Material UI)**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure **JWT-based login/signup** system.
- **Role-based access**: `employee`, `admin`, and `support agent`.
- Profile management and password change functionality.

### 🧾 Ticket Management
- Employees can **create tickets** with title, description, category.
- Admins can:
  - View all tickets.
  - **Assign tickets** to support agents.
  - Set **ticket priority** (`Low`, `Medium`, `High`).
- Support agents can:
  - View only **assigned tickets**.
  - Add comments.
  - **Change ticket status** (`Open`, `In Progress`, `Resolved`).
  
### 📬 Email Notifications
- Email sent when:
  - Admin **assigns a ticket** to a support agent.
  - Support agent **resolves a ticket** (email sent to employee).
  - **New ticket is created** (email sent to admin).

### 👤 User Profile
- Update name, email, password, and **upload profile image**.
- Admin dashboard to view users and their roles.

### 📊 Filtering & Search
- Search and filter tickets by **category**, **status**, **priority**, and **assigned agent**.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- MUI (Material UI)
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file/image upload)
- Nodemailer (for email functionality)
- JWT (JSON Web Tokens) for authentication
