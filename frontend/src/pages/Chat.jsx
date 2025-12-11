import React from 'react';
import ChatApp from '../components/ChatApp';
import styled from 'styled-components';

function Chat() {
  return (
    <>
      <ScrollableContainer>
        <ChatApp />
      </ScrollableContainer>
    </>
  );
}

export default Chat;

const ScrollableContainer = styled.div`
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
