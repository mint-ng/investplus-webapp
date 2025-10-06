import React from "react";
import FreshChat from "react-freshchat";
import { useAppSelector } from "@/app/redux/features/use-store";
import { freshChatToken } from "./config";

const WebChatWidget = () => {
  const { userName } = useAppSelector((state) => state.user);

  const [firstName = "", lastName = ""] = userName ? userName.split(" ") : ["", ""];

  return (
    <FreshChat
      token={freshChatToken}
      firstName={firstName}
      lastName={lastName}
    />
  );
};

export default WebChatWidget;
