export const initialState = {
    showing: process.env.NODE_ENV != 'production',
    config: { // Don't Touch
        statusIcons: true,
        statusIconToggle: true,
        statusVisible: true,
        speedVisible: true,
        minimapVisible: true,
        locationVisible: true,
        rpmVisible: true,
        fuelVisible: true,
        metricUnits: true,
        statusStyle: 'old', // 'old' or 'new'
        positions: {
            horizStatusPos: 50,
            vertStatusPos: 1,
            horizVehiclePos: 50,
            vertVehiclePos: 5,
            horizMinimapPos: 0,
            vertMinimapPos: 0,
            horizLocationPos: 16,
            vertLocationPos: 3,
            statusPos: 'BottomLeft',
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_HUD':
            return {
                ...state,
                showing: true,
            };
        case 'HIDE_HUD':
            return {
                ...state,
                showing: false,
            };
        case 'TOGGLE_HUD':
            return {
                ...state,
                showing: !state.showing,
            };
        case 'UPDATE_STATUS':
            return {
                ...state,
                config: {
                    ...state.config,
                    ...action.payload,
                },
            };
        case 'SET_CONFIG':
            return {
                ...state,
                config: {
                    ...state.config,
                    ...action.payload.config,
                },
            };
        default:
            return state;
    }
};
