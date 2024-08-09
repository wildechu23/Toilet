import './RestroomLabel.css';
import { RestroomProps } from '../utils/types';

interface RestroomLabelProps {
    restroom: RestroomProps,
    addReview: () => void
}


function RestroomLabel({ restroom, addReview } : RestroomLabelProps) {
    return (
        <>
            <div className={"restroom-entry"}>
            <div className="restroom-title">
                {restroom.gender}
            </div>
                {!!restroom.single_stall && <span title="Single Stall" className="icon single-stall"/>}
                {!!restroom.wheelchair_stall && <span title="Wheelchair Stall" className="icon wheelchair-stall"/>}
                {!!restroom.mirrors && <span title="Mirrors" className="icon mirror"/>}
                {!!restroom.hand_dryers && <span title="Hand Dryers" className="icon hand-dryer"/>}
                {!!restroom.paper_towels && <span title="Paper Towels"className="icon paper-towel"/>}
                <button type="button" onClick={addReview} title="Add a Review">+</button>
            </div>
        </>
    );
}

export default RestroomLabel;