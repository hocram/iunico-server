import { Socket, Server } from 'socket.io';
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
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: '*:*' })
export class SocketServerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    // LOG
    private readonly logger: Logger = new Logger('ServerGateway');
   
    // SERVER SOCKET
    @WebSocketServer() 
    public server: Server;

    // CONSTRUCTOR
    constructor(
    ){}

    // INIT
    afterInit(server: Socket) {
        this.logger.log('LOG SOCKET Websocket-chat initialized');
        //console.log("SOCKET MessagesGateway afterInit..");
    }

    // CONNECTION
    handleConnection(client: Socket, ...args: any[]) {
        //console.log('SOCKET Client connected: ' + client.id);
        this.logger.log(`LOG SOCKET Client connected: ${client.id}`)
    }

    // DISCONNECT
    handleDisconnect(client: Socket) {
        //console.log("SOCKET MessagesGateway Client disconnected: " + client.id);
        this.logger.log(`LOG SOCKET MessagesGateway Client disconnected: ${client.id}`)
    }

    // EMIT
    emit(event_name: string, message: any){
        this.server.emit(event_name, message);
    }

    // ECHO
    @SubscribeMessage('echo')
    onEchoEvent(
        @ConnectedSocket() client: Socket, 
        @MessageBody() payload: string): void {
        console.log("SOCKET receive client ECHO:", payload);
        let response = "{'echo response':'" + payload + "'}";
        this.server.emit('server_echo', response);
    }

/*
    // ON LOGIN USER EVENT
    @SubscribeMessage('login-user')
    onLoginUser(
        @ConnectedSocket() client: Socket, 
        @MessageBody() data: any
        ): void {
        console.log("SOCKET receive client new-player:", data);
        if( !data || !data.username || !data.characterName ){
            console.log("ERROR LOG USER");
            return;
        } 
        let player = {
            id: client.id,
            name: data.characterName,
            user: {
                username: data.username,
            }
        }
        //this.server.emit('update-players', player);
        this.server.emit('login-players', player);
    }
*/

}