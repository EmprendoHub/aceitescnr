import { options } from "@/app/api/auth/[...nextauth]/options";
import UpdateProfile from "@/components/admin/profile/UpdateProfile";
import { getServerSession } from "next-auth";
import React from "react";
import { getAuthor } from "../../_actions";

const UpdateProfilePage = async () => {
  const session = await getServerSession(options);
  const data = await getAuthor(session?.user?._id);
  const author = JSON.parse(data);

  return <UpdateProfile author={author} />;
};

export default UpdateProfilePage;
