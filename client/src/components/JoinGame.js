import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game/Game";
import "./JoinGame.css";
import CustomInput from "./Game/gameComponents/CustomInput";

const JoinGame = ({ logOut }) => {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  const logOutAndLeave = async () => {
    await channel.stopWatching();
    setChannel(null);
    logOut();
  };

  return (
    <div className="joinGameContainer">
      <button className="logoutButton" onClick={logOut}>
        Logout
      </button>
      {channel ? (
        <>
          <Channel channel={channel} Input={CustomInput}>
            <Game channel={channel} />
          </Channel>
        </>
      ) : (
        <div className="joinGame">
          <h1> Create Game </h1>
          <input
            placeholder="Username of rival.."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game </button>
        </div>
      )}
    </div>
  );
};

export default JoinGame;
