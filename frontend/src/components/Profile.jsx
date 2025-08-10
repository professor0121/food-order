import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";

const Profile = ({ username = "John Doe" ,image}) => {
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Avatar className="cursor-pointer w-10 h-10">
      {image && <AvatarImage src={image} alt={username || "User"} />}
      <AvatarFallback
        className={`text-white font-bold flex items-center justify-center ${
          username ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        {username ? firstLetter : <FaUser className="text-lg" />}
      </AvatarFallback>
    </Avatar>
      </HoverCardTrigger>

      <HoverCardContent className="w-40 p-4 flex flex-col space-y-2">
        <Button variant="ghost" className="justify-start w-full">
          Profile
        </Button>
        <Button variant="ghost" className="justify-start w-full">
          Cart
        </Button>
        <Button
          variant="ghost"
          className="justify-start w-full text-red-500 hover:text-red-600"
        >
          Logout
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Profile;
