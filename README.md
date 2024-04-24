1. Setting up project dependencies:
    Create a package.json file.
    Install dependencies with npm install.
    Use the package name leaguex_gaming.
   
2. Configuration:
    Create a config.json file to store database configuration.
    Set database connection parameters :
    {
      "username": "root",
      "password": "",
      "database": "leagueX",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }

3. Database Management:
     Create sequelize.ts for Sequelize setup.
     Generate migration files for database schema changes.
     Create models and initialize them.

4. Application Structure:

    Create an app folder.
    Inside the app folder, create:
        Controllers
        Models
        Services
        Routes
    Implement middleware for authentication.

5. Redis Integration:

     Create a redis folder.
     Inside the redis folder, create:
     redisService for interacting with Redis.
     recommendationCacheMiddleware for caching data in Redis.

6. Data Seeding:

   Implement seeders to generate random data for the database tables.

7. Server Setup:

    Create an app.ts file to start the server.
    Use Express.js or any other preferred framework.

8. Environment Variables:

    Implement envResolver to handle environment variables.
    Use joiValidaors for validating environment variables.

9. Summary:
    
       This project aims to provide post recommendations.
      It utilizes Sequelize for database management.
      Middleware and Redis caching are employed for authentication and data caching.
      Seeders are used to populate the database with sample data.
      Environment variables are managed for configuration.


Important command :- 

To create migration : npx sequelize-cli migration:create --name create-table_name
To run the migration : npx sequelize-cli db:migrate
Command to run script on local : export $(cat .env) && NODE_ENV=local npx ts-node-dev app/scripts/fileName.ts
command to run server : npm run dev

Feel free to expand on each point with additional details or code snippets as needed. :)




