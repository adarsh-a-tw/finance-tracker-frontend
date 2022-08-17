import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { deleteRecordBookAPI, fetchRecordBooksAPI } from '../api/recordBook';
import RecordBook from './RecordBook';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function RecordBooks() {

  const [recordBooks, setRecordBooks] = useState([]);

  const fetchRecordBooks = async () => {
    const recordBooks = await fetchRecordBooksAPI();
    setRecordBooks(recordBooks);
  }

  useEffect(() => {
    fetchRecordBooks();
  }, []);

  const handleDelete = async () => {
    await deleteRecordBookAPI(deleteId);
    await fetchRecordBooks();
    handleClose();
  }

  const [open, setOpen] = React.useState(false);
  const [deleteId,setDeleteId] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: "16px" }}>
        <Typography color="primary" variant='h4'>
          My Record Books
        </Typography>
        <Grid container direction="column">

          {recordBooks.map((recordBook, index) => {
            return (
              <Grid item key={index} sx={{ marginTop: "16px" }}>
                <RecordBook id={recordBook.id} name={recordBook.name} netBalance={recordBook.net_balance} deleteFn={handleClickOpen} />
              </Grid>
            )
          })}
        </Grid>
      </Container>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this RecordBook ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button data-testid="delete-btn" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default RecordBooks