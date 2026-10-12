export function TruthTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="learn-truth-table-frame">
      <table className="learn-truth-table" aria-label={`Truth table: ${headers.join(", ")}`}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="truth-table-heading">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td
                  key={headers[index]}
                  className={`truth-table-cell${index === row.length - 1 ? " truth-table-output" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
