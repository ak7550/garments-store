import React, { useContext, useState } from "react";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SideBarOptionsForLoggedInUser from "./SideBarOptionsForLoggedInUser";
import AkBackDrop from "./AkBackDrop";
import NestedLink from "./NestedLink";
import LogInForm from "../Core/Auth/LogInForm";
import { drawerWidth } from "../Utils/backEnd";
import { MainLayOutContext } from "./MainLayOut";
import SignUpForm from "../Core/Auth/SignUpForm";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const [logInDialogueBox, setLogInDialogueBox] = useState(false);
  const [signUpDialogueBox, setSignUpDialogueBox] = useState(false);
  const { user, sideBar, toggleSideBar } = useContext(MainLayOutContext);

  const handleLogInButtonClicked = (event) =>
    setLogInDialogueBox(!logInDialogueBox);

  const handleSignUpButtonClicked = (event) =>
    setSignUpDialogueBox(!signUpDialogueBox);

  return (
    <>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={sideBar}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={toggleSideBar}
      >
        <div
          className={classes.drawerHeader}
          style={{
            paddingTop: "2em",
            paddingBottom: "2em",
          }}
        >
          <IconButton
            onClick={toggleSideBar}
            disableFocusRipple={true}
            disableRipple={true}
          >
            {user ? (
              <Avatar
                alt={user.name}
                src={user.profilePic}
                className={classes.large}
              />
            ) : (
              <Avatar className={classes.large}>
                <Typography variant="h3" align="justify">
                  U
                </Typography>
              </Avatar>
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {
          user ? (
            <>
              {/*// todo: sidebar options for a signed in user*/}
              <SideBarOptionsForLoggedInUser user={user} />
            </>
          ) : (
            <>
              {/* //! add onClick event */}
              <ListItem button onClick={handleLogInButtonClicked}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={handleSignUpButtonClicked}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="SignUp" />
              </ListItem>
            </>
          )}
        </List>
        <Divider />
        <NestedLink toggleSideBar={toggleSideBar} />
      </Drawer>
      {logInDialogueBox && (
        <AkBackDrop
          open={logInDialogueBox}
          onClose={() => setLogInDialogueBox(!logInDialogueBox)}
        >
          <LogInForm close={handleLogInButtonClicked} />
        </AkBackDrop>
      )}
      {signUpDialogueBox && (
        <AkBackDrop
          open={signUpDialogueBox}
          onClose={() => setSignUpDialogueBox(!signUpDialogueBox)}
        >
          <SignUpForm close={handleSignUpButtonClicked} />
        </AkBackDrop>
      )}
    </>
  );
};

export default SideBar;
