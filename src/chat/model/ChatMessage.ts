import {ChatMessageType} from "@src/chat/model/ChatMessageType";
import {ChatUtil} from "@src/chat/util/ChatUtil";

export abstract class ChatMessage {
    public abstract type: ChatMessageType;
    public abstract id: number;
    public abstract clientId: number;
    public createTime?: number;

    public abstract getMessage(): string;

    public getClientName(): string {
        return ChatUtil.getClientName(this.clientId);
    }
}