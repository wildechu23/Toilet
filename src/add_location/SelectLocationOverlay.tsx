import './SelectLocationOverlay.css';

interface SelectLocationOverlayProps {
    toggleSelect: () => void
}

function SelectLocationOverlay({toggleSelect}: SelectLocationOverlayProps) {
    return (
        <div className="overlay-mask">
            <div className="overlay-box">    
                <div className="overlay-name">
                    Select Location
                </div>
                <button type="button" onClick={toggleSelect}>&#8592;</button>
            </div>
        </div>
    );
}

export default SelectLocationOverlay;