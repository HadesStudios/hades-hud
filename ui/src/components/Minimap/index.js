import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
    const dispatch = useDispatch();
    const minimapVisible = useSelector((state) => state.minimap.showing);
    const [minimap, setMinimap] = useState({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
    });

    const calculateMinimap = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const minimapData = {
            width: screenWidth / 7.5,
            height: screenHeight / 7.5,
            left: 0,
            top: screenHeight - (screenHeight / 7.5),
        };

        return {
            width: minimapData.width,
            height: minimapData.height,
            left: minimapData.left,
            top: minimapData.top,
        };
    };

    const handleMinimapToggle = () => {
        const newVisibility = !minimapVisible;
        dispatch({
            type: 'TOGGLE_MINIMAP',
            payload: { state: newVisibility }
        });

        Nui.send('MinimapData');

        console.log(`Minimap visibility toggled: ${newVisibility}`);
    };

    const fetchMinimapData = async () => {
        try {
            const response = await fetch('/hades-hud');
            const data = await response.json();
            console.log('Fetched minimap data:', data);
            setMinimap(data);
        } catch (error) {
            console.error('Error fetching minimap data:', error);
        }
    };

    useEffect(() => {
        if (minimapVisible) {
            const minimapData = calculateMinimap();
            setMinimap(minimapData);
            fetchMinimapData();
        }
    }, [minimapVisible]);

    useEffect(() => {
        console.log('Minimap state:', minimap);
    }, [minimap]);

    return (
        <div>
            <button onClick={handleMinimapToggle}>
                {minimapVisible ? "Hide Minimap" : "Show Minimap"}
            </button>
            {minimapVisible && (
                <div
                    style={{
                        position: 'absolute',
                        left: minimap.left + "px",
                        top: minimap.top + "px",
                        width: minimap.width + "px",
                        height: minimap.height + "px",
                        borderRadius: '5px',
                        border: '2px solid #ffffff',
                    }}
                >
                    {/* Minimap content goes here */}
                </div>
            )}
        </div>
    );
};
