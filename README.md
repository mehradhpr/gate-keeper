Follows the Modular Monolith backend structure
App and Server are separate files due to these reasons:
- Test app without starting the server
- Separation of concerns: App is responsible for routing and configuration, while server manages the server lifecycle

Authentication should have a dedicated route.
- Token Based Authentication --> JSON Web Tokens | Stateless Authentication System
- Token is placed in the HTTP Authorization Header upon successful login
Authorization should be implemented as a middleware to protect certain resources