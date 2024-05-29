"use client";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserInfo: React.FC = () => {
  const session = useSession();
  return (
    <ul>
      <li>
        <Link href={`${session.data ? "/profile" : "/api/auth/signin"}`}>
          {session.data ? (
            <img
              className="max-w-9 rounded-full"
              src={session.data.user?.image!}
              alt={session.data.user?.name!}
            />
          ) : (
            <User />
          )}
        </Link>
      </li>
    </ul>
  );
};

export default UserInfo;
