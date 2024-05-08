import { Add } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export const AddDataButton = ({ id, name,url }) => {
  return (
    <Link
      to={`/admin/${url}`}
      className="bg-mainColor p-2 rounded-md text-xs text-white font-medium hover:bg-customDark"
    >
      <Add style={{ fontSize: "large" }} className="mr-2" />
      <span>Add {name} Data</span>
    </Link>
  );
};
