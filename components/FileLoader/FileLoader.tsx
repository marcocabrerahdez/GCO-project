import MatrixtoTable from '@components/MatrixtoTable/MatrixtoTable';
import { useState, useEffect } from 'react';
import { Button, Container, Grid, Input } from 'semantic-ui-react'

/** Loads and reads a txt file and convert the text to a matrix */
export const loadFile = (file: File): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const matrix = textToMatrix(text);
      resolve(matrix);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/** Converts a text to a matrix */
export const textToMatrix = (text: string): number[][] => {
  const lines = text.split("\n");
  const matrix = lines.map((line) => {
    const values = line.split(" ");
    return values.map((value) => Number(value));
  });
  return matrix;
};

/** Create a component that import a file and set a matrixtoTable component in <pre> */
const FileLoader = () => {
  const [file, setFile] = useState<File>();
  const [matrix, setMatrix] = useState<number[][]>();
  const [metric, setMetric] = useState<number>(0);
  const [user, setUser] = useState<number>(0);
  const [neighbours, setNeighbours] = useState<number>(0);
  const [prediction, setPrediction] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    if (start) {
      setStart(start);
    }
    if (file && start) {
      loadFile(file).then((matrix) => {
        setMatrix(matrix);
      });
    }
    if (metric) {
      setMetric(metric);
    }
    if (user) {
      setUser(user);
    }
    if (neighbours) {
      setNeighbours(neighbours);
    }
    if (prediction) {
      setPrediction(prediction);
    }
  }, [file, metric, user, neighbours, start, prediction]);

  return (
        <Grid stackable columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Input
                type="number"
                placeholder="Metric"
                value={metric}
                onChange={(e) => setMetric(Number(e.target.value))}
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                type="number"
                placeholder="User"
                value={user}
                onChange={(e) => setUser(Number(e.target.value))}
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                type="number"
                placeholder="Neighbours"
                value={neighbours}
                onChange={(e) => setNeighbours(Number(e.target.value))}
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                type="number"
                placeholder="Prediction"
                value={prediction}
                onChange={(e) => setPrediction(Number(e.target.value))}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Input icon='file'
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.item(0);
                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button content='Ejecución' onClick={() => setStart(Boolean(true))} />
            </Grid.Column>
          </Grid.Row>
          {matrix && <pre><MatrixtoTable matrix={matrix} metric={metric} user={user} neighbours={neighbours} prediction={prediction} /></pre>}
        </Grid>
  );
}

export default FileLoader;