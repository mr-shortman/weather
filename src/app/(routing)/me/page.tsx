import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Link from "next/link";
import React from "react";

export default async function MePage() {
  const session = await auth();
  if (!session) return <div>Not logged in</div>;
  return (
    <div>
      <h2 className="text-lg font-bold">Welcome {session.user.name}!</h2>
      {session.user ? (
        <Button asChild variant={"destructive"}>
          <Link href={"/api/auth/signout"}>Signout</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href={"/api/auth/signin"}> Sign In</Link>
        </Button>
      )}
    </div>
  );
}
