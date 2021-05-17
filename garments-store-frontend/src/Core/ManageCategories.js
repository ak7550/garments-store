import React, { useContext, useRef } from 'react'
import clsx from 'clsx'
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
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CreateForm from '../Components/CreateForm';
import UpdateForm from '../Components/UpdateForm';
import DeleteForm from '../Components/DeleteForm';

const useStyle = makeStyles(theme => ({
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        //* necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    root: {
        width: '300%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
}));


const ManageCategories = () => {
    const classes = useStyle();
    const { sideBar } = useContext(MainLayOutContext);
    const options = [
        'Choose Your Options',
        'Create a category',
        'Update an existing category',
        'Delete an existing category'
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
        <>
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
                selectedIndex === 1 && <CreateForm category  />
            }
            {
                selectedIndex === 2 && <UpdateForm category/>
            }
            {
                selectedIndex === 3 && <DeleteForm category />
            }

    </>
    )
}

export default ManageCategories
