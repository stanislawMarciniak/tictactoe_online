import React from "react";
import { Window, MessageList, MessageInput } from "stream-chat-react";

import "./Chat.css";

function Chat() {
  return (
    <div className="chat">
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          messageActions={[]}
        />
        <MessageInput noFiles />
      </Window>
    </div>
  );
}

export default Chat;
