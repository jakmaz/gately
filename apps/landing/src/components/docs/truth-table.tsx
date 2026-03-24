/** biome-ignore-all lint/suspicious/noArrayIndexKey: non dynamic data */

export function TruthTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto my-8 border border-border/50 rounded-xl bg-card shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-4 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`row-${row.join("-")}-${i}`}
              className="transition-colors hover:bg-muted/10 last:border-0 border-b border-border/30"
            >
              {row.map((cell, j) => {
                const isOutput = j === row.length - 1;
                // Explicit strict checks
                const isOne = cell === 1 || cell === "1";
                const isZero = cell === 0 || cell === "0";
                const isBinary = isOne || isZero;

                return (
                  <td key={j} className={`px-6 py-3 ${isOutput ? "font-bold" : ""}`}>
                    {isBinary ? (
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-mono text-xs shadow-inner shadow-black/20 ${
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
