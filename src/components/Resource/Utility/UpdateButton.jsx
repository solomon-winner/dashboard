import { Edit } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export const UpdateButton = ({ id, name, url }) => {
  return (
    <Link
      to={`/admin/${url}/update`}
      state={{ id: id }}
      className="h-fit p-2 rounded-md text-xs bg-sideboard hover:bg-customDark text-white font-medium flex items-center"
    >
      <Edit fontSize="small" className="mr-1" />
      <span className="align-middle">Update {name}</span>
    </Link>
  );
};
