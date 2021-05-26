import { ButtonBase, CardMedia, Fade, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Footer from '../Components/Footer'
import { loadAllCategories } from '../Utils/Category';
import { getImage, imgeAPI } from '../Helper/Random'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },

}));

const Home = () => {
    const history = useHistory();
    const [categoryList, setCategoryList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        console.log(`hi from useEffct of nested links`);
        loadAllCategories(data => {
            console.log(data);
            setCategoryList(data);
        });
    }, []);


    return (
        <div>
            <Grid container style={{
                border: '2px solid black',
            }} direction="row">
                {
                    categoryList.map((category, i) => (
                        <Grid item key={i}
                            style={{
                                // height: '18em',
                                width: '100%',
                                border: '2px solid green',
                                // marginBottom: '2px'
                            }}
                        >
                            <ButtonBase
                                focusRipple
                                key={i}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: '100%',
                                }}
                                onClick={e => history.push(`/category/${i}`) }
                            >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${`https://source.unsplash.com/featured/?${category.name.split(" ")[0]}`})`,
                                    }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        Check Out {category.name}
                                        <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>

                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}



export default Home
