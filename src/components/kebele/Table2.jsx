import { ViewList, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Table2 = ({ site }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSite = site.filter((item) =>
    item.site_name && item.site_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Woreda or Site..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 my-4 border border-gray-300 rounded-md"
      />
      <div
        className="overflow-y-auto h-screen overflow-x-hidden"
        style={{ height: `calc(100vh - 140px)` }}
      >
        <table className="border-collapse pt-2 w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase ">
                Sites
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSite.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/admin/site/${item.id}`}
                      className="text-xs hover:text-lightgreen flex-grow"
                    >
                      {item.site_name}
                    </Link>
                    <Link
                      to={`/admin/site/${item.id}`}
                      className="text-green-600 hover:text-green-900"
                        title="View Detail"
                    >
                     <Visibility style={{ fontSize: "large", color: "green" }} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
