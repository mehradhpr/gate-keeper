Follows the Modular Monolith backend structure
App and Server are separate files due to these reasons:
- Test app without starting the server
- Separation of concerns: App is responsible for routing and configuration, while server manages the server lifecycle