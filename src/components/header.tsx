'use client';
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/actions/getLoggedInUser";
import { logout } from "@/actions/logout";

export const Header = ({user_state}: { user_state: boolean }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(user_state);

  const onClickLogoutButton = async () => {
    if (await logout()) {
      alert('ログアウトしました');
      setIsLoggedIn(false);
    } else {
      alert('ログアウトに失敗しました');
    }
  }

  useEffect(() => {
     const setLoginStatus = async () => {
      const user = await getLoggedInUser();
      setIsLoggedIn(!!user);
    }

    setLoginStatus();
  }, []);

  if (isLoggedIn) {
    return (
      <div className='flex justify-between items-center sticky top-0 z-10 bg-white px-8 py-4 shadow-sm border-b border-gray-100'>
        <h1 className="text-xl font-black tracking-tighter text-blue-600 cursor-default select-none hover:opacity-80 transition-opacity">
          V-GROUPING<span className="text-gray-400 font-light ml-1 text-sm">App</span>
        </h1>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onClickLogoutButton} 
            className="px-5 py-1.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 cursor-pointer"
          >
            ログアウト
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex justify-between items-center sticky top-0 z-10 bg-white px-8 py-4 shadow-sm border-b border-gray-100'>
        <h1 className="text-xl font-black tracking-tighter text-blue-600 cursor-default select-none hover:opacity-80 transition-opacity">
          V-GROUPING<span className="text-gray-400 font-light ml-1 text-sm">App</span>
        </h1>

        <div className='flex items-center space-x-4'>
          < a href="/login" className="px-5 py-1.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 hover:text-blue-500 hover:border-blue-100 transition-all active:scale-95 cursor-pointer">
            ログイン
          </a>
          < a href="/signup" className="px-5 py-1.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 hover:text-blue-500 hover:border-blue-100 transition-all active:scale-95 cursor-pointer">
            サインアップ
          </a>
        </div>
      </div>
    )
  }
}

export default Header;