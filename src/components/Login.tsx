import { FormEvent, useState } from "react";
import { auth } from "@/firebase/firebase";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          로그인
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
              로그인
            </button>

            <button
              onClick={() => signInWithGoogle()}
              className="w-full px-6 py-2 mt-4 duration-200 border rounded-3xl hover:bg-[#00B98D] hover:text-white"
            >
              Google 계정으로 로그인
            </button>

            <button
              onClick={() => {
                router.push("/signup");
              }}
              className="w-full px-6 py-2 mt-4 duration-200 border rounded-3xl hover:bg-[#00B98D] hover:text-white"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
