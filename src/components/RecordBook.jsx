import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RecordBook({ id, name, netBalance, deleteFn }) {
    const navigate = useNavigate();
    return (
        <Card data-testid="record-book-item">
            <CardContent>
                <Typography color='primary' fontWeight={700}>{name}</Typography>
                <div>
                    <Typography color='primary' display='inline'>Balance : </Typography>
                    <Typography display='inline' color={netBalance >= 0 ? 'primary' : 'error'}>{netBalance.toFixed(2)} ₹</Typography>
                </div>
                <ButtonGroup sx={{ marginTop: '16px' }}>
                    <Button variant='contained' onClick={() => navigate(`/record_books/${id}`)}>View</Button>
                    <Button variant='contained' color='error' onClick={() => deleteFn(id)}>Delete</Button>
                </ButtonGroup>
            </CardContent>
        </Card >
    )
}

export default RecordBook;