import react,{useEffect, useContext} from "react";
import {MapContainer,Marker,TileLayer} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { VechicleArrayContext} from "./Context/VechicleArrayContext";
import VechicleMarkerPopup from "./VechicleMarkerPopup";
import { DisplayedVechiclesContext } from "./Context/DisplayedVechiclesContext";
import L from "leaflet";




function Map() {
    
    const avaliableIcon = new L.Icon({
        iconUrl: require('../Resources/avaliable.png'),
        iconSize: new L.Point(40, 40)
    });
      
    
    const unavaliableIcon = new L.Icon({
        iconUrl: require('../Resources/unavaliable.png')
    });
    

    const [vechicleArrayContext,setVechicleArrayContext] = useContext(VechicleArrayContext);
    const [displayedVechiclesContext, setDisplayedVechiclesContext] = useContext(DisplayedVechiclesContext);

    async function fetchVechiclesFromApi() {
        //Removed link to test environment from fetch command
        const responsePromise = await fetch('LINK TO TEST ENV');
        const responseData = await responsePromise.json();
    
        const fetchedVechiclesArray = responseData.objects;
    
        fetchedVechiclesArray.forEach(item => {
          item.location = [item.location.latitude, item.location.longitude]
          const availability = item.status;
          switch(availability) {
              case 'AVAILABLE':
                    item.icon = avaliableIcon
                    break;
                case !'AVAILABLE':
                    item.icon = unavaliableIcon
                    break;  
          }
        });
    
        setVechicleArrayContext(fetchedVechiclesArray);
        setDisplayedVechiclesContext(fetchedVechiclesArray);
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
            <MarkerClusterGroup showCoverageOnHover={true} disableClusteringAtZoom={16}>
                {displayedVechiclesContext.map((vechicle)=>{
                    return(
                        <Marker key={vechicle.id} position={vechicle.location}  icon={vechicle.icon} >
                            <VechicleMarkerPopup props={vechicle}/>
                        </Marker>)
                })}
            </MarkerClusterGroup>
        </MapContainer>
    )
}  

export default Map;
  