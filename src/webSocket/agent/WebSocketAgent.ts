export type WebSocketEventListener = {
    onmessage: (ev: MessageEvent) => any;
    onerror: (ev: Event) => any;
    onclose: (ev?: CloseEvent) => any;
}

export default class WebSocketAgent {

    public static createWebSocket(url: string, {onmessage, onerror, onclose}: WebSocketEventListener): Promise<WebSocket> {
        return new Promise<WebSocket>((resolve, reject) => {
            let connected = false;
            const webSocket = new WebSocket(url);
            webSocket.onopen = () => {
                connected = true;
                resolve(webSocket);
            };
            webSocket.onmessage = onmessage;
            webSocket.onerror = (ev: Event) => {
                connected ? onerror(ev) : reject(ev);
            };
            webSocket.onclose = onclose;
        });
    }
}