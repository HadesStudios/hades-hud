import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, List, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKeypress from 'react-use-keypress';

import Nui from '../../util/Nui';
import ListItem from './components/ListItem';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        maxWidth: 400,
        height: '100%',
        maxHeight: 'calc(100% - 300px)',
        position: 'absolute',
        top: 200,
        right: '15%',
        margin: 'auto',
    },
    header: {
        padding: 5,
        background: theme.palette.secondary.main,
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    title: {
        lineHeight: '38px',
        background: theme.palette.primary.main,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '-40px',
        marginTop: '-20px',
        width: 'calc(100% + 80px)',
		borderRadius: '.5vh',
        userSelect: 'none'
    },
    title1: {
        marginTop: '5px',
        color: '#fff',
        fontSize: '25px',
    },
    headerAction: {
        fontSize: 14,
        marginRight: '-37px',
    },
    headerAction1: {
        fontSize: 14,
        marginRight: '10px',
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        maxHeight: '100%',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: 6,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            transition: 'background ease-in 0.15s',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: `${theme.palette.primary.main}c7`,
        },
        '&::-webkit-scrollbar-track': {
            background: theme.palette.secondary.main,
        },
    },
}));

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showing = useSelector((state) => state.list.showing);
    const active = useSelector((state) => state.list.active);
    const stack = useSelector((state) => state.list.stack);
    const menus = useSelector((state) => state.list.menus);

    const menu = menus[active];

    useKeypress(['Escape'], () => {
        if (!showing) return;
        else onClose();
    });

    const onBack = () => {
        Nui.send('ListMenu:Back');
        dispatch({
            type: 'LIST_GO_BACK',
        });
    };

    const onClose = () => {
        Nui.send('ListMenu:Close');
    };

    if (!showing || !Boolean(menu)) return null;
    return (
        <div className={classes.wrapper}>
            <Grid container className={classes.header}>
                <Grid item xs={8} className={classes.title}>
                    <div className={classes.title1}>{menu?.label ?? 'List'}</div>
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    {Boolean(stack) && stack.length > 0 && (
                        <IconButton className={classes.headerAction1} onClick={onBack}>
                            <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                        </IconButton>
                    )}
                    <IconButton className={classes.headerAction} onClick={onClose}>
                        <FontAwesomeIcon icon={['fas', 'x']} />
                    </IconButton>
                </Grid>
            </Grid>
            <List className={classes.list}>
                {Boolean(menu) &&
                    menu.items.map((item, k) => {
                        return (
                            <ListItem
                                key={`${active}-${k}`}
                                index={k}
                                item={item}
                            />
                        );
                    })}
            </List>
        </div>
    );
};