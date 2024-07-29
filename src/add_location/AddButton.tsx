import "./AddButton.css"
// import axios from 'axios';

interface AddButtonProps {
    openOverlay: () => void
}

// function addLocation() {
    // axios.post('//localhost:3000/locations', {
    //     "name": "DCC Bathroom",
    //     "lat": 42.7284,
    //     "lng": -73.677
    // })
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));
// }

function AddButton({ openOverlay }: AddButtonProps) {
    return (
        <>
            <button type="button" className="add-location-button" onClick={openOverlay}>
                <div className="plus"></div>
            </button>
        </>
    )
}

export default AddButton;