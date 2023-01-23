// This file is used to create a socket connection 
// and export it to be used in other components
import { createContext } from "react";
import io from "socket.io-client";

export const socket = io.connect(process.env.REACT_APP_WS_HOST);
export const SocketContext = createContext();
