import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AuditLogsEntity } from './models/entities/audit-logs-entity';

// USERS
import { UserMapper } from 'src/modules/user/models/mappers/user-mapper';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserEntity } from './models/entities/user-entity';

// ROLES
import { RoleMapper } from './models/mappers/role-mapper';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { RoleEntity } from './models/entities/role-entity';

// PERMISSIONS
import { PermissionMapper } from './models/mappers/permission-mapper';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permisssions.service';
import { PermissionsEntity } from './models/entities/permission-entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // ENTITY
            //AuditLogsEntity,
            UserEntity,
            RoleEntity,
            PermissionsEntity,
        ]),
    ],
    controllers: [
        // CONTROLLERS
        UsersController,
        RolesController,
        PermissionsController,
    ],
    providers: [
        // SERVICES
        UsersService,
        RolesService,
        PermissionsService,
        // MAPPERS
        UserMapper,
        RoleMapper,
        PermissionMapper
    ],
    exports: [
        UsersService,
        RolesService,
        PermissionsService
    ]
})
export class UserModule {}

// https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication
// https://github.com/bhaidar/nestjs-todo-app/tree/master/server/db/initdb.d
