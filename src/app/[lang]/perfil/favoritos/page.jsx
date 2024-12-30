import { options } from "@/app/api/auth/[...nextauth]/options";
import FavoritesComp from "@/components/user/profile/FavoritesComp";
import { getServerSession } from "next-auth";
import React from "react";

const FavoritesPage = async () => {
  return (
    <div>
      <FavoritesComp />
    </div>
  );
};

export default FavoritesPage;
