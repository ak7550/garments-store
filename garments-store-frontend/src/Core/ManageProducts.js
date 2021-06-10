import React from 'react'
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Divider,
    Grid,
    Grow,
    makeStyles,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CreateForm from '../Components/CreateForm';
import UpdateForm from '../Components/UpdateForm';
import DeleteForm from '../Components/DeleteForm';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet';


const useStyle = makeStyles(theme => ({
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    },
}));


const ManageProducts = () => {
    const classes = useStyle();
    const options = [
        'Choose Your Options',
        'Create a Product',
        'Update an existing Product',
        'Delete an existing Product'
    ];
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const anchorRef = React.useRef(null);


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        handleClick();
    };

    const handleToggle = () =>
        setOpen((prevOpen) => !prevOpen);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Helmet>
                <title>Manage Products</title>
            </Helmet>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                wrap
            >
                <ButtonGroup variant="contained" color="secondary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                        color="secondary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu">
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
            <Divider style={{ marginTop: '2em', width: "100%" }} className={classes.root} />
            {
                selectedIndex === 1 && <CreateForm product />
            }
            {
                selectedIndex === 2 && <UpdateForm product />
            }
            {
                selectedIndex === 3 && <DeleteForm product /> //*BUG
            }
            {
                selectedIndex === 0 && <Footer />
            }

        </div>
    )
}

export default ManageProducts
