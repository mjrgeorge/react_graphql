import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../GraphQL/Queries";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@mui/material";

const GetPost = ({ handleEditButton, handleDeleteButton }) => {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);

    const [allPost, setAllPost] = useState([]);

    useEffect(() => {
        if (data) {
            setAllPost(data.allPost);
        }
    }, [data]);

    if (loading) return <Typography color="error" align="center" variant="h6" gutterBottom>Loading...</Typography>;
    if (error) return <Typography color="error" align="center" variant="h6" gutterBottom>Error...</Typography>;

    return (
        <Paper elevation={3} >
            {
                allPost.length === 0 && (<Typography color="error" align="center" variant="h5" gutterBottom>Post List Empty!</Typography>)
            }
            <List>
                {
                    allPost.map((item, i) => (
                        <ListItem button key={i}>
                            <ListItemIcon>
                                <Avatar>
                                    {i + 1}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={item?.title} secondary={item?.content} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => handleEditButton(item?.id, item?.title, item?.content)}>
                                    <EditIcon color="warning" />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteButton(item?.id)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}

export default GetPost
