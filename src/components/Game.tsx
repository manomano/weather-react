import React, { FC } from 'react';
import { City, TemperaturUnits } from '../store/types';
import {convertTemperature} from './utils'




interface CurrentGame {
  data: {
    left: City;
    right: City;  
    gameState: number;
    unit: TemperaturUnits
  } 
  onSelectCity:(par:string) => void;
  }
  
  
  const Game: FC<CurrentGame> = ({ data, onSelectCity }) => {
  
     
    return(
      <div>
        <div className="columns is-multiline">
            <div className="column ">
              <button className="button is-small" onClick={()=>onSelectCity("left")} style={{padding: "15% 0% 15% 0%"}}>
                <div className="column is-narrow">
                  <p className="bd-notification is-primary">{data.left.city},</p>
                  <p className="bd-notification is-primary">{data.left.countryName}</p>                  
                  {data.gameState==1? <p className="bd-notification is-primary">{convertTemperature(data.unit, data.left.temperature || 0)}</p>:null}
                
                </div>
              </button>
            </div>
            <div className="column" >
              <button className="button is-small" onClick={()=>onSelectCity("right")} style={{padding: "15% 0% 15% 0%"}}>
                <div className="column is-narrow">
                <p className="bd-notification is-primary">{data.right.city}</p>
                <p className="bd-notification is-primary">{data.left.countryName}</p>
                  {data.gameState==1? <p className="bd-notification is-primary">{convertTemperature(data.unit, data.right.temperature || 0)}</p>:null}
                </div>
              </button>        
            </div>
        </div> 

     
      </div>
    );
  }
  
  export default Game;