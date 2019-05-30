import React, { Component } from 'react'
import {connect} from 'dva';
// 引入 ECharts 模块
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

class Subject extends Component {

  componentDidMount(){
    var myChart = echarts.init(this.refs.Subject)
    var option = {
      title : {
        text: '● 题目类型统计',
        "textStyle": {
          "fontSize": 12,
          color:'#555'
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      itemWidth:8,
      itemHeight:8,
      icon:'circle',
      itemGap:0,
      padding:0,
      "textStyle": {
        "fontSize": 8,
        color:'#555'
      },
      x: 'center',
      y:'bottom',
      data:['解答题','代码阅读','代码补全','修改bug','手写代码']
    },
    series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['55%', '50'],
          label: {
            normal: {
//               show: true,
//               position: 'center',
//               formatter:function (argument) {
//                  var html;
//                  html='本月业绩50单';
//                  return html;
//               },
              textStyle: {
              "fontSize": 8,
              }
            }
          },
          data:[
            {value:335, name:'解答题'},
            {value:310, name:'代码阅读'},
            {value:234, name:'代码补全'},
            {value:135, name:'修改bug'},
            {value:1548, name:'手写代码'}
          ],
        }
      ]
    };
    myChart.setOption(option);
  }

  render(){
    return <div ref="Subject" className="Subject" style={{ width: 400, height: 220, marginTop:20 }}></div>
  }
}

const mapState=store=>{
  return {
    ...store.lcon
  }
}

export default connect(mapState)(Subject);