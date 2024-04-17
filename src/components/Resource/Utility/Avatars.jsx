import React from 'react';

const Avatars = ({ avatar,name, className }) => {
 return (
    <div className={`w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 text-3xl font-extrabold capitalize ${className}`}>
      {avatar ? (
        <img
          src={`https://tbrr.echnoserve.com/storage/app/public/${avatar}`}
          alt=""
          className="w-full h-full rounded-full"
        />
      ) : (
        name ? name.charAt(0) : 'N/A'
      )}
    </div>
 );
};

export default Avatars;