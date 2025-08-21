import React, { FC } from "react";

import LeftSidear from "@/components/navigation/LeftSidear";
import Navbar from "@/components/navigation/navbar";

interface IProp {
  children: React.ReactNode;
}
const RootLayout: FC<IProp> = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <LeftSidear />
        <section>{children}</section>
      </div>
    </main>
  );
};

export default RootLayout;
