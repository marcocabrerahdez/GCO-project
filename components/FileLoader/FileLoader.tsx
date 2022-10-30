import MatrixtoTable from '@components/MatrixtoTable/MatrixtoTable';
import { useState, useEffect } from 'react';
import { Button, Grid, Input, Header, Container, Segment } from 'semantic-ui-react'

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
    if (neighbours) {
      setNeighbours(neighbours);
    }
    if (prediction) {
      setPrediction(prediction);
    }
  }, [file, metric, neighbours, start, prediction]);

  return (
        <Grid stackable columns='equal' textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>Métrica</Header>
              <Input
                type="number"
                placeholder="Metric"
                value={metric}
                onChange={(e) => setMetric(Number(e.target.value))}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Vecinos</Header>
              <Input
                type="number"
                placeholder="Neighbours"
                value={neighbours}
                onChange={(e) => setNeighbours(Number(e.target.value))}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Predicción</Header>
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
          <Grid.Row stretched>
            <Grid.Column textAlign='center'>
              <Header as='h3' block>Matriz Inicial</Header>
                <Container style={{overflow: 'auto', maxHeight: 400}}>
                  {matrix && <pre><MatrixtoTable matrix={matrix} metric={0} neighbours={0} prediction={0} /></pre>}
                </Container>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as='h3' block>Matriz Resultado</Header>
              <Container style={{overflow: 'auto', maxHeight: 400}}>
                  {matrix && <pre><MatrixtoTable matrix={matrix} metric={metric} neighbours={neighbours} prediction={prediction} /></pre>}
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column textAlign='center'>
              <Header as='h3' block>Operaciones</Header>
              <Container style={{overflow: 'auto', maxWidth: 400}}>
                <Segment vertical><p id='operations' ></p></Segment>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
  );
}

export default FileLoader;