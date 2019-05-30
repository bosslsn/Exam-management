import React, { Component } from 'react'
import {connect} from 'dva';

class Header extends Component {
  render(){
    return <div className="header">
      <ul>
        <li>表头题目</li>
        <li>表头题目</li>
        <li>表头题目</li>
        <li>表头题目</li>
        <li>表头题目</li>
      </ul>
    </div>
  }
}

const mapState=store=>{
  return {
    ...store.lcon
  }
}

export default connect(mapState)(Header);