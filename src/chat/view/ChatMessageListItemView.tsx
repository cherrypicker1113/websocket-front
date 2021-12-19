import {ChatMessage} from "@src/chat/model/ChatMessage";
import {ChatState} from "@src/chat/slice/chatSlice";
import {RootState} from "@src/store";
import {useSelector} from "react-redux";
import styled from "styled-components";

export default function ChatMessageListItemView(props: {chatMessage: ChatMessage}) {
    const {clientId: currentClientId} = useSelector<RootState, ChatState>(state => state.chat);
    const {clientId, createTime, type} = props.chatMessage;
    const time = createTime ? new Date(createTime).toTimeString().slice(0, 8) : '';
    const isUserMessage = type === 'user-message'
    const isMine = isUserMessage && clientId === currentClientId;
    const name = isUserMessage ? (isMine ? '나' : `유저-${clientId}`) : '시스템';
    return (
        <Container>
            <Name isMine={isMine}>{name}</Name>
            <Message isUserMessage={isUserMessage}>{props.chatMessage.getMessage()}</Message>
            <Time>{time}</Time>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 4px 20px;
`;

const Name = styled.div<{isMine: boolean}>`
    width: 80px;
    flex: none;
    color: ${props => props.isMine ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
    font-weight: ${props => props.isMine ? 'bold' : 'normal'};
`;

const Message = styled.div<{isUserMessage: boolean}>`
    flex: 1;
    font-size: ${props => props.isUserMessage ? '14px' : '13px'};
    color: ${props => props.isUserMessage ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.5)'};
`;

const Time = styled.div`
    color: rgba(0, 0, 0, 0.3);
    font-size: 13px;
    width: 54px;
    flex: none;
`;