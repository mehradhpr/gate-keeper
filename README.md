# Gate Keeper

This is a full-stack project with the main objective of exploring modern standards of web authentication and authorization.

Gate Keeper follows the RBAC (Role-Based Access Control) system, where each account will be assigned one or multple roles, and each role grants access to a specific range of resources to the assignee. Role management is done by the administrator of the system, althrough might not limited to them solely.

To follow the practice of separation of concerns, the backend and frontend are in distinct directories.

**Main App Requirements** [Subject to Change]

1. The user of an account can log in using the account's email and password. Successful entry will grant access to some resources specified by the roles assigned to that particular account.
2. A new account can be created by providing the following information:
   - First Name
   - Last Name
   - Email (Must be Verified)
   - Password (Strict Rules Apply)
3. The user can log out at any time.
4. Admin is a special account that has all the privilages and some extra:
   - Create a New Role
   - Delete a Role
   - Modify a Role
   - Assign a role to an account
   - Unassign a role from an account

**Model Definitions**

- Account

  - ID
  - First Name
  - Last Name
  - Email
  - Password (encrypted)
  - Roles Assigned

- Role

  - ID
  - Name
  - Permissions
  - Assigned Accounts

- Permission
  - ID
  - Name
  - Resources

**_Special Admin Account_**

- ID: Any
- First Name: "Admin"
- Last Name: "Admin"
- Email: Any
- Password: Any
- Roles: All

## Backend

### Architecture

**Follows the Modular Monolith backend structure.**
App and Server are separate files due to these reasons:

- Test app without starting the server
- Separation of concerns: App is responsible for routing and configuration, while server manages the server lifecycle

Authentication should have a dedicated route.

- Token Based Authentication --> JSON Web Tokens | Stateless Authentication System
- Token is placed in the HTTP Authorization Header upon successful login
  Authorization should be implemented as a middleware to protect certain resources

## Frontend Developer notes

Use Vite with React and TypeScript.
Use React Router Dom for routing.
pages directory contains react components that are used to render a specific route defined in App.tsx.
components directory contains react components that can be used anywhere.
For styling, CSS modules are chosen due to their simplicity and effectiveness for medium-sized projects.

Each component, will be under its own folder alongside with a CSS module file and an index.ts as an export file
