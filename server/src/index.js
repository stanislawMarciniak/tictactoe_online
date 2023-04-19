import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());
const api_key = "d6ee4qzea2cu";
const api_secret =
  "azpwp44trbdv2g6qryrq4gtxwwuszppezc273xzjpkqeh5v5xtahgkeqqvr5sjpp";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (res, req) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, firstName, lastName, username, hashedPassword, userId });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login");

app.listen(3001, () => {
  consol.log("Server is running on port 3001");
});
