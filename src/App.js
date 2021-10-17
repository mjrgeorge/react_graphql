import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@mui/material";
const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);

  if (loading) return <h1>Loding...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <Container maxWidth="sm">
      <Typography color="secondary" align="center" variant="h4" gutterBottom>
        GraphQL Practice App with React Js
      </Typography>
      <form>
        <TextField
          fullWidth
          value={title}
          label='Title'
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextField
          fullWidth
          value={content}
          label='Content'
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
      <List>
        {
          data?.allPost?.map((item) => (
            <ListItem button key={item?.id}>
              <ListItemIcon>
                <Avatar style={{
                  backgroundColor: 'blue'
                }}>
                  1
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </Container>
  );
};

const GET_ALL_COMMENTS = gql`
  {
    allPost{
      id
      title
      content
    }
  }
`;
export default App;
