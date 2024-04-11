import { Edit } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export const UpdateButton = ({ id, name }) => {
  return (
    <Link
      to={`/admin/update-site/${id}`}
      className="p-1 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold flex items-center"
    >
      <Edit fontSize="small" className="mr-1" />
      <span className="align-middle">Update {name}</span>
    </Link>
  );
};
