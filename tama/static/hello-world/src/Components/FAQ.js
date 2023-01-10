import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../css/FAQ.css';
                    // https://blnc.atlassian.net/rest/api/3/issue/TT-1/



const FAQ = ({ toggleFAQ }) => {
    return (
        <div className="card" style={{ width: '50%', height: '50%' }}>
            <div className="cuadro">
            <button onClick={toggleFAQ} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
                <div className='FAQ'>

                </div>
        </div>
        </div>
    );
};

export default FAQ;
