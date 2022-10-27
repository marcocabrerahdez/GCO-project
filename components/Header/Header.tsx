import { Header } from 'semantic-ui-react';

/** Creates a header component */
export const MyHeader = () => {
  return (
    <Header as='h2' icon textAlign='center'>
      <Header.Content>Métodos de Filtrado Colaborativo.</Header.Content>
    </Header>
  )
}

export default MyHeader;