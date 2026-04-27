'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const NotificationHandler = (props: {url: string}) => {
  const { url } = props;
  const router = useRouter();
  const message: string | null = useSearchParams().get('message');
  const once = useRef<boolean>(true);
  useEffect(() => {
    if (!once.current) return;
    if (message) {
      alert(message);
    }
    router.replace(url);
    once.current = false;
  }, []);

  return null;
}
