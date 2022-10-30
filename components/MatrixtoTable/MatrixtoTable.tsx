import React from "react";
import MatrixBuilder from "@components/MatrixBuilder/MatrixBuilder";
import { Table } from 'semantic-ui-react'

/** Matrix Props */
type MatrixProps = {
  matrix: number[][];
  metric: number;
  neighbours: number;
  prediction: number;
};

/** Show matrix as a table from Selectiom */
const MatrixtoTable = (props: MatrixProps) => {
  const { matrix, metric, neighbours, prediction } = props;
  let segment = document.getElementById("operations")
  if(segment) {
    segment.innerHTML = '';
  }
  const utilityMatrix = MatrixBuilder(matrix, metric, neighbours, prediction);
  return (
    <Table inverted compact celled>
      <Table.Body>
        {utilityMatrix.map((row, index) => (
          <Table.Row key={index}>
            {row.map((value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
              <Table.Cell key={index}>{value}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default MatrixtoTable;