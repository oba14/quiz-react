import React from 'react'
import {NavLink} from 'react-router-dom'


const LandingPage = () => {
    return (
        <div className="Landing">
            <h1>WELCOME </h1>
            <h3>Quiz App made with React and Redux</h3>
            <button className='btn'><NavLink to= '/quiz'>Quiz</NavLink> </ button>
        </div>
    );
}
export default LandingPage