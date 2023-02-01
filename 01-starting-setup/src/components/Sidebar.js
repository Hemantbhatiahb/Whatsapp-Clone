import React, { useRef } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useState, useEffect, useContext } from "react";
import db from "../firebase/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { StateContext } from "../store/StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  console.log(rooms);
  const filterRooms = useRef();
  const loginCtx = useContext(StateContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapShot) => {
      setRooms(snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const filterRoomHandler = () => {
    console.log("called", filterRooms.current.value);
    getDocs(collection(db, "rooms"), (docs) => console.log(docs));
    console.log("ended");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={loginCtx.user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search or start new chat"
            type="text"
            ref={filterRooms}
            onChange={filterRoomHandler}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
