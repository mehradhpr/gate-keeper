"use client";

import { useState } from "react";
import { useAuth } from "@/app/(contexts)/AuthContext";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import background from "../../public/home.webp"; // Adjust the path if necessary

const Home = () => {
  const { login } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="relative h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600 m-5 rounded-3xl overflow-hidden">
      <div className="relative z-10 text-center text-white mt-[-100px]">
        <h1 className="text-5xl font-extrabold tracking-widest text-black drop-shadow-lg mb-4">
          GateKeeper
        </h1>
        <h3 className="text-2xl mb-8">
          A Secure, Advanced, and Open Source Authentication System
        </h3>
      </div>
    </div>
  );
};

export default Home;
