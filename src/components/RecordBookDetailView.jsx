import React, { useEffect, useState } from "react";
import { fetchRecordBookDetailAPI } from "../api/recordBook";
import { createRecordAPI, deleteRecordAPI } from "../api/record";
import { Typography, Grid, TextField, MenuItem, Autocomplete, Chip } from "@mui/material";
import { Container } from '@mui/system';
import Record from "./Record";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
        fetchRecords(); // eslint-disable-next-line
    }, [id]); 

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


    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
    const [createNote, setCreateNote] = useState('');
    const [createAmount, setCreateAmount] = useState(0);
    const [createType, setCreateType] = useState("EXPENSE");
    const [createTags, setCreateTags] = useState([]);

    const handleCreateDialogClickOpen = () => {
        setOpenCreateDialog(true);
    };

    const handleCreateDialogClose = () => {
        setOpenCreateDialog(false);
        setCreateNote('');
        setCreateAmount(0);
        setCreateType("EXPENSE");
        setCreateTags([]);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        await createRecordAPI(id, createNote, createAmount, createType, createTags);
        await fetchRecords();
        handleCreateDialogClose();
    }


    return (
        <>
            <Container maxWidth="sm" sx={{ marginTop: "16px" }}>
                <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Grid item>
                        <Typography color="primary" variant='h4'>
                            {name}
                        </Typography>
                        <Typography color='primary' display='inline'>Balance : </Typography>
                        <Typography display='inline' color={netBalance >= 0 ? 'primary' : 'error'}>{netBalance.toFixed(2)} ₹</Typography>
                    </Grid>
                    <Grid item>
                        <Fab color="primary" aria-label="add" onClick={handleCreateDialogClickOpen}>
                            <AddIcon data-testid="plus-btn" />
                        </Fab>
                    </Grid>
                </Grid>

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

            <Dialog open={openCreateDialog} onClose={handleCreateDialogClose}>
                <DialogTitle>Create</DialogTitle>
                <form onSubmit={handleCreateSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Enter new record details.
                        </DialogContentText>

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="note"
                            inputProps={{ "data-testid": "note" }}
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCreateNote(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="amount"
                            inputProps={{ "data-testid": "amount" }}
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCreateAmount(parseFloat(e.target.value).toFixed(2))}
                        />

                        <TextField
                            id="type"
                            required
                            select
                            label="Type"
                            fullWidth
                            variant="standard"
                            value={"EXPENSE"}
                            inputProps={{ "data-testid": "type" }}
                            onChange={(e) => setCreateType(e.target.value)}
                        >

                            <MenuItem key={"EXPENSE"} value={"EXPENSE"}>
                                Expense
                            </MenuItem>
                            <MenuItem key={"INCOME"} value={"INCOME"}>
                                Income
                            </MenuItem>

                        </TextField>

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            data-testid="tags"
                            options={tags}
                            onChange={(_, v) => setCreateTags(v)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="filled" color="primary" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Tags"
                                    limitTags={2}
                                />
                            )}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateDialogClose}>Cancel</Button>
                        <Button type="submit" data-testid="create-confirm-btn">Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );


}