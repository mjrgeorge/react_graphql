import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from './GraphQL/Mutations';
import { DELETE_POST } from './GraphQL/Mutations';
import { UPDATED_POST } from './GraphQL/Mutations';
import { GET_ALL_POSTS } from './GraphQL/Queries';
import { Container, Typography } from "@mui/material";
import GetPost from "./Components/GetPost";
import InputForm from "./Components/InputForm";

const App = () => {
  const [editBtnView, setEditBtnView] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editedId, setEditedId] = useState("");

  const [createNewPost] = useMutation(ADD_POST, {
    onCompleted(data) {
      setTitle('');
      setContent('');
      alert("Successfully Added!");
    },
    refetchQueries: [
      {
        query: GET_ALL_POSTS,
      }
    ]
  });

  const [updatePost] = useMutation(UPDATED_POST, {
    onCompleted(data) {
      setTitle('');
      setContent('');
      setEditBtnView(false);
      alert("Successfully Updated!");
    },
    refetchQueries: [
      {
        query: GET_ALL_POSTS,
      }
    ]
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted(data) {
      alert("Successfully Deleted!");
    },
    refetchQueries: [
      {
        query: GET_ALL_POSTS,
      }
    ]
  });

  const handleCreatePost = () => {
    createNewPost({ variables: { title: title, content: content } });
  };

  const handleEditButton = (editId, editTitle, editContent) => {
    setEditBtnView(true);
    setEditedId(editId);
    setTitle(editTitle);
    setContent(editContent);
  };

  const handleEditPost = () => {
    updatePost({ variables: { id: editedId, title: title, content: content } });
  };

  const handleDeleteButton = (id) => {
    deletePost({ variables: { id: id } });
  };

  return (
    <Container maxWidth="sm">
      <Typography color="primary" align="center" variant="h4" gutterBottom>
        GraphQL with React Js
      </Typography>
      <InputForm
        handleCreatePost={handleCreatePost}
        handleEditPost={handleEditPost}
        editBtnView={editBtnView}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        editedId={editedId}
      />
      <br />
      <br />
      <GetPost
        handleEditButton={handleEditButton}
        handleDeleteButton={handleDeleteButton}
      />
    </Container >
  );
};

export default App;
