import React from 'react';
import {
    PushSpinner, TraceSpinner, RainbowSpinner,
    RingSpinner, SwishSpinner, PongSpinner,
    MetroSpinner, JellyfishSpinner
}
from "react-spinners-kit";
import '../style/Loader.css';

const Loader = () => {

return (

    <div className="spinnerContainer">

        {/*<div className="spinner">
            <PushSpinner size={30} color="#00ff89"
                loading={loading} />
        </div>
        <div className="spinner">
            <TraceSpinner size={40} frontColor="green"
                backColor="white" loading={loading} />
        </div>

        <div className="spinner">

            <RainbowSpinner size={50} color="purple"
                loading={loading} />
        </div>
        <div className="spinner">
            <RingSpinner size={50} color="yellow"
                loading={loading} />
        </div>
        <div className="spinner">
            <SwishSpinner size={40} frontColor="blue"
                backColor="white" loading={loading} />
        </div>
        <div className="spinner">
            <PongSpinner size={60} color="pink"
                loading={loading} />
        </div>*/}
        <div className="spinner">
            <MetroSpinner size={40} color="black" />
        </div>
        {/*<div className="spinner">
            <JellyfishSpinner size={40} color="grey"
                loading={loading} />
        </div>*/}
    </div>
    );
};

export default Loader;