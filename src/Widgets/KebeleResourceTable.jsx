import React from 'react';

const KebeleResourceTable = ({ resources, resourceName }) => {
  if (!Array.isArray(resources)) return null;

  const hasAmount = resources.some(resource => resource.amount !== undefined);
  const hasCapacity = resources.some(resource => resource.capacity !== undefined);

  return (
    <div>
      <h4  className="px-4  text-xl font-bold">{resourceName}</h4>
      <hr />
      <table className="table-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            {hasAmount && <th className="px-2 py-2 text-sm font-bold">Amount</th>}
            {hasCapacity && <th className="px-2 py-2 text-sm font-bold">Capacity</th>}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-bold text-sm">{resource.value}</td>
              {hasAmount && <td className="border px-4 py-2 text-sm">{resource.amount || "No data"}</td>}
              {hasCapacity && <td className="border px-4 py-2 text-sm">{resource.capacity || "No data"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default KebeleResourceTable;
