import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketServerGateway } from './gateways/socket-server.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // ENTITY
        ]),
    ],
    controllers: [
    ],
    providers: [
        // SERVICES
        // MAPPERS
        // SOCKETS
        SocketServerGateway,
    ],
    exports: [
        // SERVICES
        // MAPPERS
        // SOCKETS
        SocketServerGateway,
    ]
})
export class SocketGatewayModule {}