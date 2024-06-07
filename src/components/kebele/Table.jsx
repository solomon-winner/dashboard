import React from "react";
import EmptyComponent from "../Resource/Utility/EmptyComponent";

export const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-300 divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Livelihood Activities
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Male Headed
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Female Headed
            </th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-100 table-row flex-row flex-wrap flex-no-wrap mb-0"
              >
                <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
                  <span className="text-sm font-medium">{item.value}</span>
                </td>
                <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
                  <span className="text-sm font-medium">
                    {item.male_headed_hh}
                  </span>
                </td>
                <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
                  <span className="text-sm font-medium">
                    {item.female_headed_hh}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                <EmptyComponent />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
