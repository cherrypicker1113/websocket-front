export class ChatUtil {
    public static getClientName(clientId: number): string {
        return `유저-${clientId}`;
    }
}