import React, { FC } from "react";

import LeftSidear from "@/components/navigation/LeftSidear";
import Navbar from "@/components/navigation/navbar";

interface IProp {
  children: React.ReactNode;
}
const RootLayout: FC<IProp> = ({ children }) => {
  return (
    <main className="relative background-light850_dark100">
      <Navbar />
      <div className="flex">
        <LeftSidear />
        <section className="flex flex-col flex-1 min-h-screen px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
