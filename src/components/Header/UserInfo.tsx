import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserInfo: React.FC = () => {
  return (
    <ul>
      <li>
        <Link href="/auth">
          <User />
        </Link>
      </li>
    </ul>
  );
};

export default UserInfo;
