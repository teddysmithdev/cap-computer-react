import React from 'react'

const HomeDetails = (props) => {
    return (
        <div className="container">
            <p>Family: {props.family}</p>
            <p>Bedrooms: {props.bedrooms}</p>
            <p>Bathrooms: {props.bathrooms}</p>
            <p>Sqft: {props.sqft}</p>
        </div>
    )
}


export default HomeDetails
