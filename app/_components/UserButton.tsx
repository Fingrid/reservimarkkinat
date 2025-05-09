"use client";

import { Avatar } from "./Avatar";
import { User } from "next-auth";
import { actionSignOut, actionSignIn } from "./userbuttonactions";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const buttonClassNames = "flex items-center border-[var(--color-separator)] dark:border-[var(--color-dark-separator)] pl-1 pr-1";

const SignIn = () => {
  return (
    <form
    action={() => actionSignIn() }
    >
      <button className={ buttonClassNames }>
        <div className="p-2">Log in</div>
        <Avatar initials="" />
      </button>
    </form>
  );
};

const SignOut = ({ user }: { user?: User }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
    : undefined;

  return (
    <form
      action={() => actionSignOut() }
    >
      <button className={ buttonClassNames }>
        <div className="pr-2">{user?.name}</div>
        <Avatar initials={initials} />
      </button>
    </form>
  );
};

export const UserButton = () => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session?.user ?? null);
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  if (!user) return <SignIn />;
  return <SignOut user={user} />;
}
