import React from 'react'
import { Button, TextField } from "@mui/material";

const InputForm = ({ handleCreatePost, handleEditPost, title, setTitle, content, setContent, editBtnView }) => {
    return (
        <>
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
            {!editBtnView ?
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={!title || !content}
                    onClick={handleCreatePost}
                >
                    Add
                </Button>
                :
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={handleEditPost}
                >
                    Edit
                </Button>}
        </>
    )
}

export default InputForm
