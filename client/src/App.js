import { useState } from "react";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";

import "./App.css";

function App() {
  const api_key = "d6ee4qzea2cu";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame logOut={logOut} />
        </Chat>
      ) : isButtonPressed ? (
        <div className="waitroom">
          <h1>Waiting for connection with the server...</h1>
          <div className="custom-loader"></div>
        </div>
      ) : (
        <>
          <SignUp
            setIsAuth={setIsAuth}
            setIsButtonPressed={setIsButtonPressed}
          />
          <Login
            setIsAuth={setIsAuth}
            setIsButtonPressed={setIsButtonPressed}
          />
        </>
      )}
    </div>
  );
}

export default App;
