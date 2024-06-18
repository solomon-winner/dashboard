export const RenderTableRows = ({ rows }) => {
    return (
      <>
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="border px-4 py-2 text-sm font-bold">{row.label}</td>
            <td className="border px-4 py-2 text-sm">{row.value}</td>
          </tr>
        ))}
      </>
    );
  };
  
  
  