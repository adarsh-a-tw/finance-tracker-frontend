import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { fetchRecordBooksAPI } from '../api/recordBook';
import RecordBook from './RecordBook';

function RecordBooks() {

  const [recordBooks, setRecordBooks] = useState([]);


  useEffect(() => {
    const callback = async () => {
      const recordBooks = await fetchRecordBooksAPI();
      setRecordBooks(recordBooks);
    }
    callback();
  }, []);

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
                <RecordBook id={recordBook.id} name={recordBook.name} netBalance={recordBook.net_balance} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>

  )
}

export default RecordBooks