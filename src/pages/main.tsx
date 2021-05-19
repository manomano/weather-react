import React, { FC,useState } from "react";
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';


import cities from '../data/cities.json';
import Game from '../components/Game';
import Next from '../components/Next';
import { City,TemperaturUnits, GameRecord } from '../store/types';
import { saveGame } from '../store/actions/gameAction';



interface mainPageState {
    left: City;
    right: City;
    score: number;
    gameState: number;

}


const MainPage: FC = () => {

    //const dispatch = useDispatch();
    const unit = useSelector((state: RootState) => state.game.unit);
    const  FromKelvin = (destUnit:TemperaturUnits, temperature: number): number =>{
        //const fahrenheit = (temperature * 1.8 - 459.67).toFixed(2);
        const celsius = Number((temperature - 273.15).toFixed(2));
        return celsius;
        //return destUnit==TemperaturUnits.Celsius?celsius:fahrenheit;
    }
    const selectRandomCityPair = ():GameRecord => {
        const max = cities.length - 1;
        const left = Math.floor(Math.random() * (max - 1)) + 1;
        let right = Math.floor(Math.random() * (max - 1)) + 1;
        if(right==left){
            right = right==max? right-= 1:right += 1;
        }
        return {left: cities[left], right: cities[right], isWon:false}
    }

    const fetchWeather = async(selectedSide: string) =>{
        const ids = [left.id, right.id];
        const api_key = '0739b5cd43e8e6753170014691a524d9';
        //process.env.REACT_APP_API_KEY
        const fetches = await Promise.all(
            ids.map((e) =>
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${e}&appid=${api_key}` 
              ).then((e) => e.json())
            )
          );

        const d = fetches[0].id==left.id; 
        const leftIndex = +(!d);
        const rightIndex = +d; 
        const leftTemp = FromKelvin(unit,fetches[leftIndex].main.temp_max);
        const rightTemp =  FromKelvin(unit,fetches[rightIndex].main.temp_max);
        setLeft({
            ...left,
            temperature: leftTemp
        });

        setRight({
            ...left,
            temperature: rightTemp
        });

        
        const selectedTemp = selectedSide==='left'?leftTemp:rightTemp;
        //leftTemp > rightTemp && selectedSide=='left'?true:false
        
        if(selectedSide==='left'){
            setScore(leftTemp > rightTemp?1:0);
        }else{
            setScore(leftTemp < rightTemp?1:0);
        }
        
        setGameState(1);
    }

    const selectCityHandler = (selectedSide:string) =>{
        if(gameState==1){
            return;
        }
        fetchWeather(selectedSide);
    } 

    const resumeGame = () =>{
        let pair  = selectRandomCityPair();
        setLeft(pair.left);
        setRight(pair.right);
        setScore(0);
        setGameState(0);
    }

    let pair  = selectRandomCityPair();
    const [left, setLeft] = useState(pair.left);
    const [right, setRight] = useState(pair.right);
    const [score, setScore] = useState(0);   
    const [gameState, setGameState] = useState(0);
    

    const data  = { left: left, right:right, gameState, unit};
        return (
            <div className="container has-text-left">
                <h1 className="title">Which city is hotter?</h1>
                {gameState===1? <div> your score is: {score}</div>:null }
                {gameState===1? <div> your score is: {score}</div>:null }                
                <Game  data={data} onSelectCity={ selectCityHandler} />
                <Next isVisible={true} onNext={resumeGame}/>
            </div>
            );
}




export default MainPage;