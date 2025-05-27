"use client";

import { useState, useEffect } from "react";
import { Edge, Node } from "reactflow";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GateNodeProps } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateNodeStates } from "@/lib/simulator";

interface TruthTableProps {
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
}

export function TruthTable({ nodes, edges }: TruthTableProps) {
  const [tableData, setTableData] = useState<Array<Record<string, boolean>>>([]);
  const [showTable, setShowTable] = useState(false);

  const inputNodes = nodes.filter((node) => node.type === "inputNode");
  const outputNodes = nodes.filter((node) => node.type === "outputNode");

  useEffect(() => {
    // Reset table when nodes or edges change
    setTableData([]);
    setShowTable(false);
  }, [nodes, edges]);

  const generateTruthTable = () => {
    if (inputNodes.length === 0 || outputNodes.length === 0) {
      return;
    }

    // Generate all possible input combinations
    const combinations = generateInputCombinations(inputNodes.length);
    const results: Array<Record<string, boolean>> = [];

    // For each combination, calculate the output
    combinations.forEach((combination) => {
      // Set input node states
      const testNodes = [...nodes];
      inputNodes.forEach((node, index) => {
        const nodeIndex = testNodes.findIndex((n) => n.id === node.id);
        if (nodeIndex !== -1) {
          testNodes[nodeIndex] = {
            ...testNodes[nodeIndex],
            data: { ...testNodes[nodeIndex].data, state: combination[index] },
          };
        }
      });

      // Calculate the resulting states
      const calculatedNodes = calculateNodeStates(testNodes, edges);

      // Create a row for the truth table
      const row: Record<string, boolean> = {};

      // Add inputs to the row
      inputNodes.forEach((node, index) => {
        row[`input_${node.id}`] = combination[index];
      });

      // Add outputs to the row
      outputNodes.forEach((node) => {
        const calculatedNode = calculatedNodes.find((n) => n.id === node.id);
        row[`output_${node.id}`] = calculatedNode ? calculatedNode.data.state : false;
      });

      results.push(row);
    });

    setTableData(results);
    setShowTable(true);
  };

  // Generate all possible combinations of input values
  const generateInputCombinations = (count: number): boolean[][] => {
    const totalCombinations = Math.pow(2, count);
    const combinations: boolean[][] = [];

    for (let i = 0; i < totalCombinations; i++) {
      const combination: boolean[] = [];
      for (let j = 0; j < count; j++) {
        // Check if the jth bit is set
        combination.push(Boolean((i >> j) & 1));
      }
      combinations.push(combination);
    }

    return combinations;
  };

  return (
    <div className="p-2">
      <Tabs defaultValue={showTable ? "table" : "generate"}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="table" disabled={!showTable}>Truth Table</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="py-2">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Generate a truth table for your circuit
            </p>
            <Button
              onClick={generateTruthTable}
              disabled={inputNodes.length === 0 || outputNodes.length === 0}
            >
              Generate Truth Table
            </Button>
            {(inputNodes.length === 0 || outputNodes.length === 0) && (
              <p className="text-xs text-destructive mt-2">
                You need at least one input and one output node
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="table" className="min-h-[200px] max-h-[300px] overflow-auto">
          {tableData.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  {inputNodes.map((node) => (
                    <TableHead key={`header_input_${node.id}`} className="text-center">
                      Input {node.id.split('-')[1]}
                    </TableHead>
                  ))}
                  {outputNodes.map((node) => (
                    <TableHead key={`header_output_${node.id}`} className="text-center">
                      Output {node.id.split('-')[1]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={`row_${rowIndex}`}>
                    {inputNodes.map((node) => (
                      <TableCell
                        key={`cell_input_${node.id}_${rowIndex}`}
                        className={`text-center ${row[`input_${node.id}`] ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}
                      >
                        {row[`input_${node.id}`] ? '1' : '0'}
                      </TableCell>
                    ))}
                    {outputNodes.map((node) => (
                      <TableCell
                        key={`cell_output_${node.id}_${rowIndex}`}
                        className={`text-center font-bold ${row[`output_${node.id}`] ? 'bg-green-200 dark:bg-green-900/50' : 'bg-red-200 dark:bg-red-900/50'}`}
                      >
                        {row[`output_${node.id}`] ? '1' : '0'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
