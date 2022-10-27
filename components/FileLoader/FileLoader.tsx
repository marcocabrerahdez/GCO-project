import MatrixtoTable from '@components/MatrixtoTable/MatrixtoTable';
import {useState, useEffect} from 'react';

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

  useEffect(() => {
    if (file) {
      loadFile(file).then((matrix) => {
        setMatrix(matrix);
      });
    }
  }, [file]);

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.item(0);
          if (file) {
            setFile(file);
          }
        }}
      />

      {matrix && <pre><MatrixtoTable matrix={matrix} metric={2} user={0} neighbours={4} /></pre>}
    </div>
  );
}

export default FileLoader;