import { Add } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export const AddDataButton = ({ id, name }) => {
  return (
    <Link
      to="/admin/new-site"
      className="bg-mainColor p-2 rounded-md text-sm text-white font-semibold hover:bg-customDark"
    >
      <Add style={{ fontSize: "large" }} className="mr-2" />
      <span>Add {name} Data</span>
    </Link>
  );
};
