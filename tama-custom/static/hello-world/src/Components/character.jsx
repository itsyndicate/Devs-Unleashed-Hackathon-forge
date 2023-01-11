import '../css/character.css';

export const Character = ({bodyImg1, legsImg1, armsImg1}) => {
    return (
        <div className="container">
            <div className="character-face">
            </div>
            <div className="character-body">
                <img src={bodyImg1} />
            </div>
            <div className="character-legs">
                <img src={legsImg1}/>

            </div>
            <div className="character-arms">
                <img src={armsImg1}/>

            </div>
        </div>
    );
}