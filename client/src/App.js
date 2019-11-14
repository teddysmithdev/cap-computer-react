import React, { Component } from 'react'
import axios from 'axios';


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
      <div classname="overlay"></div>
      <div className="container">
      <form onSubmit={this.submitHandler}>
        <div class="form-group mt-3">
        <label for="exampleInputEmail1"><h4>Address</h4></label>
            <input
              type="text"
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
              value={cityState}
              onChange={this.onChange}
              class="form-control"
            />
          </div>
          <div class="form-group">
          <label for="exampleInputPassword1"><h4>Insurance</h4></label>
            <input
              type="text"
              name="insurance"
              value={insurance}
              onChange={this.onChange}
              class="form-control"
            />
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
          <h3>Approximate Value: {this.state.value}</h3>
          <h3>Rent: {this.state.rent}</h3>
          <h3>Taxes: {this.state.tax}</h3>
          <h5>Estimate Yearly NOI: {NOI}</h5>
          <h5>Estimated CAP Rate: {CAP}</h5>
          </div>
      </div>
    )
  }
}
