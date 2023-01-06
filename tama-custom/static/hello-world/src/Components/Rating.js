import React from 'react'

const charRating = ({ rate, starClicked }) => {
    return (
        <div className="rating">
            {Array.from({ length: 5 }, (star, i) => (
                <span onLoad={() => { starClicked(i + 1) }}>
                    {i < rate ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
};

export default charRating;