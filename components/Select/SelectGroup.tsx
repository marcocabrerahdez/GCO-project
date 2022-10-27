import SelectMetric from "./SelectMetric";
import SelectType from "./SelectUser";
import SelectNeighbours from "./SelectNeighbours";
import { Container, Grid } from "semantic-ui-react";

/** Create a container that contains the SelectioMetric, SelectType, SelectNeighbors components align it to center in a single row */
const SelectGroup = () => {
  return (
    <Container textAlign='center'>
      <Grid columns='equal' padded>
        <Grid.Column>
            <SelectMetric/>
        </Grid.Column>
        <Grid.Column>
            <SelectType/>
        </Grid.Column>
        <Grid.Column>
          <SelectNeighbours/>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default SelectGroup;
