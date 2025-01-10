# Gate Keeper

A Dynamic Role Based Access Control (DRAC) System

# Development notes

### How does the flow of the authentication look like?

On a high level, this has four major components to it:

1. Client UI: The client is responsible for sending the login/register forms, and manageing the active session.
2. Middleware: To filter out the requests to the server based on the proper permissions and authorizations.
3. Auth API: interacts with the client and database to process the authentication routines such as logging in and registring.
4. Database: Stores the accounts, roles and permissions and their relationship.

### How to take care of the expired tokens?

First of all, the JWT verifier has return a response where it shows that the token is expired.

Then there are two options on the table:

1. Reset the token and the session (User friendly but not safe)
2. Redirect the user to the login page and ask them to log in again (safer but requires more action from the user)
