import React, { Component } from 'react';

import Styles from '../../../scss/views/home';

import SfoMap from '../../components/SfoMap';


export default class extends Component {

  render() {
    return (
      <div>
        <div>
          <SfoMap />
        </div>
      </div>
    )
  }

}
