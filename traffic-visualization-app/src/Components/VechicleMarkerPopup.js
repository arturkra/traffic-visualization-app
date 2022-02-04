import react from "react";
import { Popup } from "react-leaflet";

function VechicleMarkerPopup(props) {

    const vechicle = props.props;

    return(
        <Popup>
            <h1>{vechicle.type} {vechicle.sideNumber}</h1>
            <p>Color: {vechicle.color}</p>
            <p>Number plates: {vechicle.platesNumber}</p>
            <p>Range: {vechicle.rangeKm}km</p>
            <p>Vechicle status: {vechicle.status}</p>
        </Popup>
    )

}

export default VechicleMarkerPopup; 