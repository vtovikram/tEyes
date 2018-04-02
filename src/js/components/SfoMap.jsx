import React, { Component } from 'react'
import {connect} from 'react-redux';
import arteries from '../../assets/data/arteries.json';
import freeWays from '../../assets/data/freeWays.json';
import neighbourhoods from '../../assets/data/neighborhoods.json';
import streets from '../../assets/data/streets.json';
import { geoMercator, geoPath  } from 'd3-geo';



class SfoMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSize: {width: 0, height: 0},
      arteries: [],
      freeWays: [],
      neighbourhoods: [],
      streets: [],
    }
  }

  componentDidMount() {
    this.handleResize();
    this.setState({arteries: arteries.features});
    this.setState({freeWays: freeWays.features});
    this.setState({neighbourhoods: neighbourhoods.features});
    this.setState({streets: streets.features});

    window.addEventListener("load", this.handleResize.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleResize);
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({
      mapSize: {
        width: this.mapSVG.parentNode.clientWidth,
        height: this.mapSVG.parentNode.clientHeight
      }
    })
  }

  drawMap() {
    const { height, width } = this.state.mapSize;
    const projection = geoMercator()
    .scale(150)
      .fitSize([width, height], arteries);

    const pathGenerator = geoPath().projection(projection);


    this.arteries = this.state.arteries
      .map((d, idx) => {
        return <path
          key={"path" + idx}
          d={pathGenerator(d)}
          fill="#dedede"
          fillOpacity="0.3"
          stroke="blue"
          strokeDasharray="3"
          cursor="pointer"
          className="arteries"/>})

    this.streets = this.state.streets
      .map((d, idx) => {
        return <path
        key={"path" + idx}
        d={pathGenerator(d)}
        fill="#dedede"
        fillOpacity="0.3"
        stroke="black"
        strokeDasharray="3"
        cursor="pointer"
        className="streets"/>})

    this.freeWays = this.state.freeWays
      .map((d, idx) => {
        return <path
          key={"path" + idx}
          d={pathGenerator(d)}
          fill="#dedede"
          fillOpacity="0.3"
          stroke="blue"
          strokeDasharray="3"
          cursor="pointer"
          className="freeWays"/>})

    this.neighbourhoods = this.state.neighbourhoods
      .map((d, idx) => {
        return <path
        key={"path" + idx}
        d={pathGenerator(d)}
        fill="#dedede"
        fillOpacity="0.3"
        stroke="grey"
        strokeDasharray="3"
        cursor="pointer"
        className="neighbourhoods"/>})



  }

  render() {
    this.drawMap();

    return (
      <div className='map'>
          <svg width={ '100vw' } height={ '100vh' } ref={(mapSVG) => this.mapSVG = mapSVG}>
              <g>{this.arteries}{this.streets}{this.freeWays}{this.neighbourhoods}</g>
          </svg>
      </div>
    )
  }
}

export default connect(
    state => ({counter: state.counter}),
    {}
)(SfoMap);
