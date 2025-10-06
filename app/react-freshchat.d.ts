declare module "react-freshchat" {
  import * as React from "react";

  interface FreshChatProps {
    token: string;
    host?: string;
    externalId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    phoneCountryCode?: string;
  }

  const FreshChat: React.FC<FreshChatProps>;
  export default FreshChat;
}
