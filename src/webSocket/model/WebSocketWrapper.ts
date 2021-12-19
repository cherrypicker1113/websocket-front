export default class WebSocketWrapper {

    constructor(
        public readonly id: number,
        public readonly webSocket: WebSocket
    ) {}
}