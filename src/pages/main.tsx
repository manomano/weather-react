import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import cities from '../data/cities.json';
import Game from '../components/Game';
import Next from '../components/Next';
import { TemperaturUnits, GameRecord } from '../store/types';
import { saveGame } from '../store/actions/gameAction';
import { Link  } from 'react-router-dom';

const MainPage: FC = () => {

    const dispatch = useDispatch();
    const unit = useSelector((state: RootState) => state.game.unit);
    const  FromKelvin = (destUnit: TemperaturUnits, temperature: number): number => {

        const celsius = Number((temperature - 273.15).toFixed(2));
        return celsius;

    };
    const selectRandomCityPair = (): GameRecord => {
        const max = cities.length - 1;
        const leftIndex = Math.floor(Math.random() * (max - 1)) + 1;
        let rightIndex = Math.floor(Math.random() * (max - 1)) + 1;
        if (rightIndex === leftIndex) {
            rightIndex = rightIndex === max ? rightIndex -= 1 : rightIndex += 1;
        }
        return {left: cities[leftIndex], right: cities[rightIndex], isWon: false};
    };

    const fetchWeather = async(selectedSide: string): Promise<void> => {
        const ids = [left.id, right.id];
       // const api_key = '0739b5cd43e8e6753170014691a524d9';
        let isError = false;

        let fetches = [];
        try {
            fetches = await Promise.all(
            ids.map((e) =>
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${e}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
              ).then((err) => err.json()),
            ),
          );
        } catch (e) {
            isError = true;
        }

        if (isError) {
            return;
        }

        const d = fetches[0].id === left.id;
        const leftIndex = +(!d);
        const rightIndex = +d;
        const leftTemp = FromKelvin(unit, fetches[leftIndex].main.temp_max);
        const rightTemp =  FromKelvin(unit, fetches[rightIndex].main.temp_max);
        setLeft({
            ...left,
            temperature: leftTemp,
        });

        setRight({
            ...right,
            temperature: rightTemp,
        });

        if (selectedSide === 'left') {
            setScore(leftTemp > rightTemp ? 1 : 0);
        } else {
            setScore(leftTemp < rightTemp ? 1 : 0);
        }

        setGameState(1);
    };

    const selectCityHandler = (selectedSide: string) => {
        if (gameState === 1) {
            return;
        }
        fetchWeather(selectedSide);
    };

    const resumeGame = () => {
        const localPair: GameRecord  = selectRandomCityPair();
        setLeft(localPair.left);
        setRight(localPair.right);
        setScore(0);
        setGameState(0);
    };

    const pair  = selectRandomCityPair();
    const [left, setLeft] = useState(pair.left);
    const [right, setRight] = useState(pair.right);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState(0);

    const data  = { left, right, gameState, unit};
    const resultTitle = score === 0 ? 'You LOST!' : 'You WON!';

    useEffect(() => {
        if (gameState === 1) {
            dispatch(saveGame({left, right, isWon: (!!score)}));
        }

    }, [gameState]);
        return (
            <div>
                <div className="block">
                    <Link to="/settings"><button className="button-standard">Settings</button></Link>
                </div>
                <div className="block-standard" style={{ height: '6rem'}}>
                    {gameState === 0 ? <h1 className="title" style={{width: 'auto'}}>Which city is hotter?</h1> : null}
                    {gameState === 1 ? <div className="title"> {resultTitle}</div> : null }
                    <div className="score"> Score: {score}</div>
                </div>

                <div className="block">
                    <Game  data={data} onSelectCity={ selectCityHandler} />
                </div>
                <div className="block-standard flex-center" style={{ height: '5rem', marginTop: '14%', marginLeft: 0}}>
                    <Next isVisible={gameState === 1} onNext={resumeGame}/>
                </div>
            </div>
            );
};

export default MainPage;
