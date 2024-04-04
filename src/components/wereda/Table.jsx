import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Table = ({ kebele }) => {
  console.log(kebele);
  return (
    <div className="flex">
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
          {kebele.map((item, index) => (
            <tr
              key={item.id}
              className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex items-center justify-between">
                  <Link
                    to={`/admin/kebele/${item.id}`}
                    className="text-xs hover:text-customDark"
                  >
                    {item.kebele_name}
                  </Link>
                  <Link
                    to={`/admin/kebele/${item.id}`}
                    className="text-xs bg-mainColor rounded-lg text-white p-2 hover:text-lightgreen"
                  >
                    <Visibility style={{ fontSize: "small" }} /> View Detail
                  </Link>
                </div>
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
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
                        className="text-xs bg-mainColor rounded-lg text-white p-2 hover:text-lightgreen"
                      >
                        <Visibility style={{ fontSize: "small" }} /> View Detail
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
  );
};
