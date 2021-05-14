import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


const SuccessComponent = ({success}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(!!success);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    console.log(`executed`);
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Success
        </Alert>
            </Snackbar>
        </div>
    )
}

export default SuccessComponent
