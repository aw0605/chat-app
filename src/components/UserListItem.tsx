"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { IChat } from "@/types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface IUserListItemProps {
  sender: User;
  receiver: User;
  selectedChatId: string;
  chats: IChat[];
}

const UserListItem = ({
  sender,
  receiver,
  selectedChatId,
  chats,
}: IUserListItemProps) => {
  const chatExists = (receiverEmail: string) => {
    const senderEmail = sender.email!;
    return chats?.find(
      (chat: IChat) =>
        chat?.users?.includes(senderEmail) && chat.users.includes(receiverEmail)
    );
  };

  const chat = chatExists(receiver.email!);

  const router = useRouter();

  const redirect = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const handleClick = async () => {
    const senderData = {
      displayName: sender.displayName || sender.email?.split("@")[0],
      photoURL: sender.photoURL,
      email: sender.email,
    };

    const receiverData = {
      displayName: receiver.displayName || receiver.email?.split("@")[0],
      photoURL: receiver.photoURL,
      email: receiver.email,
    };

    if (!chat) {
      const { id } = await addDoc(collection(db, "chats"), {
        usersData: [senderData, receiverData],
        users: [sender.email, receiver.email],
        timestamp: serverTimestamp(),
      });
      redirect(id);
    } else {
      redirect(chat.id);
    }
  };

  return (
    <div className="w-full p-4">
      <div
        className={
          `w-5/6 mx-auto px-4 flex flex-row items-center py-2 pointer cursor-pointer ` +
          (chat && chat.id === selectedChatId ? "border-2 rounded-md" : " ")
        }
        onClick={handleClick}
      >
        <div>
          <Image
            src={
              receiver.photoURL
                ? receiver.photoURL
                : "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_640.png"
            }
            width={40}
            height={40}
            className="rounded-full object-cover"
            alt={receiver.displayName ?? receiver.email?.split("@")[0] ?? ""}
          />
        </div>

        <div className="ml-4">
          <p>{receiver.displayName || receiver.email?.split("@")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
