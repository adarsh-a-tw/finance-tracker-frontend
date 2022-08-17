import { Card, CardContent, Chip, Stack, Typography, Button } from "@mui/material";
import moment from "moment";

export default function Record({ id, note, amount, type, addedAt, tags, deleteFn }) {
    return (
        <Card key={id} data-testid="record">
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Chip label={type} color={type === 'INCOME' ? 'primary' : 'error'} />
                    {tags.map((elem, index) => <Chip key={index} label={elem} color='secondary' sx={{ color: "white" }} />)}
                </Stack>
                <Typography color='primary' fontWeight={700} marginTop={"16px"}>{note}</Typography>
                <Typography color='primary' display='inline'>Amount : </Typography>
                <Typography display='inline' color={type === 'INCOME' ? 'primary' : 'error'}>{amount.toFixed(2)} ₹</Typography>
                <Typography color='primary'>Added at : {moment(addedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                <Button sx={{ mt: 2 }} variant='contained' color='error' onClick={() => deleteFn(id)}>Delete</Button>
            </CardContent>
        </Card>
    );
}