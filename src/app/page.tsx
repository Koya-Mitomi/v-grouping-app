'use client';
import { getLoggedInUser } from "@/actions/loginActions/getLoggedInUser";
import { useEffect, useState } from "react";
import { useMyContext } from "./context";
import { HomeWithNotLoggedIn } from "@/components/home/homeWithNotLoggedIn";
import { HomeWithLoggedIn } from "@/components/home/homeWithLoggedIn";

 

export default function Home() {
  const data = useMyContext();
  const user_state = data.user_state;
  const [isLoggedIn, setIsLoggedIn] = useState(user_state);

    useEffect(() => {
      setIsLoggedIn(user_state);
    }, [user_state]);
  
    useEffect(() => {
       const setLoginStatus = async () => {
        const user = await getLoggedInUser();
        setIsLoggedIn(!!user);
      }
  
      setLoginStatus();
    }, []);

  return (
    <div className="min-h-screen bg-white">
      {isLoggedIn ? (
        <HomeWithLoggedIn />
      ) : (
        <HomeWithNotLoggedIn />
      )}
    </div>
  );
}