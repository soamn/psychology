import { LucideGhost } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-amber-50 ">
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <LucideGhost width={200} height="auto" />
        <p> 404 | Not Found</p>
        <div className="flex gap-5">
          <a href="/" className="underline flex gap-5 justify-center">
            <img src="./doctor.jpg" className="w-5 " alt="" /> Return
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
