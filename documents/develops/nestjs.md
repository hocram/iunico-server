# NEST.JS

# install
npm init
npm i -g @nestjs/cli

# mac
/usr/local/lib/node_modules/@nestjs
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
sudo chown -R $USER /usr/local/bin/

# new project
nest new project-name --skip-git

# no spec
add to nest-cli.json :
    "generateOptions": {
        "spec": false
    }

# run nest server
npm run start:debug
http://localhost:3000

# create
nest g resource users
nest g module contacts
nest g class models/kan-board
nest g service services/kan-board
nest g controller controllers/kan-board

# create all resource
nest g resource users

# create module
nest generate module [module-name]

# create model
nest g class models/[model-name] --no-spec

# create service
nest g service services/[service-name]

# create controller
nest g controller controllers/[controller-name]

# Create Object
models
entities
dto
dao
mapper
validator

# Install libs

npm i @automapper/core @automapper/nestjs @automapper/types @nestjs/config @nestjs/jwt @nestjs/passport @nestjs/platform-socket.io @nestjs/typeorm @nestjs/websockets bcrypt passport passport-jwt passport-local sqlite3 tslib typeorm class-validator class-transformer @nestjs/swagger swagger-ui-express cookie-parser

npm i --dave-dev @types/bcrypt @types/passport-local @types/passport @types/passport-jwt 

