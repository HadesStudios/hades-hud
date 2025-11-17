import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fade, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import beltoff from '../../assets/beltoff.svg';
import belton from '../../assets/belton.svg';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'absolute',
        left: '17.5vw',
        top: '80vh',
        margin: 'auto',
        width: 'fit-content',
        filter: `drop-shadow(0 0 2px #2c2b2c)`,
        fontSize: 30,
        color: theme.palette.text.main,
        textAlign: 'center',
    },
    speed: {
        display: 'flex',
        flexDirection: 'column',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        gridGap: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#2c2b2c',
        // border: '1px solid #000',
    },
    speedText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '2vw',
        textShadow: '30px 30px 30px #7f7e80',
        filter: `drop-shadow(30px 30px 30px #7f7e80)`,
        color: '#f1f1f1',
        transition: 'color ease-in 0.15s',
        marginTop: 1,
        '& .filler': {
            color: '#f1f1f1',
        },
    },
    speedTextOff: {
        fontSize: 45,
        color: '#8a0000',
        textShadow: '30px 30px 30px #7f7e80',
        textTransform: 'uppercase',
        display: 'inline-block',
    },
    speedMeasure: {
        display: 'flex',
        textTransform: 'uppercase',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '0.7vw',
        color: '#f1f1f1',
        textShadow: '30px 30px 30px #7f7e80',
        marginTop: -4,
    },
    icons: {
        position: 'absolute',
        bottom: '15vh',
        left: '0.5vw',
        display: 'flex',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        // border: '1px solid #000',
        padding: 5,
        gridGap: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c2b2c',
    },
    icons2: {
        position: 'absolute',
        bottom: '5vh',
        left: '-1vw',
        display: 'flex',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        // border: '1px solid #000',
        padding: 5,
        gridGap: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c2b2c',
    },
    seatbeltIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 29,
        height: 29,
        animation: '$flash linear 1s infinite',
    },
    seatbeltIcon1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 38,
        height: 28,
    },
    checkEngine: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 19,
        marginLeft: 3,
        color: theme.palette.warning.dark,
        animation: '$flash linear 1s infinite',
    },

    checkEngine1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 19,
        marginLeft: 3,
        color: theme.palette.warning.dark,
        opacity: 0.5,
    },
    cruiseIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.primary.main,
    },
    fuel100: {
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.success.dark,
    },
    fuel75: {
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.success.main,
    },
    fuel50: {
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.warning.main,
    },
    fuel25: {
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.error.main,
        animation: '$flash linear 1.5s infinite',
    },
    fuel10: {
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.error.main,
        animation: '$flash linear 1s infinite',
    },
    fuel0: {
        margin: '0 15px',
        fontSize: 25,
        color: theme.palette.error.main,
        animation: '$flash linear 0.5s infinite',
    },
    iconWrapper: {
        position: 'relative',
        height: 50,
        width: 50,
        '&.low': {
            animation: '$flash linear 0.5s infinite',
        },
    },
    iconProg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: 5,
    },
    iconAvatar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        background: '#2c2b2c',
        '& svg': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            color: theme.palette.text.main,
        },
    },
    '@keyframes flash': {
        '0%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.1,
        },
        '100%': {
            opacity: 1,
        },
    },
    circle: {
        bottom: '6.9%',
        width: '27vh',
        height: '22.9vh',
        border: `4px solid ${'#2c2b2c'}`,
        position: 'absolute',
        display: 'inline-block',
        borderRadius: '50%',
    },
    mapborder: {
        position: 'absolute',
        bottom: '2.6vh',
        left: '-15.3vw',
        width: '0%',
        textAlign: 'center',
    },
}));

export default () => {
    const classes = useStyles();

    const config = useSelector((state) => state.hud.config);
    const showing = useSelector((state) => state.vehicle.showing);
    const ignition = useSelector((state) => state.vehicle.ignition);
    const speed = useSelector((state) => state.vehicle.speed);
    const speedMeasure = useSelector((state) => state.vehicle.speedMeasure);
    const seatbelt = useSelector((state) => state.vehicle.seatbelt);
    const checkEngine = useSelector(state => state.vehicle.checkEngine);
    const seatbeltHide = useSelector((state) => state.vehicle.seatbeltHide);
    const cruise = useSelector((state) => state.vehicle.cruise);
    const [speedStr, setSpeedStr] = useState(speed.toString());

    useEffect(() => {
        if (speed === 0) {
            setSpeedStr(`<span class="filler">0</span>`);
        } else if (speed < 10) {
            setSpeedStr(`<span class="filler"></span>${speed.toString()}`);
        } else if (speed < 100) {
            setSpeedStr(`<span class="filler"></span>${speed.toString()}`);
        } else {
            setSpeedStr(speed.toString());
        }
    }, [speed]);

    return (
        <Fade in={showing}>
            <div className={classes.wrapper} style={{ bottom: config.statusIcons || config.statusNumbers ? 50 : 20 }}>
                <div className={classes.mapborder}>
                    <div className={classes.circle}></div>
                </div>
                {!seatbeltHide && (
                    <Fade in={ignition}>
                        <div className={classes.icons}>
                            {!seatbelt ? (
                                <Fade in={!seatbelt}>
                                    <span>
                                        <img className={classes.seatbeltIcon} src={beltoff} alt="seatbelt" style={{ gridColumn: 1 }} />
                                    </span>
                                </Fade>
                            ) : (
                                <Fade in={seatbelt}>
                                    <span>
                                        <img className={classes.seatbeltIcon1} src={belton} alt="seatbelt" style={{ gridColumn: 1 }} />
                                    </span>
                                </Fade>
                            )}
                        </div>
                    </Fade>
                )}
                <Fade in={ignition}>
                    <div className={classes.icons2}>
                        {checkEngine ? (
                            <Fade in={checkEngine}>
                                <span>
                                    <FontAwesomeIcon
                                        className={classes.checkEngine}
                                        style={{ gridColumn: 1 }}
                                        icon={['fas', 'oil-can']}
                                    />
                                </span>
                            </Fade>
                        ) : (
                        <Fade in={!checkEngine}>
                            <span>
                                <FontAwesomeIcon
                                    className={classes.checkEngine1}
                                    style={{ gridColumn: 1 }}
                                    icon={['fas', 'oil-can']}
                                />
                            </span>
                        </Fade>
                    )}
                    </div>
                </Fade>
                <div className={classes.speed}>
                    {ignition ? (
                        <div>
                            <span className={classes.speedText}>
                                {ReactHtmlParser(speedStr)}
                            </span>
                            <span className={classes.speedMeasure}>
                                {speedMeasure}
                            </span>
                        </div>
                    ) : (
                        <span className={classes.speedTextOff}>Off</span>
                    )}
                </div>
            </div>
        </Fade>
    );
};