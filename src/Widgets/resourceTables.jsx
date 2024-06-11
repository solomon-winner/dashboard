export const ResourceTable = ({ resources, resourceName }) => {
    return (
      <>
        <h4 className="px-9 ">{resourceName}</h4>
        <hr />
        <table className="table-auto ">
          <tbody>
            {resources.map((resource, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 font-bold">{resource.value}</td>
                <td className="border px-4 py-2">{resource.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
      </>
    );
  };