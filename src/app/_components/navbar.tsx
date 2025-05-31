import { auth } from "@/server/auth";
import Link from "next/link";
import React from "react";
import Avatar from "../../components/avatar";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { Button } from "../../components/ui/button";
import SelectWeatherProvider from "./select-weather-provider";
import { SettingsIcon } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="p-4 w-full flex items-center ">
      <Link href={"/"}>
        <h1 className="text-xl font-bold">Weather</h1>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <SelectWeatherProvider />
        <Button asChild size={"icon"} variant={"outline"}>
          <Link href={"/settings"}>
            <SettingsIcon className="size-4" />
          </Link>
        </Button>
        {session?.user && (
          <Link href={"/me"}>
            <Avatar src={session.user.image} fb={session.user.name} />
          </Link>
        )}
      </div>
    </nav>
  );
}
