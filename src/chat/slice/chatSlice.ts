import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatMessage} from '@src/chat/model/ChatMessage';
import WebSocketAgent, {WebSocketEventListener} from '@src/webSocket/agent/WebSocketAgent';

export type ChatState = {
    messages: ChatMessage[];
    webSocket: WebSocket | null;
    clientId: number | null;
};

export const connectChat = createAsyncThunk<WebSocket | null, WebSocketEventListener>(
    'chat/connect',
    async (listener) => {
        try {
            return await WebSocketAgent.createWebSocket('ws://localhost:9001/chat', listener);
        } catch (e) {
            listener.onclose();
            throw e;
        }
    },
);

const init = (state: ChatState, action: PayloadAction<{clientId: number, messages: ChatMessage[]}>) => {
    state.clientId = action.payload.clientId;
    state.messages = state.messages?.concat(action.payload.messages);
};
const appendMessages = (state: ChatState, action: PayloadAction<ChatMessage[]>) => {
    state.messages = state.messages?.concat(action.payload);
};
const disconnectChat = (state: ChatState) => {
    state.webSocket?.close();
    state.webSocket = null;
    state.clientId = null;
};

const reducers = {
    init,
    appendMessages,
    disconnectChat
};

const chatSlice = createSlice<ChatState, typeof reducers>({
    name: 'chat',
    initialState: {messages: [], webSocket: null, clientId: null},
    reducers,
    extraReducers: (builder) => {
        builder.addCase(connectChat.fulfilled, (state, action) => {
            state.webSocket = action.payload;
        }).addCase(connectChat.rejected, (state, action) => {
            state.webSocket = null;
            state.clientId = null;
        });
    },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
