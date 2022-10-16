import { useEffect, useState } from "react";

import { TodoItems } from "../../types/Types";

import { getData } from "../../logic/Data";

import { deleteCookie, getCookie } from "../../logic/Cookie";

import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import TodoList from "./components/TodoList";

const Todo = () => {
  const [data, setData] = useState<TodoItems>({
    items: [],
  });

  const [editIndex, setEditIndex] = useState(-1);

  const [error, setError] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddClick = () => {
    const result = { ...data };

    result.items.unshift({ title: "Something to do" });

    setData(result);

    setEditIndex(0);
  };

  const handleLogoutClick = () => {
    deleteCookie();
    window.location.reload();
  };

  const refreshData = () => {
    const authToken = getCookie();

    getData({
      url: process.env.REACT_APP_API_URL + "/todo",
      headers: {
        authorization: authToken!,
      },
    })
      .then((response) => {
        setData(response);
      })
      .catch((err: { message: any }) => {
        setError(err.message);
      });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <InventoryOutlinedIcon fontSize="large" sx={{ marginRight: 1 }} />
            <Typography component="h1" variant="h5">
              Your Todo List
            </Typography>
          </Box>
          <Box>
            <IconButton
              color="primary"
              onClick={handleLogoutClick}
              size="small"
            >
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>

        <Box p={1}>
          <Button
            fullWidth
            color="primary"
            onClick={handleAddClick}
            size="small"
            variant="contained"
          >
            Add
          </Button>
        </Box>

        <Box p={1}>
          <TodoList
            data={data}
            editIndex={editIndex}
            handleEditCancel={() => setEditIndex(-1)}
            handleEditChange={(index) => setEditIndex(index)}
            handleRefresh={refreshData}
          />
        </Box>
      </Paper>

      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoHideDuration={5000}
        onClose={() => setError("")}
        open={Boolean(error)}
      >
        <Alert
          elevation={6}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Todo;
