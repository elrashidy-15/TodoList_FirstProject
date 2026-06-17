import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
import { Button } from "@mui/material";
// dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo }) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  function handleDeleteClick() {
    setDeleteClick(true);
  }
  function handleUpdateClick() {
    setUpdateClick(true);
  }
  function handleCloseClick() {
    setDeleteClick(false);
  }
  function handleUpdateClose() {
    setUpdateClick(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      if (t.id === todo.id) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setUpdateClick(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleCloseClick}
        open={deleteClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك فى حذف هذه المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع بعد حذف هذه المهمة !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClick}>إغلاق , وعدم الحذف</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم , حذف المهمة{" "}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={updateClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"أدخل تفاصيل تعديل المهمة "}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة "
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="تفاصيل المهمة "
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}> إغلاق </Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            نعم , تعديل المهمة
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className="todo-card"
        sx={{
          backgroundColor: "#000e87",
          color: "white",
          marginTop: "5px",
        }}
      >
        <CardContent sx={{ flexGrow: 1 , overflow:"auto "}}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                className="icon-btn"
                aria-label="complete"
                style={{
                  color: todo.isCompleted ? "white" : "green",
                  backgroundColor: todo.isCompleted ? "green" : "white",
                  border: "green solid 2px",
                }}
              >
                <CheckIcon
                  onClick={() => {
                    handleCheckClick();
                  }}
                />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                className="icon-btn"
                aria-label="edit"
                style={{
                  color: "#0414c1",
                  backgroundColor: "white",
                  border: "#0414c1 solid 2px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="icon-btn"
                aria-label="delete"
                style={{
                  color: "red",
                  backgroundColor: "white",
                  border: "red solid 2px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
