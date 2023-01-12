import React from 'react';
import enemyIcon from '../../images/enemyIcon.png'
const EnemyHealth = (props) => {
    return (
        <div>
            <div className="enemy_container">
                <div className='enemy_icon'>
                    <img src={enemyIcon} alt=""/>
                </div>
                <div className='enemy'>
                    <div className='enemyHealth'></div>
                    <div className='enemyBack' id='enemyHealth'></div>
                </div>
            </div>
            <p className='enemyName en'>{props.enemyName}</p>
        </div>
    );
};

export default EnemyHealth;