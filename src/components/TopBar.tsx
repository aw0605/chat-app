"use client";

import { User } from "firebase/auth";
import Image from "next/image";

interface ITopbarProps {
  user: User;
}

const TopBar = ({ user }: ITopbarProps) => {
  return (
    <div className="h-[70px] flex items-center w-full px-6 py-4 space-x-4 border-b-[1px]">
      <Image
        src={
          user?.photoURL
            ? user.photoURL
            : "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_640.png"
        }
        width={40}
        height={40}
        className="rounded-full object-cover"
        alt={user?.displayName ?? user.email?.split("@")[0] ?? ""}
      />

      <span className="font-bold">
        {user?.displayName ? user.displayName : user.email?.split("@")[0]}
      </span>
    </div>
  );
};

export default TopBar;
