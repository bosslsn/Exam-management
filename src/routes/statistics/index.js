import React, { Component } from 'react'
import {connect} from 'dva';
import Header from './tableHeader';
import Subject from './subject';
import LineGraph from './LineGraph';
import './style.less';

@connect(state => {
  let { getLconDataList } = state.dataStatistics
  let { getTableDataList } = state.dataStatistics
  return {
    getLconDataList,
    getTableDataList
  }
})

class Statistics extends Component {
  componentDidMount(){
    // this.props.dispatch({
    //   type:'lcon/getLconData'
    // })
    // this.props.dispatch({
    //   type:'lcon/getChartData'
    // })
  }
  render(){
    return <div className="Chart">
      <Header/>
      <div className="Subject-data">
        <Subject/>
        <Subject/>
      </div>
      <LineGraph/>
    </div>
  }
}

const mapState=store=>{
  return {
    ...store.lcon
  }
}

export default connect(mapState)(Statistics);
