import React, { FC,useState, FormEvent }from 'react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import { TemperaturUnits} from '../store/types';
import { setUnit } from '../store/actions/gameAction';
import {convertTemperature} from './utils';


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
        <div>    
            <Link to="/">
                <button className="button is-large">Back</button>
            </Link>
        </div>

        <div>
            <div className="title">Settings</div>  
            <div className="title">Units</div>
          <div>
            <label>Celsius</label>
            <input type="radio" name="unit" id="celsius" value={TemperaturUnits.Celsius} checked={unit===TemperaturUnits.Celsius}  onChange={changeHandler} />
          </div>
          <div>
          <label>farenheit</label>
            <input type="radio" name="unit" value={TemperaturUnits.Ferenheit} id="farenheit" checked={unit===TemperaturUnits.Ferenheit} onChange={changeHandler} />
          </div>
       </div>
       <div className="title">History</div> 
       {
           history.map(row=>{
            <div className="column">
                <div>{row.left.city}</div>
                <div>{row.left.countryName}</div>
                <div>{convertTemperature(unit, row.left.temparature)}</div>
            </div>
           })
       }
    </div>)
}