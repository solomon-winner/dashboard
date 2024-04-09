import React from "react";

export const Table = ({ data }) => {
  return (
    <div>
      <table className="border-collapse pt-2 w-full">
        <thead>
          <tr>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Livelihood asctivities
            </th>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Male Headed
            </th>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Female Headed
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="text-sm">{item.value}</span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="text-sm">{item.male_headed_hh}</span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="text-sm">{item.female_headed_hh}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
