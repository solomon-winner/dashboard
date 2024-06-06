import React from "react";

export const Table = ({ data }) => {
  return (
    <div className="overflow-y-auto h-screen overflow-x-hidden" >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Livelihood asctivities
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Male Headed
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Female Headed
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white lg:hover:bg-gray-100 table-row flex-row flex-wrap flex-no-wrap mb-0"
              >
                <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
                  <span className="text-sm">{item.value}</span>
                </td>
                <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
                  <span className="text-sm">{item.male_headed_hh}</span>
                </td>
                <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
                  <span className="text-sm">{item.female_headed_hh}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
