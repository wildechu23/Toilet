import React, { createContext, useContext, useState, useCallback } from 'react';

const OverlayContext = createContext(null);

export const useOverlayContext = () => {
    return useContext(OverlayContext);
};

export const OverlayProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [addLocationOpen, setAddLocationOpen] = useState(false);
    const [selectLocationOpen, setSelectLocationOpen] = useState(false);

    const openOverlay = useCallback(() => setAddLocationOpen(true), []);
    const closeOverlay = useCallback(() => setAddLocationOpen(false), []);

    const openSelect = useCallback(() => {
        closeOverlay();
        setSelectLocationOpen(true);
    }, [closeOverlay]);

    const closeSelect = useCallback(() => {
        setSelectLocationOpen(false);
        openOverlay();
    }, [openOverlay]);

    const openEditOverlay = useCallback((location) => {
        setCurrentLocation(location);
        setEditMode(true);
        openOverlay();
    }, [openOverlay]);

    const resetEditMode = useCallback(() => setEditMode(false), []);

    const value = {
        currentLocation,
        setCurrentLocation,
        editMode,
        setEditMode,
        addLocationOpen,
        openOverlay,
        closeOverlay,
        openSelect,
        closeSelect,
        openEditOverlay,
        resetEditMode,
    };

    return (
        <OverlayContext.Provider value={value}>
            {children}
        </OverlayContext.Provider>
    );
};