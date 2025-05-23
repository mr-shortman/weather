import Navbar from "@/app/_components/navbar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <main className="p-4 space-y-4 ">{children}</main>
    </div>
  );
}

export default Layout;
