import { TodoItems } from "../../../types/Types";

import { Box, Paper, Typography } from "@mui/material";

import TodoListItem from "./TodoListItem";

interface TodoListProps {
  data: TodoItems;
  editIndex: number;
  handleEditCancel(): void;
  handleEditChange(index: number): void;
  handleRefresh(): void;
}

const TodoList = ({
  data,
  editIndex,
  handleEditCancel,
  handleEditChange,
  handleRefresh,
}: TodoListProps) => {
  return (
    <Paper variant="outlined">
      <Box
        sx={{
          maxHeight: 250,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {data.items.length === 0 && (
          <Box
            sx={{
              padding: 3,
              textAlign: "center",
            }}
          >
            <Typography>Woohoo! Nothing to do!</Typography>
            <Typography sx={{ fontSize: 24 }}>🥳🎉</Typography>
          </Box>
        )}
        {data.items.map((item, index) => (
          <TodoListItem
            edit={editIndex === index}
            item={item}
            handleEditCancel={() => handleEditCancel()}
            handleEditChange={() => handleEditChange(index)}
            handleRefresh={handleRefresh}
            key={index}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TodoList;
