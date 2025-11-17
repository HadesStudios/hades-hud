export const initialState = {
    showing: process.env.NODE_ENV != 'production',
    menuVehicleToggled: false, // Don't touch
    isInVehicle: false,
    ignition: true,
    speed: 0,
    speedMeasure: 'MPH',
    seatbelt: false,
    seatbeltHide: false,
    cruise: false,
    checkEngine: false,
    fuel: 100,
    fuelHide: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_VEHICLE':
            if (state.menuVehicleToggled) return state;
            return {
                ...state,
                showing: true,
            };
        case 'HIDE_VEHICLE':
            if (state.menuVehicleToggled) return state;
            return {
                ...state,
                showing: false,
            };
        // case 'TOGGLE_VEHICLE':
        //     if (action.payload.showing && state.isInVehicle) {
        //         return {
        //             ...state,
        //             showing: action.payload.showing,
        //             menuVehicleToggled: false,
        //         };
        //     }
        //     if (!state.menuVehicleToggled) {
        //         return {
        //             ...state,
        //             showing: action.payload.showing,
        //             menuVehicleToggled: true,
        //         };
        //     }
        //     return state;
        case 'UPDATE_IGNITION':
            return {
                ...state,
                ignition: action.payload.ignition,
            };
        case 'UPDATE_SPEED':
            return {
                ...state,
                speed: action.payload.speed,
            };
        case 'UPDATE_SPEED_MEASURE':
            return {
                ...state,
                speedMeasure: action.payload.metricUnits ? 'MPH' : 'KM/H',
            };
        case 'UPDATE_SEATBELT':
            return {
                ...state,
                seatbelt: action.payload.seatbelt,
            };
        case 'SHOW_SEATBELT':
            return {
                ...state,
                seatbeltHide: false,
            };
        case 'HIDE_SEATBELT':
            return {
                ...state,
                seatbeltHide: true,
            };
        case 'UPDATE_CRUISE':
            return {
                ...state,
                cruise: action.payload.cruise,
            };
        case 'UPDATE_ENGINELIGHT':
            return {
                ...state,
                checkEngine: action.payload.checkEngine,
            };
        case 'SHOW_HUD':
        case 'UPDATE_FUEL':
            return {
                ...state,
                fuel: Boolean(action.payload.fuel)
                    ? action.payload.fuel
                    : state.fuel,
                fuelHide: typeof(action.payload.fuelHide) === "boolean"
                    ? action.payload.fuelHide
                    : state.fuelHide,
            };
        case 'IN_VEHICLE':
            return {
                ...state,
                isInVehicle: true,
            };
        case 'OUT_VEHICLE':
            return {
                ...state,
                isInVehicle: false,
            };
        default:
            return state;
    }
};
