import { useEffect, useState } from "react";
import { fetchRecordBookDetailAPI } from "../api/recordBook";
import { Typography, Grid } from "@mui/material";
import { Container } from '@mui/system';
import Record from "./Record";
import { useParams } from "react-router-dom";

export default function RecordBookDetailView() {

    const {id} = useParams();

    const [name, setName] = useState('');
    const [netBalance, setNetBalance] = useState(0.00);
    const [records, setRecords] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        const callback = async () => {
            const { name, net_balance: netBalance, records, tags } = await fetchRecordBookDetailAPI(id);
            setName(name);
            setNetBalance(netBalance);
            setRecords(records);
            setTags(tags);
        }
        callback();
    }, [id]);

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
                                <Record id={id} note={record.note} amount={record.amount} type={record.type} addedAt={record.added_at} tags={record.tags} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </>
    );


}