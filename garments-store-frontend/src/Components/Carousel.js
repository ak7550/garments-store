import React, { useState } from 'react'
import { getRandomImages } from '../Helper/Random'
import { Button, IconButton, makeStyles, Modal, } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AkBackDrop from './AkBackDrop';

const useStyles = makeStyles({
    iconButton: {
        position: 'absolute',
    }
});

const CarouselBox = ({ images = [] }) => {
    images.length === 0 && getRandomImages("fashion", data => images.push(data));
    const [index, setIndex] = useState(0);
    const [magnify, setMagnify] = useState(false);
    console.log(`images: `, images);
    const classes = useStyles();

    const handleOnClose = () => setMagnify(false);


    const handleLeftClick = event => setIndex(pre => pre === 0 ? images.length - 1 : pre - 1);

    const handleRightClick = event => setIndex(pre => (pre + 1) % images.length);

    console.log(`magnify: `, magnify);
    return (
        <>
            <Button
                style={{
                    cursor: 'zoom-in',
                    backgroundImage: `url(${images[index]})`,
                    backgroundSize: '25em',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '25em',
                    display: 'flex',
                    alignItems: 'flex-end',
                    // border: '2px solid red',
                    minWidth: '90%',
                    flexWrap: 'wrap'
                }}
                onClick={e => setMagnify(true)}
            >
                <IconButton onClick={handleLeftClick} >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton style={{
                    position: 'relative',
                    marginLeft: 'auto'
                }}
                    onClick={handleRightClick}
                >
                    <ChevronRightIcon />
                </IconButton>
                {
                    magnify && (
                        <Modal
                            open={magnify}
                            onClose={handleOnClose}
                            onBackdropClick={handleOnClose}
                        >
                            <img src={images[index]} width="900" height="900" />
                        </Modal>
                    )
                }
            </Button>
        </>
    )
}

export default CarouselBox
