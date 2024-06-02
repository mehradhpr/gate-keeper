# Gate Keeper
#### A Dynamic Role Based Access Control (RBAC) solution for web applications, following the industry's standards and best practices.

## How to Run
1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Use the command `npm run dev` to start the server.

## Why is it safe?
- **JSON Web Tokens**: Utilizes JWT for authentication and authorization to verify the user's identity and role.
- **Password Hashing**: All the passwords are stored in the database after hashing them using bcrypt.
- **Middleware**: Protects the routes by checking the user's role and permissions before allowing access.