import React from 'react'

const Calculations = (props) => {
    const NOI = (props.rent*12)-((props.tax)-(props.insurance))
    const CAP = props.value / NOI
    return (
        <div className="container">
        <p className='blue lighten-5'>Approximate Value: ${props.value}</p>
          <p className='blue lighten-5'>Rent: ${props.rent}</p>
          <p className='blue lighten-5'>Taxes: ${props.tax}</p>
          <h5 className="red lighten-5">Estimate Yearly NOI: ${NOI.toFixed(2)}</h5>
          <h5 className="red lighten-5">Best Case CAP Rate: %{CAP.toFixed(2)}</h5>
        </div>
    )
}


export default Calculations;
