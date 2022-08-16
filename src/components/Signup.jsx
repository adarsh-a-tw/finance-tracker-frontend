import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserAPI } from '../api/user';
import alertStore from '../store/alertStore';
import theme from '../theme'

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setAlert } = alertStore();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            handleValidation();
        }
        catch (err) {
            setAlert("error", err.message);
            return;
        }
        try {
            await createUserAPI(username, email, password, confirmPassword);
            setAlert("success", "Signed up successfully.");
            navigate("/");

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleValidation = () => {
        const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/

        if (!usernameRegex.test(username))
            throw Error("Username is invalid");
        if (!emailRegex.test(email))
            throw Error("Email is invalid");
        if (!passwordRegex.test(password))
            throw Error("Password must have minimum eight characters, at least one letter, one number and one special character");
        if (password !== confirmPassword)
            throw Error("Passwords dont match")
    }


    return (
        <Card color='primary' mt={5} sx={{
            maxWidth: 720,
            margin: "100px auto 0 auto"
        }}>
            <CardContent>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item>
                        <Typography color="primary" variant='h4'>
                            Signup
                        </Typography>
                    </Grid>

                    <Grid item mt={3}>
                        <form action="" onSubmit={handleSubmit}>
                            <Grid container direction="column" alignItems="center">
                                <Grid item mb={3}>
                                    <TextField
                                        required
                                        id="username"
                                        label="Username"
                                        placeholder="JohnDoe"
                                        onChange={(e) => setUsername(e.target.value)}
                                        sx={{
                                            backgroundColor: "white"
                                        }}
                                    />
                                </Grid>
                                <Grid item mb={3}>
                                    <TextField
                                        required
                                        id="email"
                                        label="Email"
                                        placeholder="johndoe@gmail.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{
                                            backgroundColor: "white"
                                        }}
                                    />
                                </Grid>
                                <Grid item mb={3}>
                                    <TextField
                                        required
                                        inputProps={{
                                            "data-testid": "password",
                                        }}
                                        id="password"
                                        label="Password"
                                        placeholder="****"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={{
                                            backgroundColor: "white"
                                        }}
                                    />
                                </Grid>
                                <Grid item mb={3}>
                                    <TextField
                                        required
                                        inputProps={{
                                            "data-testid": "confirm_password",
                                        }}
                                        id="confirm_password"
                                        label="Confirm Password"
                                        placeholder="****"
                                        type="password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        sx={{
                                            backgroundColor: "white"
                                        }}
                                    />
                                </Grid>
                                <Grid container justifyContent="center" mb={3}>
                                    <Button variant='contained' type='submit'>Submit</Button>
                                </Grid>
                                <Grid container>
                                    <Link to="/">
                                        Already have an account ? Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Signup;


