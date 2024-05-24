"use client";

import { useState } from "react";
import { useAuth } from "@/app/(contexts)/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { login } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const title = "GateKeeper";

  return (
    <div className="relative h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600 m-5 rounded-3xl overflow-hidden">
      <div className="relative z-10 text-center text-white mt-[-100px]">
        <motion.h1
          className="text-5xl font-extrabold tracking-widest text-black drop-shadow-lg mb-4"
          style={{
            background: "linear-gradient(90deg, black 20%, #1565C0 50%, black 80%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradient-wave 3s ease infinite"
          }}
        >
          {title}
        </motion.h1>
        <h3 className="text-2xl mb-8 drop-shadow-lg">
          A Secure, Advanced, and Open Source Authentication System
        </h3>
      </div>
    </div>
  );
};

export default Home;
