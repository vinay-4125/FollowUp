import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const SuperAdminUserProfilePicture = ({ data }) => {
  return (
    <Avatar>
      <AvatarImage src={data.profilePicture} />
      <AvatarFallback>{data.username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default SuperAdminUserProfilePicture;
