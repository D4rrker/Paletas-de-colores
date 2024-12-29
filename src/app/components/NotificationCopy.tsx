"use client";

import { useStateNotificationContext } from "@/app/context/StateNotificationCopyColor";

export default function NotificationCopy() {
  const { showColor, colorCopy } = useStateNotificationContext();

  return (
    <div
      className={`${showColor ? "visible" : "invisible"} ${
        showColor ? "translate-x-0 right-10" : "translate-x-full"
      } transition-transform fixed bottom-10 right-0 bg-white p-4 rounded-full shadow-md flex items-center gap-x-3`}
    >
      <div
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: colorCopy }}
      ></div>
      El color se copió
    </div>
  );
}
