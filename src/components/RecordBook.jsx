import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

function RecordBook({ id, name, netBalance }) {
    const navigate = useNavigate();
    return (
        <Card data-testid="record-book-item">
            <CardContent>
                <Typography color='primary' fontWeight={700}>{name}</Typography>
                <div>
                    <Typography color='primary' display='inline'>Balance : </Typography>
                    <Typography display='inline' color={netBalance >= 0 ? 'primary' : 'error'}>{netBalance.toFixed(2)} ₹</Typography>
                </div>
                <Button variant='contained' sx={{ marginTop: '16px' }} onClick={() => navigate(`/record_books/${id}`)}>View</Button>
            </CardContent>
        </Card >
    )
}

export default RecordBook;