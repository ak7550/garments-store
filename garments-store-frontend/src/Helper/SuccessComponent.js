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


const SuccessComponent = ({ success }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(success);

    const handleClose = (event, reason) =>
        setOpen(false);

    console.log(`executed`);
    return (
        open &&
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message={success}
            autoHideDuration={2000}
        />
    )
}

export default SuccessComponent
