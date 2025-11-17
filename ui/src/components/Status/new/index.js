import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    status: {
        position: 'absolute',
        fontSize: 30,
        width: 'fit-content',
        textAlign: 'center',
        filter: 'drop-shadow(0 0 2px #000000)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'inherit',
    },
    BottomLeft: {
        left: 20,
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        transform: 'none', 
    },
    BottomCenter: {
        left: '50%',
        bottom: 10,
        justifyContent: 'center',
        transform: 'translateX(-50%)',
    },
    BottomRight: {
        right: 20,
        bottom: 10,
        justifyContent: 'flex-end',
        transform: 'none',
    },
    TopLeft: {
        left: 20,
        top: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        transform: 'none', 
    },
    TopCenter: {
        left: '50%',
        top: 15,
        justifyContent: 'center',
        transform: 'translateX(-50%)',
    },
    TopRight: {
        right: 20,
        top: 15,
        justifyContent: 'flex-end',
        transform: 'none',
    },
    iconWrapper: {
        position: 'relative',
        height: 50,
        width: 50,
        '&:not(:last-of-type)': {
            marginRight: 20,
        },
        '&.low': {
            animation: '$flash linear 1s infinite',
        },
    },
    iconProg: {
        position: 'absolute',
        height: 5,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: 5,
    },
    barBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        border: '1px solid #000',
        borderRadius: '50%',
        transform: 'rotate(-180deg)',
        overflow: 'hidden',
    },
    bar: {
        maxWidth: '100%',
        height: '100%',
        transition: 'width ease-in 0.15s',
        borderRadius: '50%',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
    },
    iconAvatar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        background: theme.palette.secondary.dark,
        borderRadius: '50%',
        '& svg, & span': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            fontSize: 22,
            textShadow: '0 0 5px #000',
            color: theme.palette.text.main,
            zIndex: 6,
        },
    },
    errorIcon: {
        color: theme.palette.error.light,
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
}));

export default withTheme(() => {
    const classes = useStyles();
    const theme = useTheme();

    const horizStatusPos = useSelector((state) => state.menu.horizStatusPos);
    const vertStatusPos = useSelector((state) => state.menu.vertStatusPos);

    const statusPos = useSelector((state) => state.menu.statusPos);
    const showStatus = useSelector((state) => state.status.showStatus);

    const config = useSelector((state) => state.hud.config);
    const inVeh = useSelector((state) => state.vehicle.showing);
    const isDead = useSelector((state) => state.status.isDead);
    const health = useSelector((state) => state.status.health);
    const armor = useSelector((state) => state.status.armor);
    const statuses = useSelector((state) => state.status.statuses);
    const fuelHide = useSelector((state) => state.vehicle.fuelHide);
    const fuel = useSelector((state) => state.vehicle.fuel);

    const { statusIconToggle } = config;

    if (!showStatus) {
        return null;
    }

    const GetFuel = () => {
        if (!inVeh || fuelHide) return null;

        const displayFuel = !statusIconToggle ? Math.floor(fuel) : fuel;
        const numberStyle = !statusIconToggle ? { marginTop: '7.5px' } : {};
        
        return (
            <CSSTransition key="fuel" timeout={500} classNames="fade">
                <div
                    key="fuel"
                    className={`${classes.iconWrapper}${
                        fuel <= 10 ? ' low' : ''
                    }`}
                >
                    {statusIconToggle ? (
                        <div className={classes.iconAvatar}>
                            <FontAwesomeIcon icon="gas-pump" />
                        </div>
                    ) : (
                        <span style={{ marginTop: '7.5px' }}>{displayFuel}</span>
                    )}
                    <div className={classes.barBg}>
                        <div
                            className={classes.bar}
                            style={{
                                background: theme.palette.warning.main,
                                height: `${fuel}%`,
                            }}
                        ></div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    const GetHealth = () => {
        if (isDead) {
            return (
                <CSSTransition key="health" timeout={500} classNames="fade">
                    <div className={classes.iconWrapper}>
                        {statusIconToggle ? (
                            <div className={classes.iconAvatar}>
                                <FontAwesomeIcon icon="skull-crossbones" />
                            </div>
                        ) : (
                            <div className={classes.iconAvatar}>
                                <span style={{ marginTop: '7.5px' }}>Dead</span>
                            </div>
                        )}
                        <div className={classes.barBg}>
                            <div
                                className={classes.bar}
                                style={{
                                    background: 'red',
                                    height: `100%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </CSSTransition>
            );
        } else {
            return (
                <CSSTransition key="health" timeout={500} classNames="fade">
                    <div
                        className={`${classes.iconWrapper}${
                            health <= 10 ? ' low' : ''
                        }`}
                    >
                        {statusIconToggle ? (
                            <div className={classes.iconAvatar}>
                                <FontAwesomeIcon icon="heart" />
                            </div>
                        ) : (
                            <div className={classes.iconAvatar}>
                                <span style={{ marginTop: '7.5px' }}>{health}</span>
                            </div>
                        )}
                        <div className={classes.barBg}>
                            <div
                                className={classes.bar}
                                style={{
                                    background: theme.palette.success.main,
                                    height: `${health}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </CSSTransition>
            );
        }
    };

    const GetArmor = () => {
        if (armor <= 0 || isDead) return null;
        return (
            <CSSTransition key="armor" timeout={500} classNames="fade">
                <div className={classes.iconWrapper}>
                    {statusIconToggle ? (
                        <div className={classes.iconAvatar}>
                            <FontAwesomeIcon icon="shield-halved" />
                        </div>
                    ) : (
                        <div className={classes.iconAvatar}>
                            <span style={{ marginTop: '7.5px' }}>{armor}</span>
                        </div>
                    )}
                    <div className={classes.barBg}>
                        <div
                            className={classes.bar}
                            style={{
                                background: theme.palette.info.main,
                                height: `${armor}%`,
                            }}
                        ></div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    const elements = statuses
        .sort((a, b) => a.options.id - b.options.id)
        .map((status, i) => {
            if (
                (status.value >= 90 && status?.options?.hideHigh) ||
                (status.value == 0 && status?.options?.hideZero) ||
                (isDead && !status?.options?.visibleWhileDead)
            )
                return null;

            const displayValue = !statusIconToggle ? Math.floor(status.value) : status.value;
            return (
                <CSSTransition
                    key={`status-${i}`}
                    timeout={500}
                    classNames="fade"
                >
                    <div
                        className={`${classes.iconWrapper}${
                            ((!status.inverted && status.value <= 10) ||
                                (status.inverted && status.value >= 90)) &&
                            status.flash
                                ? ' low'
                                : ''
                        }`}
                    >
                        {statusIconToggle ? (
                            <div className={classes.iconAvatar}>
                                <FontAwesomeIcon icon={status.icon ?? 'question'} />
                            </div>
                        ) : (
                            <div className={classes.iconAvatar}>
                                <span style={{ marginTop: '7.5px' }}>{displayValue}</span>
                            </div>
                        )}
                        <div className={classes.barBg}>
                            <div
                                className={classes.bar}
                                style={{
                                    background: status.color
                                        ? status.color
                                        : theme.palette.text.main,
                                        height: `${status.value}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </CSSTransition>
            );
        });

    elements.unshift(GetArmor());
    elements.unshift(GetHealth());
    elements.unshift(GetFuel());

    return (
        <TransitionGroup className={`${classes.status} ${classes[statusPos]}`}>
            {elements}
        </TransitionGroup>
    );
});