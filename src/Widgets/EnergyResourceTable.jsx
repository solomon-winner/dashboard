import React from 'react';

const EnergyResourcesTable = ({ energyResources }) => {
  if (!Array.isArray(energyResources)) return <div>No Data</div>;

  return (
    <div>
      <h4>Energy Resources</h4>
      <hr />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 font-bold text-lg">Type</th>
            <th className="px-4 py-2 font-bold text-lg">Access Level</th>
          </tr>
        </thead>
        <tbody>
          {energyResources.map((resource, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-bold">{resource.value}</td>
              <td className="border px-4 py-2">{resource.access_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default EnergyResourcesTable;
