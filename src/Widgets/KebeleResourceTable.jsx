import React from 'react';

const KebeleResourceTable = ({ resources, resourceName }) => {
  if (!Array.isArray(resources)) return null;

  const hasAmount = resources.some(resource => resource.amount !== undefined);
  const hasCapacity = resources.some(resource => resource.capacity !== undefined);

  return (
    <div>
      <h4  className="px-4">{resourceName}</h4>
      <hr />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            {hasAmount && <th className="px-4 py-2 text-lg">Amount</th>}
            {hasCapacity && <th className="px-4 py-2 text-lg">Capacity</th>}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-bold">{resource.value}</td>
              {hasAmount && <td className="border px-4 py-2">{resource.amount || "No data"}</td>}
              {hasCapacity && <td className="border px-4 py-2">{resource.capacity || "No data"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default KebeleResourceTable;
