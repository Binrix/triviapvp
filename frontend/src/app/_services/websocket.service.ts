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

    /**
     * Returns the socket
     * @returns The socket
     */
    public getSocket() {
        return this.socket;
    }

    /**
     * Connects to the socket
     */
    public connect() {
        this.socket.connect();
    }

    /**
     * Sends the answer from the user to the backend
     * @param roomId The id of the room
     * @param answer The answer of the user
     */
    public giveAnswer(roomId: string, answer: string) {
        this.socket.emit('give-answer', { roomId, answer });
    }

    /**
     * Starts the game
     * @param roomId The id of the room
     */
    public startGame(roomId: string) {
        this.socket.emit('start-game', roomId);
    }

    /**
     * Joins the room with the given room id
     * @param roomId The id of the room
     * @param username The username of the user
     */
    public joinRoom(roomId: string, username: string) {
        this.socket.emit("join", { roomId, username });
    }

    /**
     * Disconnects from the user
     */
    public disconnect() {
        this.socket.disconnect();
    }
}