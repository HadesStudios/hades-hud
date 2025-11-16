import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Grow } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        color: 'white',
        textShadow: '0 0 3px #000000',
    padding: '12px 16px',
    height: 'fit-content',
    position: 'absolute',
    bottom: '6%',
    right: 0,
    left: 0,
    margin: 'auto',
    width: 'auto',
    maxWidth: '75%',
    fontSize: 24,
    borderRadius: 6,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 12,
    rowGap: 6,
    },
    key: {
    padding: '10px 12px',
        color: 'white',
        backgroundColor: 'rgba(105, 105, 105, 0.71)',
        borderRadius: 4.5,
        textTransform: 'uppercase',
    // removed marginRight to allow container gaps to center items cleanly
    fontSize: '1.0em',
        fontWeight: 'bold',
    width: '44px',
    height: '44px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2.9px solid rgba(126, 126, 126, 255)',
        boxSizing: 'border-box',
    },
    text: {
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    // rely on wrapper gaps but ensure vertical alignment with keys
    minHeight: '44px',
    paddingLeft: 8,
    textAlign: 'center',
    },
    pipe: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // act as an invisible spacer so removing the visible '|' keeps centering
    width: 16,
    height: '44px',
    boxSizing: 'border-box',
    },
}));

export default () => {
    const classes = useStyles();
    const showing = useSelector((state) => state.action.showing);
    const message = useSelector((state) => state.action.message);

    const ParseButtonText = () => {
        let v = message;
    // wrap each line in a text span first, then convert key placeholders into sibling spans
    v = v.replace(/(.*)/g, `<span class="${classes.text}">$1</span>`);
    // convert {key} into a close-text + key-open so the key becomes a sibling (prevents overlay)
    v = v.replace(/\{key\}/g, `</span><span class="${classes.key}">`);
    v = v.replace(/\{\/key\}/g, `</span><span class="${classes.text}">`);
    // replace visible '|' with an invisible spacer so centering/layout is preserved
    v = v.replace(/\|/g, `<span class="${classes.pipe}" aria-hidden="true"></span>`);
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