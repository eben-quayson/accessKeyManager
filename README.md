
# Access Key Manager

Access Key Manager is a web application for managing access keys for various schools using a multi-tenant school management platform. This application allows schools to purchase access keys to activate their accounts, manage users, and perform various administrative tasks.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Email Verification
- Password Reset
- Admin Dashboard
- User Dashboard
- Access Key Management
- Email Notifications

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript)
- Nodemailer

## Project Structure

```
key-manager/
│
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   ├── javascript/
│   │   └── main.js
│   └── index.ejs
│
├── views/
│   ├── signin.ejs
│   ├── signup.ejs
│   ├── dashboard.ejs
│   ├── accesskeys.ejs
│   ├── resetPasswordRequest.ejs
│   └── resetPassword.ejs
│
├── config/
│   └── config.js
│
├── controllers/
│   ├── authController.js
│   ├── keyController.js
│   ├── userController.js
│   └── adminController.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── models/
│   ├── AccessKey.js
│   ├── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── keyRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
│
├── services/
│   ├── authService.js
│   ├── keyService.js
│   ├── userService.js
│   └── passwordService.js
│
├── utils/
│   ├── generateKey.js
│   └── sendEmail.js
│
├── app.js
├── package.json
└── .env
```

## Installation

1. **Clone the repository:**

```sh
git clone https://github.com/eben-quayson/accessKeyManager.git
cd accessKeyManager
```

2. **Install dependencies:**

```sh
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
SESSION_SECRET=your_session_secret
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

4. **Create database schema:**

Ensure your PostgreSQL server is running and execute the schema creation script in `App.js`:

```sh
node app.js
```

## Running the Application

Start the application:

```sh
npm start
```

Visit `http://localhost:3000` in your browser.

## Usage

### User Authentication

- **Sign Up**: Navigate to `/auth/signup` to create a new account.
- **Sign In**: Navigate to `/auth/signin` to sign in to your account.
- **Sign Out**: Use the sign out link on the dashboard.

### Email Verification

After signing up, an email will be sent to the provided email address with a verification link. Click the link to verify your email.

### Password Reset

- **Request Reset**: Navigate to `/password/request` to request a password reset.
- **Reset Password**: Follow the link sent to your email to reset your password.

### Dashboard

- **User Dashboard**: After signing in, users will be redirected to `/dashboard` where they can see their access keys.
- **Admin Dashboard**: Admin users can see all access keys.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements
- Thanks to the open-source community for providing essential tools and resources.

```

This README.md file provides an overview of the project, including its features, structure, installation instructions, usage details, and contribution guidelines. You can further customize it to suit your specific requirements.
