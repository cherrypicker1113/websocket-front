import {ChatMessage} from "@src/chat/model/ChatMessage";
import {ChatMessageType} from "@src/chat/model/ChatMessageType";

export class ChatSystemMessage extends ChatMessage {

    constructor (
        public readonly type: ChatMessageType,
        public readonly id: number,
        public readonly clientId: number
    ) {
        super();
    }

    public getMessage(): string {
        return `${this.getClientName()} 님이 ${this.type === 'user-in' ? '입장' : '퇴장'}하셨습니다.`;
    }

    public static create(obj: any): ChatSystemMessage {
        return Object.assign(new ChatSystemMessage(obj.type, obj.id, obj.clientId), obj);
    }
}