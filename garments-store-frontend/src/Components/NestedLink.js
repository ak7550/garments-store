import React from 'react'
import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core'

import {
    ExpandLess,
    ExpandMore,
    StarBorder
} from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },

}));

const NestedLink = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => setOpen(!open);
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Categories"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default NestedLink
