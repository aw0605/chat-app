"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      email,
      password
    );

    if (userCredential) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        createdAt: serverTimestamp(),
        photoURL: userCredential.user.photoURL,
        displayName: userCredential.user.displayName,
      });

      router.push("/");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          회원가입
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-[#999999]"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-[#999999]"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full px-6 py-2 duration-200 border rounded-3xl bg-[#00B98D] text-white hover:bg-white hover:text-[#00B98D]"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
