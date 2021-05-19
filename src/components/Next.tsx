import React, { FC } from 'react';

interface nextData {
    isVisible: boolean;
    onNext:() => void;
}


const Next: FC<nextData> = ({ isVisible, onNext }) => {
    if (isVisible){
        return (<button className="button is-medium" onClick={onNext}>Next cities</button>);
    }
    return (<div></div>);    
}


export default Next;