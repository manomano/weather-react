import React, { FC } from 'react';

interface NextData {
    isVisible: boolean;
    onNext: () => void;
}

const Next: FC<NextData> = (props) => {

    if (props.isVisible) {
        return (<button className="button-standard centered" onClick={props.onNext}>Next cities</button>);
    }
    return (<div/>);
};

export default Next;
