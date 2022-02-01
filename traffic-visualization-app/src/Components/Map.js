import react,{useEffect, useContext} from "react";
import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { VechicleArrayContext} from "./Context/VechicleArrayContext";
import VechicleMarkerPopup from "./VechicleMarkerPopup";

  

function Map() {
    
    const [vechicleArrayContext,setVechicleArrayContext] = useContext(VechicleArrayContext);

    async function fetchVechiclesFromApi() {
        const responsePromise = await fetch('https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE');
        const responseData = await responsePromise.json();
    
        const fetchedVechiclesArray = responseData.objects;
    
        fetchedVechiclesArray.forEach(item => {
          item.location = [item.location.latitude, item.location.longitude]
        });
    
        setVechicleArrayContext(fetchedVechiclesArray);
    }
    
    useEffect(() => {
        fetchVechiclesFromApi();
    },[]);
    
      
    return(
        <MapContainer center={[45,0]} zoom={4}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup showCoverageOnHover={true} disableClusteringAtZoom={10}>
                {vechicleArrayContext.map((vechicle)=>{
                    return(
                        <Marker key={vechicle.numbersPlate} position={vechicle.location}>
                            <VechicleMarkerPopup props={vechicle}/>
                    </Marker>)
                })}
            </MarkerClusterGroup>
        </MapContainer>
    )
}  

export default Map;
  