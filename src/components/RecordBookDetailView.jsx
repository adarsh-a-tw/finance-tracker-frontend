import React,{ useEffect, useState } from "react";
import { fetchRecordBookDetailAPI } from "../api/recordBook";
import { deleteRecordAPI } from "../api/record";
import { Typography, Grid } from "@mui/material";
import { Container } from '@mui/system';
import Record from "./Record";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RecordBookDetailView() {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [netBalance, setNetBalance] = useState(0.00);
    const [records, setRecords] = useState([]);
    const [tags, setTags] = useState([]);

    const fetchRecords = async () => {
        const { name, net_balance: netBalance, records, tags } = await fetchRecordBookDetailAPI(id);
        setName(name);
        setNetBalance(netBalance);
        setRecords(records);
        setTags(tags);
    }

    useEffect(() => {
        fetchRecords();
    }, [id,fetchRecords]);

    const handleDelete = async () => {
        await deleteRecordAPI(id, deleteId);
        await fetchRecords();
        handleClose();
    }

    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);

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
                    {name}
                </Typography>
                <Typography color='primary' display='inline'>Balance : </Typography>
                <Typography display='inline' color={netBalance >= 0 ? 'primary' : 'error'}>{netBalance.toFixed(2)} ₹</Typography>
                <Grid container direction="column">

                    {records.map((record, index) => {
                        return (
                            <Grid item key={index} sx={{ marginTop: "16px" }}>
                                <Record id={record.id} note={record.note} amount={record.amount} type={record.type} addedAt={record.added_at} tags={record.tags} deleteFn={handleClickOpen} />
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
                    {"Delete this Record ?"}
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
    );


}