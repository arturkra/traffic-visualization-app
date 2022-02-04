import react, { useContext, useState } from "react";
import './OptionsBar.css';
import { DisplayedVechiclesContext } from "./Context/DisplayedVechiclesContext";
import { VechicleArrayContext } from "./Context/VechicleArrayContext";



function OptionsBar() {

    const [vechicleArrayContext,setVechicleArrayContext] = useContext(VechicleArrayContext);
    const [displayedVechiclesContext,setDisplayedVechiclesContext] = useContext(DisplayedVechiclesContext);

    const [minBatteryPercentage, setMinBatteryPrecentage] = useState(1);
    const [isAvailiable, setIsAvailable] = useState(true);

    const minBatPerChangeHandler = (e) => {
        setMinBatteryPrecentage(e.target.value);
    }

    const isAvailableChangeHandler = (e) => {
        setIsAvailable(!isAvailiable);
    }

    function optionsSubmitHandler(e) {
        
        e.preventDefault();

        let filteredArrayOfVechicles = [];

        vechicleArrayContext.forEach(vechicle => {
            if(isAvailiable){
                if(vechicle.batteryLevelPct >= minBatteryPercentage && vechicle.status == 'AVAILABLE'){
                    filteredArrayOfVechicles.push(vechicle);
                }
            }
            else if(vechicle.batteryLevelPct >= minBatteryPercentage){
                filteredArrayOfVechicles.push(vechicle);
            }
            
        });
        setDisplayedVechiclesContext(filteredArrayOfVechicles);
    }

    return(
        <form onSubmit={optionsSubmitHandler}>
            <div className="main-form">
                <h2 className="form-header">Filter the results</h2>
                <div className="is-available">
                    <label>Show only avaliable cars</label><br/>
                    <input className="form-checkbox" type='checkbox' onChange={isAvailableChangeHandler}></input>    
                </div>
                <div className="min-battery-percentage">
                    <label>Minimum battery percantege:</label><br/>
                    <input type='number' min='1' max='100' onChange={minBatPerChangeHandler}></input>
                </div>
                <button className="submit-button" type="submit">Apply Filters</button>
            </div>
        </form>
    );
}

export default OptionsBar;