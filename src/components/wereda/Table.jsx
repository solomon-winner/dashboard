import { Visibility } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Table = ({ kebele }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredKebele = kebele.filter(
    (item) =>
      (item.kebele_name &&
        item.kebele_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.sites &&
        item.sites.some(
          (site) =>
            site.site_name &&
            site.site_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <table className="border-collapse pt-2 w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase ">
                Kebele
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase ">
                Sites
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKebele.map((item, index) => (
              <tr key={item.id} className="bg-white border-b">
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/admin/kebele/${item.id}`}
                      className="text-xs hover:text-customDark"
                    >
                      {item.kebele_name}
                    </Link>
                    <Link
                      to={`/admin/kebele/${item.id}`}
                      className="text-xs  p-2 text-green-600 hover:text-green-900"
                      title="View Detail"
                    >
                      <Visibility
                        style={{ fontSize: "large", color: "green" }}
                      />
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.sites.map((site, siteIndex) => (
                    <div key={site.id} className="mb-1">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/admin/site/${site.id}`}
                          className="text-xs hover:text-customDark"
                        >
                          {site.site_name}
                        </Link>
                        <Link
                          to={`/admin/site/${site.id}`}
                          className="text-xs  p-2 text-green-600 hover:text-green-900"
                          title="View Detail"
                        >
                          <Visibility
                            style={{ fontSize: "large", color: "green" }}
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
