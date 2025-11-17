/* eslint-disable react/no-danger */
import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Grow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        color: theme.palette.text.main,
        textShadow: '0 0 3px #000000',
        padding: 10,
        height: 'fit-content',
        position: 'absolute',
        bottom: '7vh',
        right: 0,
        left: 0,
        margin: 'auto',
        width: 'fit-content',
        fontSize: 20,
        '& svg': {
            position: 'absolute',
            left: -15,
            bottom: -15,
            color: 'rgb(156,230,13)',
            fontSize: 28,
            zIndex: 100,
        },
        textTransform: 'capitalize',
        userSelect: 'none'
    },
    highlight: {
        color: '#3aaaf9',
        fontWeight: 500,
    },
    '.highlight': {
        color: '#3aaaf9',
        fontWeight: 500,
    },
    highlightSplit: {
        color: '#ffffff',
        fontWeight: 500,
    },
    key: {
		background: alpha(theme.palette.primary.main, 0.45),
		color: 'white',
		border: `2px solid ${alpha(theme.palette.primary.main, 0.45)}`,
		padding: '5px 14px',
		borderRadius: '4px',
		marginRight: 5
    },
}));

export default () => {
    const classes = useStyles();
    const showing = useSelector((state) => state.action.showing);
    const message = useSelector((state) => state.action.message);

    const ParseButtonText = () => {
        let v = message;
        
        v = v.replace(/\{key\}([^\{]+)\{\/key\}/gi, (match, p1) => {
            return `<span class="${classes.key}">${p1}</span>`;
        });
    
        return v;
    };    
   
    if (!Boolean(message)) return null;
    return (
        <Grow in={showing}>
            <div className={classes.wrapper}>
                {ReactHtmlParser(ParseButtonText())}
            </div>
        </Grow>
    );
};