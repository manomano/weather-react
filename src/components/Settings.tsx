import React, { FC,useState, FormEvent }from 'react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Link  } from 'react-router-dom';
import { TemperaturUnits} from '../store/types';
import { setUnit } from '../store/actions/gameAction';
import {convertTemperature} from './utils';
import './style.css';
import { MdDone, MdClose } from "react-icons/md";


export const Settings: FC = () => {
    const unit = useSelector((state: RootState) => state.game.unit);
    const history = useSelector((state: RootState) => state.game.history);
    const dispatch = useDispatch();
    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value == 'Celsius'?TemperaturUnits.Celsius: TemperaturUnits.Ferenheit;
        dispatch(setUnit(val));
    }

   

    return (
    <div>
        <div style={{margin:'0 0 20px 0'}}>    
            <Link to="/">
                <button className="button-standard">Back</button>
            </Link>
        </div>

        <div>
            <div className="title" >Settings</div>  
            <div className="title is-3">Units</div>
          <div>
            <label className="radio">
                <input type="radio" name="unit" id="celsius" value={TemperaturUnits.Celsius} checked={unit===TemperaturUnits.Celsius}  onChange={changeHandler} />
                <span className={unit===TemperaturUnits.Celsius?'active':'notActive'}>&nbsp; &nbsp;Celsius</span>
            </label>
          </div>
          <div>
            <label className="radio">
                <input type="radio" name="unit" value={TemperaturUnits.Ferenheit} id="farenheit" checked={unit===TemperaturUnits.Ferenheit} onChange={changeHandler} />
                <span  className={unit===TemperaturUnits.Ferenheit?'active':'notActive'}>&nbsp; &nbsp;Fahrenheit</span>
           </label>
          </div>
       </div>
       <div className="title">History</div>
       <div >
       {
           history.map((row, ind)=>{
            return (
            <div className="grid-container-settings">  
                <div className="weather-block">
                    <div>{row.left.city},</div>
                    <div>{row.left.countryName}</div>
                    <div>{convertTemperature(unit, row.left.temperature || 0)}</div>
                </div>
                <div className="weather-block">
                    <div>{row.right.city},</div>
                    <div>{row.right.countryName}</div>
                    <div>{convertTemperature(unit, row.right.temperature || 0)}</div>
                </div>
                <div className="icon-container">
                    {row.isWon?<MdDone size={35}/>:<MdClose size={35}/>}
                </div>
            </div>)
           })
       }
       </div> 
    </div>)
}