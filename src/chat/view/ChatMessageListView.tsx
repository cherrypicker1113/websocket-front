import ChatMessageListItemView from "@src/chat/view/ChatMessageListItemView";
import styled from "styled-components";
import {useEffect, useRef} from 'react';
import {ChatMessage} from "@src/chat/model/ChatMessage";

export default function ChatMessageListView(props: {chatMessages: ChatMessage[]}) {

    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const containerElement = containerRef.current;
        if (containerElement)
            containerElement.scrollTop = containerElement.scrollHeight;
    }, [props.chatMessages]);

    return (
        <Container ref={containerRef}>
            {props.chatMessages.map((chatMessage) => (
                <ChatMessageListItemView key={chatMessage.id} chatMessage={chatMessage}/>
            ))}
        </Container>
    );
}

const Container = styled.div`
    overflow-y: auto;
    flex: 1;
`;