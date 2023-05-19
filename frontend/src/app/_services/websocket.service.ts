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

    public connect() {
        this.socket.connect();
    }

    public joinRoom(roomId: string) {
        this.socket.emit("join", roomId);
    }

    public disconnect() {
        this.socket.disconnect();
    }
}