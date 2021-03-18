import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';

/*Iphone look alike container*/
const BoxContainer = styled.div`
width: 280px;
min-height: 550px;
display: flex;
align: center;
justifyContent: center;
flex-direction: column;
border-radius: 19px;
background-color: #fff;
box-shadow: 0 0 2px rgba(15,15,15,0.25);
position: relative;
overflow: hidden;`

export default function NutritionT() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        };
    
        const handleClose = () => {
        setOpen(false);
        };

        
    
    return (
    <BoxContainer>
        <div align="center" alignItems="center" justifyContent="center" display="flex">
            <h2>Nutrition Tracker</h2>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Enter food details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please enter the name of the food
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name of food"
                type="text"
                fullWidth
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Number of calories"
                type="text"
                fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    </BoxContainer>
    );
}