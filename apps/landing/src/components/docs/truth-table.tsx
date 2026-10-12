export function TruthTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto my-8 border border-border rounded-lg bg-card">
      <table className="w-full text-sm text-left" aria-label={`Truth table: ${headers.join(", ")}`}>
        <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.join("-")}
              className="transition-colors hover:bg-muted/10 last:border-0 border-b border-border/30"
            >
              {row.map((cell, j) => {
                const isOutput = j === row.length - 1;
                // Explicit strict checks
                const isOne = cell === 1 || cell === "1";
                const isZero = cell === 0 || cell === "0";
                const isBinary = isOne || isZero;

                return (
                  <td key={headers[j]} className={`px-6 py-3 ${isOutput ? "font-medium" : ""}`}>
                    {isBinary ? (
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-mono text-xs ${
                          isOne
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-muted/80 text-muted-foreground border border-border"
                        }`}
                      >
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
