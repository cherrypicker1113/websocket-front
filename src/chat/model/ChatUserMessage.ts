import {ChatMessage} from "@src/chat/model/ChatMessage";
import {ChatMessageType} from "@src/chat/model/ChatMessageType";

export class ChatUserMessage extends ChatMessage {
    public type: ChatMessageType = 'user-message';
    public id: number = 0;
    public clientId: number = 0;
    private message: string = '';

    public getMessage(): string {
        return this.message;
    }

    public static create(obj: object): ChatUserMessage {
        return Object.assign(new ChatUserMessage(), obj);
    }
}