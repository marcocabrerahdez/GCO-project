import FileLoader from "./FileLoader";
import {Container} from "semantic-ui-react";

/** Creates a container that displays in center the FileLoader component */
const FileLoaderContainer = () => {
  return (
    <Container textAlign='center'>
      <FileLoader/>
    </Container>
  )
}

export default FileLoaderContainer;