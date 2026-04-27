'use client';
import { createContext, useContext } from 'react';

const MyContext = createContext<{ user_state: boolean }>({ user_state: false });
export const MyContextProvider = MyContext.Provider;
export const useMyContext = () => useContext(MyContext);