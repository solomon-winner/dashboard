import React from 'react';

const EnergyResourcesTable = ({ energyResources }) => {
  if (!Array.isArray(energyResources)) return <div>No Data</div>;

  return (
    <div>
      <h4  className="px-4 text-sm">Energy Resources</h4>
      <hr />
      <table className="table-auto ">
        <thead>
          <tr>
            <th className="px-2 py-2 text-sm">Type</th>
            <th className="px-2 py-2 text-sm">Access Level</th>
          </tr>
        </thead>
        <tbody>
          {energyResources.map((resource, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-sm font-bold">{resource.value}</td>
              <td className="border px-4 py-2 text-sm">{resource.access_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default EnergyResourcesTable;
