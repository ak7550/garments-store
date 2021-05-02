import React from 'react'
import {
    Button,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
//docs: https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));


const LogInForm = () => {
    const classes = useStyles();

    const logInHeader = () => {

    }

    const handleLogIn = event => {
        
    }
    
    return (
        <Container className={classes.container} maxWidth="xs">
            {logInHeader()}
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    size="small" variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" variant="outlined">
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    size="small"
                                    type="password"
                                    variant="outlined"

                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            fullWidth type="submit"
                            variant="contained"
                            onClick={handleLogIn}
                        >Log in</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default LogInForm;
