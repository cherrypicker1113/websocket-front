import {useEffect, KeyboardEvent, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/store";
import {chatActions, ChatState, connectChat} from "@src/chat/slice/chatSlice";
import {ChatUserMessage} from "@src/chat/model/ChatUserMessage";
import ChatMessageListView from "@src/chat/view/ChatMessageListView";
import styled from "styled-components";
import {ChatUtil} from "@src/chat/util/ChatUtil";
import {ChatSystemMessage} from "@src/chat/model/ChatSystemMessage";

export function ChatView() {
    const {messages, webSocket, clientId} = useSelector<RootState, ChatState>(state => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectChat({
            onmessage: (ev: MessageEvent) => {
                console.log(ev.data);
                const res = JSON.parse(ev.data);
                switch (res.action) {
                    case 'init':
                        const {clientId, messages} = res.data;
                        dispatch(chatActions.init({clientId, messages: jsonToMessages(messages)}));
                        break;
                    case 'message':
                        dispatch(chatActions.appendMessages(jsonToMessages([res.data])))
                        break;
                }
            },
            onerror: (ev: Event) => {
                console.log('서버와 웹 소켓 연결됨.');
            },
            onclose: (ev?: CloseEvent) => {
                console.log('소켓 닫힘.');
            }
        }));
        return () => { dispatch(chatActions.disconnectChat()); };
    }, []);

    const jsonToMessages = (messagesObj: any[]) => {
        return messagesObj.map(msgObj => 
            msgObj.type === 'user-message'
                ? ChatUserMessage.create(msgObj)
                : ChatSystemMessage.create(msgObj));
    };

    return (
        <Container>
            <Profile>{webSocket && clientId ? `${ChatUtil.getClientName(clientId)} 연결됨` : '연결안됨'}</Profile>
            <ChatMessageListView chatMessages={messages}/>
            <ChatInput webSocket={webSocket}/>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    max-width: 600px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
`;

const Profile = styled.div`
    height: 40px;
    flex: none;
    display: flex;
    align-items: center;
`;

function ChatInput(props: {webSocket: WebSocket | null}) {
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key?.toLowerCase() === 'enter')
            submit();
    };

    const submit = () => {
        const message = inputRef?.current?.value;
        if (props.webSocket && message) {
            props.webSocket.send(JSON.stringify({
                action: 'message',
                data: message
            }));
            inputRef.current.value = '';
        }
    };

    return (
        <ChatInputContainer>
            <ChatInputElement ref={inputRef} onKeyPress={onKeyPress}></ChatInputElement>
            <ChatInputButton onClick={submit}>전송</ChatInputButton>
        </ChatInputContainer>
    );
}

const ChatInputContainer = styled.div`
    width: 100%;
    height: 60px;
    padding: 20px;
    box-sizing: border-box;
    flex: none;
    display: flex;
    align-items: center;
`;

const ChatInputElement = styled.input`
    flex: 1;
`;

const ChatInputButton = styled.button`
    flex: none;
`;