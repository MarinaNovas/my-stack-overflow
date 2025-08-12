import Navbar from "@/components/navigation/navbar";
import React, { FC } from "react";

interface IProp {
  children: React.ReactNode;
}
const RootLayout: FC<IProp> = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
