
# 🔐 Hono Auth System – JWT, Email OTP & Session Auth

Welcome to the Hono-based authentication server built using **Node.js**, **JWT**, and **Email OTP verification**. This project demonstrates how to implement modern authentication techniques like **JWT-based token auth** and **OTP via email**, using the high-performance **Hono framework**.

---

## 🚀 Features

- 🔑 JWT Token Generation & Verification  
- 📩 Email OTP (One-Time Password) System  
- 🔒 Custom Middleware for Route Protection  
- 📦 Pretty JSON responses for easy debugging  
- 💨 Powered by [Hono](https://hono.dev) – ultra-fast web framework

---

## 🧱 Tech Stack

- [Hono](https://hono.dev)
- Node.js
- JSON Web Token (`jsonwebtoken`)
- Dotenv
- (Optional) Nodemailer (for email sending)

---

## 📂 Project Structure

```
.
├── server.ts         # Main server entry point
├── .env              # Environment variables (SECRET_KEY, etc.)
├── services/
│   └── mail.js       # Placeholder for email sending logic
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hono-auth-system.git
   cd hono-auth-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up `.env` file**
   ```env
   SECRET_KEY=your_secret_key_here
   ```

4. **Start the server**
   ```bash
   pnpm dev  # or node server.ts
   ```

---

## 🔗 API Routes

### ➤ Root
- `GET /` — Basic test route to check if server is running.

---

### ➤ Users (Protected)
> Requires query param `?name=User_name`

- `GET /users` — Get user data
- `GET /users/:id?name=user_name` — Get user details by ID

---

### ➤ JWT Authentication

- `GET /auth/jwt/token`  
  Returns a JWT token signed with the server’s secret key.

- `POST /auth/jwt/verify-token`  
  Verifies the token sent in `Authorization: Bearer <token>` header.  
  Returns a message if token is valid or expired.

---

### ➤ Email OTP Authentication

- `GET /auth/email?email=your@email.com`  
  Generates a random OTP and logs it (simulating email send).

- `POST /auth/email`  
  Accepts email input and logs OTP sending (to be extended with real mail service).

- `GET /auth/email/verify-otp?otp=123456`  
  Verifies if the user-entered OTP is valid.

---

## 📌 Notes

- JWT token expires in 1 hour.
- OTP is generated and stored temporarily in memory (not persistent).
- Email sending is mocked – you can integrate [Nodemailer](https://nodemailer.com/about/) or any email API.

---

## 📧 To Do / Future Improvements

- 🔄 Add session-based authentication
- ✅ Connect real email service to send OTP
- 🔐 Add role-based access control
- 🧪 Add tests

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Tejas Shinde**  
[GitHub](https://github.com/TEJAS-SHINDEE)
