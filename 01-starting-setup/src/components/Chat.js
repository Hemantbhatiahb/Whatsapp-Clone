import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVert from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import db from "../firebase/firebase";
import { useContext } from "react";
import { StateContext } from "../store/StateProvider";
import { Timestamp} from '@firebase/firestore';
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp ,
} from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const loginCtx = useContext(StateContext);

  useEffect(() => {
    onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
      setRoomName(snapshot.data().name);
      setSeed(roomId);
    });
  }, [roomId]);

  onSnapshot(
    query(
      collection(doc(db, "rooms", roomId), "messages"),
      orderBy("timestamp", "asc")
    ),
    (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    }
  );
  const sendMessage = (event) => {
    event.preventDefault();

    if (input.length === 0) {
      return;
    }

    addDoc(collection(doc(db, "rooms", roomId), "messages"), {
      message: input,
      name: loginCtx.user.displayName,
      timestamp: Timestamp.fromDate(new Date())
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen {" "} 
          {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${message.name === loginCtx.user.displayName && "chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
