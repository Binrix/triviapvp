import { Injectable } from "@angular/core";
import { io } from "socket.io-client";


@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket;

    constructor() {
        this.socket = io("http://localhost:3000");
    }

    public getSocket() {
        return this.socket;
    }

    public connect() {
        this.socket.connect();
    }

    public startGame(roomId: string) {
        this.socket.emit('start-game', roomId);
    }

    public joinRoom(roomId: string) {
        this.socket.emit("join", roomId);
    }

    public disconnect() {
        this.socket.disconnect();
    }
}