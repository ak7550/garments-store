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
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import CategoryComponent from '../Core/CategoryComponent';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(3),
    },
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    }

}));

const NestedLink = ({ toggleSideBar }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        console.log(`hi from useEffct of nested links`);
        loadAllCategories(data =>
            setCategoryList(data)
        );
        //docs: https://stackoverflow.com/questions/45620694/how-to-return-response-of-axios-in-return (idea copied)
    }, []);

    // console.log(`updated list: `, categoryList);

    const match = useRouteMatch();
    console.log(`match is: `, match);
    return (
        <>
            <ListItem button onClick={() => setOpen(!open)}>
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
                {
                    categoryList.length &&
                    <List component="div" disablePadding>
                        {
                            //todo: https://material-ui.com/components/timeline/
                            categoryList.map((category, index) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    onClick={toggleSideBar}
                                >
                                    <Link to={`/category/${index}`}
                                        className={classes.link}
                                    >
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={category.name} />
                                    </Link>
                                </ListItem>
                            ))
                        }
                    </List>
                }
            </Collapse>
        </>
    )
}

export default NestedLink
