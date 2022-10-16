import { useState } from "react";

import { TodoItem } from "../../../types/Types";

import { getCookie } from "../../../logic/Cookie";

import { deleteData, postData, putData } from "../../../logic/Data";

import * as yup from "yup";

import { Form, Formik } from "formik";

import {
  Alert,
  Box,
  Divider,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

interface TodoListItemProps {
  edit: boolean;
  item: TodoItem;
  handleEditCancel(): void;
  handleEditChange(): void;
  handleRefresh(): void;
}

const TodoListItem = ({
  edit,
  item,
  handleEditCancel,
  handleEditChange,
  handleRefresh,
}: TodoListItemProps) => {
  const authToken = getCookie();

  const [error, setError] = useState("");

  const initialValues: {
    title: string;
  } = {
    title: item.title,
  };

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .max(50, "Your todo description cannot exceed 50 characters")
      .required("You must provide a todo description"),
  });

  const handleFormSubmit = (data: { title: string }) => {
    if (item.id) {
      putData({
        url: process.env.REACT_APP_API_URL + "/todo/" + item.id,
        data: { completed: item.completed, title: data.title },
        headers: {
          authorization: authToken!,
        },
      })
        .then(() => {
          handleEditCancel();
          handleRefresh();
        })
        .catch((err: { message: any }) => {
          setError(err.message);
        });
    } else {
      postData({
        url: process.env.REACT_APP_API_URL + "/todo",
        data: { title: data.title },
        headers: {
          authorization: authToken!,
        },
      })
        .then(() => {
          handleEditCancel();
          handleRefresh();
        })
        .catch((err: { message: any }) => {
          setError(err.message);
        });
    }
  };

  const handleCompleted = (completed: boolean) => {
    putData({
      url: process.env.REACT_APP_API_URL + "/todo/" + item.id,
      data: { completed: completed, title: item.title },
      headers: {
        authorization: authToken!,
      },
    })
      .then(() => {
        handleRefresh();
      })
      .catch((err: { message: any }) => {
        setError(err.message);
      });
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this item?")) {
      deleteData({
        url: process.env.REACT_APP_API_URL + "/todo/" + item.id,
        headers: {
          authorization: authToken!,
        },
      })
        .then(() => {
          handleRefresh();
        })
        .catch((err: { message: any }) => {
          setError(err.message);
        });
    }
  };

  return (
    <Box
      sx={{
        padding: 1,
        paddingBottom: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {!edit && (
          <>
            {item.completed ? (
              <IconButton
                color="success"
                onClick={() => handleCompleted(false)}
                size="medium"
              >
                <CheckBoxOutlinedIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                color="default"
                onClick={() => handleCompleted(true)}
                size="medium"
              >
                <CheckBoxOutlineBlankIcon fontSize="inherit" />
              </IconButton>
            )}
          </>
        )}

        {edit ? (
          <Box sx={{ width: "100%" }}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleFormSubmit(values)}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={validationSchema}
            >
              {({ errors, handleChange, handleSubmit, touched, values }) => (
                <Form autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    fullWidth
                    error={Boolean(errors.title && touched.title)}
                    helperText={errors.title}
                    name="title"
                    onChange={handleChange}
                    onFocus={(event) => {
                      event.target.select();
                    }}
                    size="small"
                    value={values.title}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: 1,
                    }}
                  >
                    <IconButton color="primary" size="small" type="submit">
                      <CheckCircleIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton onClick={handleEditCancel} size="small">
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        ) : (
          <Box>{item.title}</Box>
        )}
      </Box>

      {!edit && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginBottom: 1,
          }}
        >
          <IconButton onClick={handleEditChange} size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton onClick={handleDelete} size="small">
            <DeleteForeverIcon fontSize="inherit" />
          </IconButton>
        </Box>
      )}

      <Divider />

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
    </Box>
  );
};

export default TodoListItem;
