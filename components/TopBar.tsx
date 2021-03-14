import { Button, Grid } from "@chakra-ui/react";
import { getTodos } from "../store/todo-store";

function TopBar() {
  return (
    <Grid pt={ 2 } templateColumns="1fr 1fr" columnGap="3">
      <Button
        onClick={() => getTodos('/api/todos')}
      >Load Todos</Button>
    </Grid>
  );
}

export default TopBar;