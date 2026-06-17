import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("call use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  return (
    <Container maxWidth="sm">
      <Card
        style={
          {
            maxHeight: "80vh",
            overflow: "scroll",
          }
        }
      >
        <CardContent sx={{ flexGrow: 1 , overflow:"auto "}}>
          <Typography variant="h2">مهامي</Typography>
          <Divider variant="middle" />
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "20px" }}
            aria-label="text alignment"
            value={displayedTodosType}
            onChange={changeDisplayedType}
            exclusive
            color="primary"
          >
            <ToggleButton value="non-completed" aria-label="right aligned">
              الغير منجز
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              المنجز
            </ToggleButton>
            <ToggleButton value="all" aria-label="left aligned">
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
          {todosJsx}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid
              xs={8}
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="أضف مهمة جديدة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={4}>
              <Button
                onClick={() => {
                  handelAddClick();
                }}
                style={{ height: "100%" }}
                variant="contained"
                fullWidth
                disabled={titleInput.length === 0}
              >
                إضافة المهمة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
