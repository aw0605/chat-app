"use client";

import { useParams } from "next/navigation";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";

const ChatPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const q = query(
    collection(db, "chats", id as string, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(q);

  const [chat] = useDocumentData(doc(db, "chats", id as string));

  const getOtherUser = (users: User[], currentUser: User) => {
    return users?.filter((user) => user.email !== currentUser?.email)[0];
  };

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={id as string} />
      </div>
      <div className="flex flex-col w-full col-span-6">
        <TopBar user={getOtherUser(chat?.usersData, user as User)} />
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col w-full h-full">
            {loading && (
              <div className="flex flex-col w-full h-full justify-center items-center">
                <CgSpinner className="w-12 h-12 text-gray-400 animate-spin" />
              </div>
            )}

            {!loading && messages?.length === 0 && (
              <div className="flex flex-col flex-1 items-center justify-center">
                <IoChatbubbleOutline className="w-24 h-24 text-gray-300" />
                <p className="text-2xl font-medium tracking-tight text-gray-300">
                  대화를 시작하세요.
                </p>
              </div>
            )}
          </div>
        </div>
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default ChatPage;
