import React, { Component } from 'react'
import {connect} from 'dva';

// 引入 ECharts 模块
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

class LineGraph extends Component {
  
  componentDidMount(){
    this.handleData()
    this.echartsChart()
  }

  handleData(){
    this.props.dispatch({//课程名
      type:"lcon/getCurriculumUsre"
    })
  }

  render(){
    
    return <div id="LineGraph" style={{ width: 800, height: 500 ,marginTop:20}}></div>
  }
  //echarts配置函数
  echartsChart(){
    // 柱状底部课程数据
    let CurriculumList = JSON.parse(localStorage.getItem('CurriculumList'))
    let CurriculumListItem=[]
    CurriculumList.map(item=>{
      CurriculumListItem.push(item.subject_text)
    })

    var myChart = echarts.init(document.getElementById('LineGraph'));
    var option = {
      title : {
        text: '● 题目类型统计',
        "textStyle": {
          "fontSize": 12,
          color:'#555'
        },
      },
      color: ['#3398DB'],
      tooltip : {
          trigger: 'axis',
          axisPointer : { 
              type : 'shadow' 
          }
      },
      grid: {//控制图大小
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : CurriculumListItem,
              axisTick: {
                  alignWithLabel: true
              },
              axisLabel:{  //设置字体倾斜
                rotate:-40,
              }
          }
      ],
      yAxis : [
          {
            type: 'value',
            scale: true,
            max: 160,
            min: 0,
            splitLine: {show:false},
            splitNumber:9
          }
      ],
      series : [
          {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 30, 100, 120,10, 52, 60, 100, 20]//柱状数据
          }
      ]
    };
    myChart.setOption(option);
  }
}

const mapState=store=>{
  return {
    ...store.lcon
  }
}

export default connect(mapState)(LineGraph);