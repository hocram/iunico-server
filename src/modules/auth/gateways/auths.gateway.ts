import { Socket, } from 'socket.io';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { AuthService } from 'src/modules/auth/services/auths.service';
import { LoginStatusDto } from 'src/modules/auth/models/dtos/login-status.dto';
import { Logger } from '@nestjs/common';
import { SocketServerGateway } from 'src/modules/socket-gateway/gateways/socket-server.gateway';

@WebSocketGateway({ 
    cors: '*:*' 
})
export class AuthGateway {

    // LOG
    private readonly logger: Logger = new Logger('AuthGateway');

    // CONSTRUCTOR
    constructor(
        private readonly serverGateway: SocketServerGateway,
        private readonly service: AuthService
    ){}

    // LOGIN
    @SubscribeMessage('login')
    async onLoginEvent(
        @ConnectedSocket() client: Socket, 
        @MessageBody() payload: string): Promise<void> {
        this.logger.log("SOCKET LOGIN payload: ", payload);
        let payload_json = null;
        try{
            if( payload ){
                payload_json = JSON.parse(payload);
                if( !payload_json.username || !payload_json.password ){
                    payload_json = null
                }
            }
        }catch(e){
            payload_json = null;
        }
        if( payload_json == null ) {
            let status: LoginStatusDto = {
                success: false,
                token: null,
                user: null
            } as LoginStatusDto;
            this.serverGateway.server.emit('login_auth', status);
            return;
        }
        let authLoginDto = {
            username: payload_json.username,
            password: payload_json.password
        }
        let status: LoginStatusDto = await this.service.login(authLoginDto);
        this.logger.log("SOCKET LOGIN status: ", status);
        this.serverGateway.server.emit('login_auth', status);
    }

}