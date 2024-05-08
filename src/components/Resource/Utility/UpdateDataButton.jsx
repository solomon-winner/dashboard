import { Edit } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

export const UpdateDataButton = ({ id, name, url }) => {
    return (
        <Link
            to={`/admin/${url}/${id}`}
            className="p-1 rounded-md text-xs bg-updatecolor hover:bg-customDark text-white font-medium flex items-center"
        >
            <Edit fontSize="small" className="mr-1" />
            <span className="align-middle">Update {name} Data</span>
        </Link>
    );
};

