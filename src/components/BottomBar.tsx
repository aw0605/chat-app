"use client";

import { User } from "firebase/auth";
import { db } from "@/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

interface IBottomBarProps {
  user: User;
  chatId: string;
}

const BottomBar = ({ user, chatId }: IBottomBarProps) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim().length === 0) return;

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: input,
      sender: user.email,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="sticky flex w-full bg-white top-full">
      <form
        onSubmit={sendMessage}
        className="flex items-end w-full px-6 pb-4 space-x-2"
      >
        <input
          value={input}
          autoComplete="off"
          className="w-full px-4 py-4 placeholder-gray-400 border border-gray-200 
          rounded-lg focus:border-gray-400 focus:ring-0"
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요."
        />
        <button type="submit">
          <IoPaperPlaneOutline className="mb-4 text-gray-600 w-7 h-7 hover:text-gray-900" />
        </button>
      </form>
    </div>
  );
};

export default BottomBar;
