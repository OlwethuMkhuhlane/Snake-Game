import React, { Component } from 'react';


export default class Login extends Component {

  constructor(props) {
    super(props);
// ****************PArt of Authentication. not fully functional[doesnt affect game]******************
    this.state = {
      email: "mail@gmail.com",
      password: "Password#",
    }
  }


  render() {
    return (
      <div className="form flex-container">
      </div>
    )
  }

}
