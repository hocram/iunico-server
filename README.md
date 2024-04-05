# IUnicò Server

***IUnicò Server*** is a lightweight open-source solution that easily provides an intuitive and affordable (cost-effective) back-end server infrastructure. It is designed to be efficient, fast, free and highly modular, developed using the power of the Nest.js framework. Aimed to be simple yet powerful, according to the KISS (Keep It Simple, Stupid) philosophy, it is a solution thinked to be efficient, fast, free and highly modular. It includes modules for user management, authentication, REST API services creation and WebSocket communication, with the possibility of expansion through additional modules. Currently, it is a ***work-in-progress*** project, and we welcome any form of support.

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)  [![Node.js Version](https://img.shields.io/badge/Node.js-v20.11.0-green)](https://nodejs.org/)  [![NPM Version](https://img.shields.io/npm/v/npm?color=green)](https://www.npmjs.com)  [![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)  [![Nest.js Version](https://img.shields.io/badge/-NestJs-ea2845?logo=nestjs&logoColor=white)](https://nestjs.com/)  


## Description

***IUnicò Server*** is an open-source back-end base server architecture, developed with the modern and scalable Nest.js framework. Currently seen as a ***work-in-progress*** solution, IUnicò Server's ***vision*** is to create a highly modular architecture that provides a solid base to rapidly initiating a server applications, connect different existing components and evolve with new specialised modules.

Designed with the aim to providing a robust and flexible base platform for web and mobile application development, focusing on enhancing functionality without sacrificing clarity, simplicity of implementation and maintenance, all in line with the KISS (Keep It Simple, Stupid) philosophy.

Originally designed as an educational resource, IUnicò Server has evolved into a comprehensive solution, leveraging the extensive capabilities offered by the Nest.js framework, by incorporating advanced features such as caching, TypeORM, and versatile database connectivity (starting with SQLite and extending to others), along with middleware for efficient request handling, while also enabling robust communication through REST API and WebSocket. Furthermore, it provides a modular project structure, designed to facilitate the integration and customization of new features. The server aims to optimize response handling and efficiency, demonstrating a significant leap from its educational beginnings to a highly functional server solution.

The platform features a modular architecture that includes everything needed to quickly start a server application: from user management, through authentication, to the creation of REST API services and real-time communication via WebSocket. This setup not only facilitates the development of new features but also the scalability of the system in response to increased workload or expansion of its functionalities. This framework supports a wide range of functionalities, from user management and authentication to the development of REST API services and WebSocket communication, ensuring that the system is not only flexible but also scalable to meet the increasing demands of projects and expansions.

User management is designed to be intuitive yet comprehensive, offering support for common operations such as registration, login, password recovery, and user profile management. The authentication system is equally robust, ensuring security through the use of JWT (JSON Web Tokens) or custom authentication strategies, as required by the project.

Regarding API development, our server fully supports the creation of REST API services, allowing easy integration with other applications and services. WebSocket communication, on the other hand, opens up possibilities for real-time messaging, push notifications, and much more, making the system extremely versatile and suitable for a wide range of use cases.

This project represents a complete and well-structured solution for those looking to develop efficient, secure, and easy-to-maintain back-end applications, without sacrificing the power and flexibility offered by the Nest.js framework. Its unique approach from an educational resource to a fully functional back-end solution sets it apart from other server solutions, highlighting its commitment to learning, innovation, and high-quality development.

At the moment is a ***work-in-progress solution***, and we welcome any form of support.

Grab the source and join the **fun**! ✌️  
Your **participation** will help grow and improve this project.


## Reference

- ***Website***: [IUnicò Server](https://github.com/hocram/iunico-server)
- ***Repository***: [Github](https://github.com/hocram/iunico-server) - https://github.com/hocram/iunico-server


## Key Features

- ***Open Source and Free***: The IUnicò Server is an open-source and free solution, making it accessible to a wide range of developers and businesses.
- ***Powered by Nest.js***: Utilizes the modern and scalable Nest.js framework, known for its efficiency and flexibility in developing back-end applications.
- ***Flexibility and Robustness***: Designed to be a robust and flexible base platform for web and mobile application development.
- ***KISS Philosophy***: Adheres to the Keep It Simple, Stupid (KISS) philosophy, emphasizing clarity, simplicity of implementation, and maintenance.
- ***Evolved from Educational Resource***: Initially started as an educational resource, the project has evolved to incorporate advanced features and become a complete server solution.
- ***Integration of Advanced Features***: Includes advanced features such as caching through TypeORM and SQLite, and managing proxy requests with middleware to optimize response handling and efficiency.
- ***Modular Architecture***: Enjoy flexibility with built-in modules and the option to expand. Features a modular architecture that facilitates rapid server application development, including user management, authentication, REST API services creation, and real-time communication via WebSocket.
- ***Scalability***: The modular design and utilized technologies make the system easily scalable in response to increased workload or expansion of its functionalities.
- ***Intuitive User Management***: Provides support for common operations such as registration, login, password recovery, and user profile management, making it intuitive yet comprehensive.
- ***Security First and Robust Authentication System***: Robust authentication with JWT and custom strategies. Ensures security through the use of JWT (JSON Web Tokens) or custom authentication strategies, demonstrating flexibility and adaptability to the project's specific needs.
- ***API Development and WebSocket Communication***: Fully supports the creation of REST API services and opens up possibilities for real-time messaging, push notifications, and much more, making the system extremely versatile.
- ***Efficiency, Security, and Easy Maintenance***: Represents a complete and well-structured solution for developing efficient, secure, and easy-to-maintain back-end applications.


## Technologies

A list of technologies used within the project:

- [Nest.js](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [Passport](https://www.passportjs.org/)
- [Swagger](https://swagger.io/)


## Requirements

Before installing and running the IUnicò Server, ensure your system meets the following requirements:

- ***Node.js***: The latest LTS (Long Term Support) version of Node.js is required, as Nest.js is a Node.js framework. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).
- ***NPM*** (Node Package Manager): Comes bundled with Node.js. It's used for managing dependencies. Ensure you have the latest version installed by running npm install npm@latest -g in your terminal.
- ***Database***: This project supports SQLite out-of-the-box due to its integration with TypeORM. For production environments, you might consider other TypeORM supported databases such as PostgreSQL, MySQL, MariaDB, etc., depending on your scalability and performance requirements.
- ***Git***: For version control and to clone the project repository.


## Intallation

Follow these steps to install and get and running your IUnicò Server:

1. Install [Node.js](https://nodejs.org/)

2.  Clone this repository to your computer.

```
  git clone https://github.com/hocram/iunico-server.git
```

3.  Install the project dependencies.  
  Using npm:

```
  npm install
```

4. Configure Environment.  
Modify the .env file to reflect the configuration of your environment as described in the configurations section below.

5. Start Server.  
  Using the following command:

```
  npm start
```
  
  For development, you may want to use:

```
  npm run start:dev
```

The server will listen for client requests and forward them to the destination server.

6.  Verify Installation.  
Open a web browser and navigate to [**http://localhost:3000/api/hello**](http://localhost:3000/api/hello) (or the port specified in the environment file). If the server is running correctly, you should see the default welcome "Hello World!" message.


## Configurations

You can customize the server's behavior by editing the environment config file: 'src/environments/dev.env' (default).

**NOTE**: for the Windows users must install cross-env package as windows doesn't support this way of loading variables and alter the commands like so "start:dev": "cross-env NODE_ENV=dev nest start --watch"


## Release History

To view the changes made to our project over time, please refer to the [**CHANGELOG.md**](CHANGELOG.md) file. In this document, you will find a detailed list of all the released versions, including new features introduced, improvements made, and bugs fixed. We encourage you to consult it to stay informed about the project's development.


## Roadmap - Future Plans

Our project is currently in an early stage and is considered a work in progress. We are dedicated to improving the codebase and adding new features and specific modules to make the server a versatile platform base suitable for multiple purposes. Our roadmap includes the following key areas of focus:

- Code Optimization: Continuously refining the code to enhance performance, security, and maintainability.
- Feature Expansion: Implementing new features that extend the server's capabilities, making it more powerful and flexible for developers.
- Module Development: Developing specific modules tailored to various use cases, enabling the server to cater to a wide range of applications and services.
- Community Feedback: Actively seeking feedback from the community to guide the development process, ensuring the server meets the needs of its users.
- Documentation Improvement: Enhancing the documentation to make it more comprehensive and user-friendly, assisting developers in making the most out of our platform.  
  We welcome any comments or support from the community. Your input is invaluable to us and plays a crucial role in shaping the future of this project. If you're interested in contributing, please refer to the "Contributing" section for more details on how you can get involved. Together, we can build a robust, flexible, and user-friendly back-end platform that serves a multitude of purposes.


### TODO (not in order)

- [x] Initialize github project
- [x] Create the basic project structure with the nest.js framework
- [x] Addition of the typeorm package and SQLite database (initial for local development)
- [x] User module: added user management module
- [x] Login & Auth Module: dded module for authentication and management of permissions and roles
- [x] Logger Module: Added logger functions
- [x] API: additional controllers and REST API services
- [x] Socket: Added module for managing socket gateways
- [x] Initial setup for SQLite database
- [ ] Add other framework and libraries
- [ ] Redis Integration
- [ ] Design & Codebase Refinement
- [ ] Performance Optimization
- [ ] Unit testing
- [ ] FAQs Section
- [ ] Identify new Feature to development
- [ ] Think and add new module
- [ ] Documentation Expansion
- [ ] Community & Sponsor Engagement
- [ ] Docker Integration (soon as an external project)
- [ ] Front-End Integration (soon as an external project)


## Contacts

For questions, bug reports, or suggestions, you can reach out to us through GitHub's issue tracking system:

- [Open a new issue](https://github.com/hocram/iunico-server/issues/new) to report problems or propose enhancements.
- Please refer to our [Issue Guidelines](https://github.com/hocram/iunico-server/blob/main/ISSUE_GUIDELINES.md) before opening a new issue.


## Author

- Name: **Marco (Hocram) Di Pasquale**
- GitHub Profile: [Hocram](https://github.com/hocram) (https://github.com/hocram)


## Contributing

We're looking for contributors to help take our project to the next level. Your support, whether it's fixing a bug, adding a feature, or improving documentation, is invaluable to us. To get involved, please refer to our [**CONTRIBUTING.md**](CONTRIBUTING.md) guide in the project repository.  
We are waiting for you!


## Sponsors

Please consider sponsoring this project! Your help will allow maintainers to dedicate more time and resources to its development and support.


## Support and Donation Information
Found this project useful? This project needs you! ❤️  
If you would like to support the further development of this project, its creator or its ongoing maintenance, please feel free to make a donation. Your donation is much appreciated (and I love food, sweets, coffee and beer 🤣). **Thank you!**  

If you can contribute or you want to:
- ✉️ Messages of greeting or support are much appreciated to know if the project is liked and used.
- Give a **Star**! Support by clicking the ⭐️ button on the upper right of this page.
- Notice anything else missing? **Open an issue**.
- Feel **free to contribute** to the project in any way, from typo corrections in the documentation to code reviews; all contributions are welcome.

Thank you for considering contributing to our project.  
Your involvement is essential for our continuation! ✌️


## License

This project is licensed under the [MIT](LICENSE) License, Copyright (c) 2023-2024 - Marco Di Pasquale (Hocram) Author - Iunico Creative.  
See the [LICENSE](LICENSE) file for details.


## Thank You!

A big thank you to everyone who will contribute to perfecting this project. Your future contributions will be greatly appreciated and will help make this educational resource even better, while always keeping in mind the KISS (Keep It Simple, Stupid) methodology for design: striving to keep it simple, clear, and uncomplicated.

Happy coding and learning! :smile: 😎

***Hocram***
