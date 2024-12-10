"use client";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

const SideBar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <h2>SideBar</h2>
      <div>
        {user && (
          <div>
            <p>{user.email}님</p>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-2 duration-200 border rounded-3xl bg-[#00B98D] text-white hover:bg-white hover:text-[#00B98D]"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default SideBar;
