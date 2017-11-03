import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Board1 from './board1';

class Home extends Component {

  render() {
    return (
      <div className='layout'>
        <div className='layout__nav'>
          <div className='home'>
            <Link to='/sign-in'>sign-in</Link>
            <Link to='/about'>about</Link>
          </div>
        </div>
        <div className='layout__main'>
          <Board1/>
        </div>
        <div className='layout__footer'>

        </div>
      </div>
    )
  }
}

export default Home;
