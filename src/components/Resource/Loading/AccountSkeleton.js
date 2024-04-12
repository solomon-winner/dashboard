import React from 'react';

const AccountSkeleton = () => {
 return (
    <tr>
      <td className="py-4 px-6">
        <div className="animate-pulse">
          <div className="h-12 w-12 rounded-full bg-gray-400"></div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-400 rounded"></div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-400 rounded"></div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-400 rounded"></div>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="animate-pulse">
          <div className="h-4 w-16 bg-gray-400 rounded"></div>
        </div>
      </td>
    </tr>
 );
};

export default AccountSkeleton;