import { Add } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export const AddButton = ({ name }) => {
  return (
    <Link
      to="/admin/add-sites"
      className="bg-mainColor p-2 rounded-md text-sm text-white font-semibold hover:bg-customDark mr-4"
    >
      <Add style={{ fontSize: "large" }} className="mr-2" />
      <span>Add {name}</span>
    </Link>
  );
};
