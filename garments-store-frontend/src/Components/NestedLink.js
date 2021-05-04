import React, { useEffect, useState } from 'react'
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
import { loadAllCategories } from '../Utils/Category';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },

}));

const NestedLink = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        loadAllCategories(data => {
            console.log(`data is: `, data);
            setCategoryList(data);
        });
        //docs: https://stackoverflow.com/questions/45620694/how-to-return-response-of-axios-in-return (idea copied)
    }, []);

    const handleClick = () => setOpen(!open);

    console.log(`updated list: `, categoryList);
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
