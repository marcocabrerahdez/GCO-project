import React from "react";
import MatrixBuilder from "@components/MatrixBuilder/MatrixBuilder";

/** Matrix Props */
type MatrixProps = {
  matrix: number[][];
  metric: number;
};

/** Show matrix as a table from Selectiom */
const MatrixtoTable = (props: MatrixProps) => {
  const { matrix, metric } = props;
  const matrixSize = matrix.length;
  const utilityMatrix = MatrixBuilder(matrix, metric);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {matrix.map((_, index) => (
            <th key={index}>{index}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {utilityMatrix.map((row, index) => (
          <tr key={index}>
            <th>{index}</th>
            {row.map((value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MatrixtoTable;