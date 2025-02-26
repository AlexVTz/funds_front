"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { fetchUser } from "@/services/userService";

const WelcomePage: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      setUser(null);
      router.push("/login");
    }
  };

  const getUserData = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData);
    } catch (error) {
      router.push("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [setUser, router]);

  console.log(user);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to United Funds</h1>
      <p>Your trusted partner in financial growth.</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
      <button
        onClick={getUserData}
        className="ml-10 mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Get user data
      </button>
    </div>
  );
};

export default WelcomePage;
