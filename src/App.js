import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Routes from "./Routes";
import { Auth } from 'aws-amplify'; //To verify detail for keeping score(not fully functional)
import './App.css';
import logo from './snake.svg';

// eslint-disable-next-line
const log = data => console.log(JSON.stringify(data, null, 2));
// eslint-disable-next-line
const lg = data => console.log(JSON.stringify(data));

class App extends Component {

  constructor(props) {
    super(props);
    /********Had the game save the progress on session storage to keep track of scores(using user login data)***********
     [not fully function--authentication doesnt affect the game]*/
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e === 'Starting game') {
        alert(e);
      }
    }

    this.setState({
      isAuthenticating: false
    });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div>
        <nav className="navBar">
          <nav className="wrapper">
            <div className="logo">
              <Link to="/"><img src={logo} alt="Snake" /></Link>
              <div>
                <h2 className='newpoint'>Snake, the dot Eater</h2>
              </div>
            </div>
          </nav>
        </nav>
        <div className='dropdown'>
          <button> Rules</button>
            <div className="dropdown-content">
              <p>
                 1.Eat the point to increase your score. {<br/>} 
                 2.Use arrow keys to direct your snake   {<br/>} 
                 3.Dont bumb into the walls  {<br/>}
                 4. You are the blue snake  {<br/>}
                 5. You have to eat the Red points to grow
              </p>
            </div>
        </div>
        <div>
          <button class="restart" onClick= {()=> window.location.reload()}>Restart Game</button>
        </div>
        <Routes childProps={childProps} />

      </div>

    )
  }
}

export default withRouter(App);
