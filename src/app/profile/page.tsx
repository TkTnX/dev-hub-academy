"use client";
import { Skeleton } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const ProfilePage: React.FC = () => {
  const { data } = useSession();

  return (
    <div className="container">
      <h2 className="font-bold flex items-center gap-4 mb-10 text-2xl sm:text-3xl md:text-5xl">
        Профиль пользователя{" "}
        {data?.user?.name ? data?.user?.name : <Skeleton width={300} />}
      </h2>
      {!data?.user ? (
        <Skeleton width={160} height={160} />
      ) : (
        data?.user?.image && (
          <img
            className="max-w-40"
            src={data.user.image}
            alt={data.user.image}
          />
        )
      )}
      <button
        className="border px-4 py-1 rouned mt-4 hover:bg-white hover:text-black transition-all duration-150 rounded"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfilePage;
