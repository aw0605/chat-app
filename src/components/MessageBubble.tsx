import Image from "next/image";
import { User } from "firebase/auth";
import { IMessage } from "@/types";

interface IMessageBubbleProps {
  user: User;
  message: IMessage;
  photoURL: string | null;
}

const MessageBubble = ({ user, message, photoURL }: IMessageBubbleProps) => {
  const sender = message.sender === user?.email;

  return (
    <>
      <div className={!sender ? `flex justify-start` : `flex justify-end`}>
        {!sender && (
          <div className="mr-3">
            <Image
              src={
                photoURL
                  ? photoURL
                  : "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_640.png"
              }
              width={40}
              height={40}
              className="rounded-full object-cover"
              alt={message.sender}
            />
          </div>
        )}
        <div
          className={
            !sender
              ? `bg-[#D9D9D9] py-3 px-4 rounded-lg rounded-tl-none my-1 text-sm w-auto max-w-lg`
              : `bg-[#EDEDED] py-3 px-4 rounded-lg rounded-br-none my-1 text-sm w-auto max-w-lg`
          }
        >
          {message.text}
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
