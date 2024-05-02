import { Link } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import { useState } from "react";
import { log } from "../Resource/Utility/Logger";

export const Table = ({ woreda }) => {
  log(woreda.map((item) => item.sites.map((site) => site.id)));
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWoreda = woreda.filter((item) =>
    item.woreda_name && item.woreda_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.sites && item.sites.some((site) =>
      site.site_name && site.site_name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Woreda
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sites
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-black">
          {filteredWoreda.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <Link
                  to={`/admin/wereda/${item.id}`}
                  className="text-sm font-medium text-green-600 hover:text-green-900"
                >
                  {item.woreda_name}
                </Link>
                <Link
                  to={`/admin/wereda/${item.id}`}
                  className=" text-xl  p-2 text-green-600 hover:text-green-900"
                  title="View Detail"
                >
                  <Visibility style={{ fontSize: "x-large", color: "green" }} />
                </Link>
              </td>
              <td className="px-6 py-4">
                <div className="grid grid-cols-4 gap-1">
                  {item.sites.map((site) => (
                    <div key={site.id} className="mb-2">
                      <Link
                        to={`/admin/site/${site.id}`}
                        className="text-sm font-medium text-green-600 hover:text-green-900"
                      >
                        {site.site_name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        Size: {site.size_ha} ha, Watershed: {site.watershed_name}
                      </p>
                      <Link
                        to={`/admin/site/${site.id}`}
                        className="text-green-600 hover:text-green-900"
                        title="View Detail"
                      >
                        <Visibility style={{ fontSize: "large", color: "green" }} />
                      </Link>
                    </div>
                  ))}
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
