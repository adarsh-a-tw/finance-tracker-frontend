import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import authAPI from '../api/auth';
import authStore from '../store/authStore';
import theme from '../theme'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = authStore();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let token = await authAPI(username, password);
      console.log(token);
      login(token);
    }
    catch (err) {}
  }

  return (
    <Card color='primary' mt={5} sx={{
      maxWidth: 720,
      margin: "100px auto 0 auto",
      backgroundColor: theme.palette.light.main
    }}>
      <CardContent>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography color="primary" variant='h4'>
              Login
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
                <Grid container justifyContent="center" mb={3}>
                  <Button variant='contained' type='submit'>Submit</Button>
                </Grid>
                <Grid container>
                  <Link to="/">
                    Don't have an account? Sign Up
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

export default Login