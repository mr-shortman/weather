import Navbar from "@/components/navbar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return children;
  // <div className="">
  //   {/* <Navbar /> */}
  //   <main className="p-4 space-y-4 ">{children}</main>
  // </div>
}

export default Layout;
