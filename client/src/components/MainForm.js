import React from 'react'

const MainForm = (props) => {
    return (
      <div className="container">
      <p class="card-panel grey lighten-5">Instructions: Fill out the 3 forms below and CapComputer will give you a estimate of a properties potential return. This is similar to a "Zestimate" and should not be relied on for due diligence.
      </p>  
      <form onSubmit={this.submitHandler}>
        <div class="finput-field col s6">
        <label for="exampleInputEmail1"><h4>Address</h4></label>
            <input
              type="text"
              placeholder='321 Main St 113 (No # For Units)'
              name="address"
              value={props.address}
              onChange={this.onChange}
              class="form-control"
            />
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1"><h4>City & State</h4></label>
            <input
              type="text"
              name="cityState"
              placeholder="Dallax TX (State Optional)"
              value={props.cityState}
              onChange={this.onChange}
              class="form-control"
            />
            
          </div>
          <div class="form-group">
          <label for="exampleInputPassword1"><h4>Annual Insurance, CAPEX, & expenses</h4></label>
            <input
              type="text"
              name="insurance"
              placeholder="1000"
              value={props.insurance}
              onChange={this.onChange}
              class="form-control"
            />
            <span class="helper-text" data-error="wrong" data-success="right">Please Note: Expenses vary greatly. Please call an insurance agent. If in doubt, add on an extra %15.</span>
            </div>
            <br/>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
    )
}


export default MainForm;
