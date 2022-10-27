import React from "react";
import MatrixBuilder from "@components/MatrixBuilder/MatrixBuilder";

/** Matrix Props */
type MatrixProps = {
  matrix: number[][];
  metric: number;
  user: number;
  neighbours: number;
};

/** Show matrix as a table from Selectiom */
const MatrixtoTable = (props: MatrixProps) => {
  const { matrix, metric, user, neighbours } = props;
  const matrixSize = matrix.length;
  const utilityMatrix = MatrixBuilder(matrix, metric, user, neighbours);

  return (
    <table>
      <tbody>
        {utilityMatrix.map((row, index) => (
          <tr key={index}>
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