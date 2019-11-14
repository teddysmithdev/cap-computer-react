import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './components/Navbar'


export default class App extends Component {
  state = {
    address: '',
    cityState: '',
    insurance: '',
    value: '',
    zpid: '',
    tax: '',
    rent: [],

  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }


  submitHandler = e => {
    e.preventDefault()
    axios
    .get(`/api?address=${this.state.address}&cityState=${this.state.cityState}`)
    .then(data => {
      this.setState({ value: data.data.zestimate, rent: data.data.rentZest, zpid: data.data.zpid })
    }).catch(err => console.log(err))
  
      fetch(`https://www.zillow.com/graphql/?zpid=${this.state.zpid}&operationName=PriceTaxQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query:"query PriceTaxQuery($zpid: ID!) {\n  property(zpid: $zpid) {\n    zpid\n    livingArea\n    countyFIPS\n    parcelId\n    taxHistory {\n      time\n      taxPaid\n      taxIncreaseRate\n      value\n      valueIncreaseRate\n    }\n    priceHistory {\n      time\n      price\n      priceChangeRate\n      event\n      source\n      buyerAgent {\n        photo {\n          url\n        }\n        profileUrl\n        name\n      }\n      sellerAgent {\n        photo {\n          url\n        }\n        profileUrl\n        name\n      }\n      showCountyLink\n      postingIsRental\n    }\n    currency\n    country\n  }\n}\n","operationName":"PriceTaxQuery","variables":{"zpid":54293120},"clientVersion":"home-details/5.47.0.166.master.e87315b"}),
        })
        .then(res => res.json())
        .then(res => this.setState({tax: res.data.property.taxHistory[0].taxPaid}));
      }     

 
  render() { 
    const { address, cityState, insurance } = this.state;
    const NOI = (this.state.rent*12)-(this.state.tax)-(this.state.insurance)
    const CAP = this.state.value / NOI
    return (
      <div>
      <Navbar />
      <div classname="overlay"></div>
      <div className="container">
      <br/>
      <p class="card-panel grey lighten-5">Instructions: Fill out the 3 forms below and CapComputer will give you a estimate of a properties potential return. This is similar to a "Zestimate" and should not be relied on for due diligence.
      </p>  
      <form onSubmit={this.submitHandler}>
        <div class="finput-field col s6">
        <label for="exampleInputEmail1"><h4>Address</h4></label>
            <input
              type="text"
              placeholder="321 Main St"
              name="address"
              value={address}
              onChange={this.onChange}
              class="form-control"
            />
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1"><h4>City & State</h4></label>
            <input
              type="text"
              name="cityState"
              placeholder="Dallax TX"
              value={cityState}
              onChange={this.onChange}
              class="form-control"
            />
          </div>
          <div class="form-group">
          <label for="exampleInputPassword1"><h4>Insurance, CAPEX, & expenses</h4></label>
            <input
              type="text"
              name="insurance"
              placeholder="1000"
              value={insurance}
              onChange={this.onChange}
              class="form-control"
            />
            <span class="helper-text" data-error="wrong" data-success="right">Please Note: Insurance varies greatly. Please call an agent if unsure. </span>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
          <br/>
          <br/>
          <p className='blue lighten-5'>Approximate Value: {this.state.value}</p>
          <p className='blue lighten-5'>Rent: {this.state.rent}</p>
          <p className='blue lighten-5'>Taxes: {this.state.tax}</p>
          <h5 className="red lighten-5">Estimate Yearly NOI: {NOI}</h5>
          <h5 className="red lighten-5">Estimated CAP Rate: {CAP}</h5>
          </div>
      </div>
    )
  }
}
