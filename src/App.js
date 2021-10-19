import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import {ADD_POST} from './GraphQL/Mutations';
import {DELETE_POST} from './GraphQL/Mutations';
import {GET_ALL_POSTS} from './GraphQL/Queries';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@mui/material";
const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  const [createNewPost] = useMutation(ADD_POST, {
    onCompleted(data) {
      setTitle('');
      setContent('');
    },
    refetchQueries: [
      {
        query: GET_ALL_POSTS,
      }
    ]
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted(data) {
      alert("Successfully Deleted!")
    },
    refetchQueries: [
      {
        query: GET_ALL_POSTS,
      }
    ]
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewPost({ variables: { title: title, content: content } });
    console.log(title, content);
  }
  const deleteSinglePost = (id) => {
    deletePost({ variables: { id: id } });
    console.log(id);
  }

  return (
    <Container maxWidth="sm">
      <Typography color="error" align="center" variant="h4" gutterBottom>
        GraphQL with React Js
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={title}
          label='Enter Your Title'
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <br />
        <br />
        <TextField
          value={content}
          label='Enter Your Content'
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          disabled={!title || !content}
        >
          Submit
        </Button>
      </form>
      <br />
      <br />
      <Paper elevation={3} >
        <List>
          {
            data?.allPost?.map((item, i) => (
              <ListItem button key={i}>
                <ListItemIcon>
                  <Avatar style={{
                    backgroundColor: 'teal'
                  }}>
                    {i + 1}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={item?.title} secondary={item?.content} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteSinglePost(item?.id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Paper>
    </Container >
  );
};

export default App;
