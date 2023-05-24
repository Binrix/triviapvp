import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { io } from "socket.io-client";


@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket;

    constructor(
        private readonly httpClient: HttpClient
    ) {
        this.socket = io("http://localhost:3000");
    }

    public getSocket() {
        return this.socket;
    }

    public connect() {
        this.socket.connect();
    }

    public giveAnswer(roomId: string, answer: string) {
        this.socket.emit('give-answer', { roomId, answer });
    }

    public startGame(roomId: string) {
        this.socket.emit('start-game', roomId);
    }

    public joinRoom(roomId: string, username: string) {
        this.socket.emit("join", { roomId, username });
    }

    public disconnect() {
        this.socket.disconnect();
    }
}