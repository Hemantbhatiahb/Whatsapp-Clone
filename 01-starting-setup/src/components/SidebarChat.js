import { React } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { Link } from "react-router-dom";

const SidebarChat = (props) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const { id } = props;
  let showLastMessage;
  useEffect(() => {
    if (id) {
      onSnapshot(
        query(
          collection(doc(db, "rooms", id), "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        }
      );
    }
  }, [id]);

  useEffect(() => {
    setSeed(id);
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter room for chat");

    if (roomName) {
      addDoc(collection(db, "rooms"), {
        name: roomName,
      }).then((docRef) => console.log(docRef));
    }
  };

  if (messages[0]?.message) {
    showLastMessage = messages[0]?.message;
    if (showLastMessage.length > 39) {
      showLastMessage = showLastMessage.slice(0, 39) + "...";
    }
  }

  return props.addNewChat ? (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  ) : (
    <Link to={`/rooms/${props.id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{props.name}</h2>
          <p>{showLastMessage}</p>
        </div>
      </div>
    </Link>
  );
};
export default SidebarChat;
