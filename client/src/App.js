import React, { Component } from 'react'
import axios from 'axios';
import "./App.css"
import Navbar from './components/Navbar'
import Calculations from './components/Calculations'
import HomeDetails from './components/HomeDetails'
import Footer from './components/Footer'


export default class App extends Component {
  state = {
    address: '',
    cityState: '',
    insurance: '',
    value: '',
    zpid: '',
    tax: '',
    lat: '',
    long: '',
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
      this.setState({ 
        value: data.data.zestimate, 
        rent: data.data.rentZest, 
        zpid: data.data.zpid,
        family: data.data.family,
        bedrooms: data.data.bedrooms,
        bathrooms: data.data.bathrooms,
        sqft: data.data.sqft,
        lat: data.data.lat,
        long: data.data.long
       })
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
    const { rent, value, tax, address, cityState, insurance, family, bedrooms, bathrooms, sqft } = this.state;
    return (
      <div>
      <Navbar />
      <div className="hero mb-3">
        <br/>
      <div className="container mt-3">
        <div className="card">
        <p className="card-header">
        Instructions: Fill out the 3 forms below and CapComputer will give you a estimate of a properties potential return. This is similar to a "Zestimate" and should not be relied on for due diligence.
      </p>  
      </div>
      <form onSubmit={this.submitHandler}>
        <div class="input-group mt-2">
        <span class="input-group-text" id="basic-addon1">Address</span>
            <input
              type="text"
              placeholder='321 Main St 113'
              name="address"
              value={address}
              onChange={this.onChange}
              class="form-control"
              
            />
        </div>
        <div class="input-group mt-2">
        <span class="input-group-text" id="basic-addon1">Location</span>
            <input
              type="text"
              name="cityState"
              placeholder="Dallax TX (State Optional)"
              value={cityState}
              onChange={this.onChange}
              class="form-control"
            />
          </div>
          <div class="input-group mt-2">
          <span class="input-group-text" id="basic-addon1">Insurance & CAPEX</span>
            <input
              type="text"
              name="insurance"
              placeholder="1000"
              value={insurance}
              onChange={this.onChange}
              class="form-control"
            />
             {/* <div className="card">
        <p className="card-body">
        Instructions: Fill out the 3 forms below and CapComputer will give you a estimate of a properties potential return. This is similar to a "Zestimate" and should not be relied on for due diligence.
      </p>  
      </div> */}
            </div>
            <br/>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
          </form>
        </div>
        </div>
      <HomeDetails family={family} bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} />
      <Calculations rent={rent} tax={tax} insurance={insurance} value={value}/>
      <Footer />
      
      </div>
    )
  }
}
