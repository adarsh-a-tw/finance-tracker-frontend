import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'

function RecordBook({ id, name, netBalance }) {
    return (
        <Card data-testid="record-book-item">
            <CardContent>
                <Typography color='primary' fontWeight={700}>{name}</Typography>
                <Typography color='primary' display='inline'>Balance : </Typography>
                <Typography display='inline' color={netBalance >= 0 ? 'primary' : 'error'}>{netBalance.toFixed(2)}</Typography>
            </CardContent>
        </Card>
    )
}

export default RecordBook;