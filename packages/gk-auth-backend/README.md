# **Auth Package**

An backend and database agnostic authentication package for Node.js applications. This package provides a flexible and scalable solution for managing account authentication.

## **Features**

- **JWT Authentication**:
  - Use **JWT** for stateless API access.
- **Database Agnostic**:
  - Either use the default in-memory database for prototyping, or implement your own
- **Built-In Password Validation**:
  - Optionally, enforce password policy.
- **Account Management**:
  - Register, authenticate, reset password, and delete user accounts.
- **Secure**:
  - Built-in password hashing.
- **Extensibale Account Interface**
  - Do you want to record more than the primary fields, go ahead and define them!

## **Installation**

Install the package using npm:

```bash
npm install @mrhsp/gt-auth-backend
```

## **Usage**

```typescript
import { InMemoryAuthDatabase } from "@mrhsp/gt-auth-backend";
```

## **API Reference**

### **AuthDatabase Interface**

... To be Added

## **Extending the Package**

### **Custom Database Adapter**

To use a custom database (e.g., MongoDB, PostgreSQL), implement the `AuthDatabase` interface:

```typescript
export class CustomAuthDatabase implements AuthDatabase<AuthAccount> {
  async registerAccount(account: AuthAccount): Promise<void> {
    // Custom implementation
  }

  async authenticate(id: string, password: string): Promise<AuthAccount> {
    // Custom implementation
  }

  async createSession(account: AuthAccount): Promise<string> {
    // Custom implementation
  }

  // Implement other methods...
}
```

## **Testing**

This package is tested using **Jest**. To run the tests:

```bash
npm test
```

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## **Acknowledgments**

- Inspired by popular authentication libraries like **Passport.js**.
