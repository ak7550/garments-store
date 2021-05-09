import React from 'react'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import clsx from 'clsx';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { blue, red, grey, green, orange, pink, purple } from '@material-ui/core/colors';


//todo: https://codesandbox.io/s/547b5?file=/demo.js
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${color}`,
    },
  }),

  avatar: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
    opacity: 0.2,
    '&:hover': {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
      opacity: 1,
    }
  },
  cardAction: {
    backgroundColor: grey[200],
  },
  pink: {
    backgroundColor: pink[700],
    color: theme.palette.getContrastText(pink[700]),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  red: {
    backgroundColor: red[700],
    color: theme.palette.getContrastText(red[700]),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  green: {
    backgroundColor: green[700],
    color: theme.palette.getContrastText(green[700]),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  purple: {
    backgroundColor: purple[700],
    color: theme.palette.getContrastText(purple[700]),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  orange: {
    backgroundColor: orange[700],
    color: theme.palette.getContrastText(orange[700]),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));


const ProductCard = ({ product }) => {
  const classes = useStyles({ color: '#203f52' });
  const { name, description, _id: id, imageLinks, sizes } = product;
  const { price } = sizes[0];


  const handleFavouriteButtonPressed = event => {
    console.log(`handleFavouriteButtonPressed button pressed`);
  }

  const handleCartButtonPressed = event => {
    console.log(`handleCartButtonPressed button pressed`);
  }

  const renderSizes = (sizeArr = []) => {
    const arr = [classes.red, classes.green, classes.pink, classes.purple, classes.orange];
    return (
      sizeArr.map((sizeObj, index) =>
        <Avatar className={arr[index]} >
          <Typography variant="subtitle2" display="block" align="center"
            style={{
              fontSize: "0.6rem",
              fontWeight: "lighter",
            }}
          >
            {sizeObj.size}
          </Typography>
        </Avatar>
      )
    );
  }

  return (
    <Card className={clsx(classes.root, classes.card)}>
      <CardHeader
        title={name}
        //todo: procive the available sizes in avatar format
        subheader={renderSizes(sizes)}
        action={
          <Avatar className={classes.avatar}>
            <CallMadeIcon />
          </Avatar>
        }
      />
      <Divider />
      <CardMedia
        className={classes.media}
        image={imageLinks[0]}
        title={name}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <IconButton aria-label="add to favorites" color="secondary" onClick={handleFavouriteButtonPressed}>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="add-to-cart" color="primary" onClick={handleCartButtonPressed}>
          <AddShoppingCartIcon />
        </IconButton>
        <Button color="secondary" variant="text" size="medium"
          style={{
            position: 'relative',
            fontWeight: 'normal',
            left: '4.4rem',
          }}
        >
          ${price}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard
