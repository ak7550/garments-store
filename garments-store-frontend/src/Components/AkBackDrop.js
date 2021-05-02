import React from 'react'
import {
    Backdrop,
    Fade,
    makeStyles,
    Modal
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const AkBackDrop = ({
    open, onClose, children
}) => {
    const classes = useStyles();
    return (
        <>
            <Modal
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}
                        style={{
                            backgroundColor: (x = 240) => `rgb(${x},${x},${x})`,
                            backgroundColor: "#f7f7f7"
                        }}
                    >
                        {children}
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default AkBackDrop
