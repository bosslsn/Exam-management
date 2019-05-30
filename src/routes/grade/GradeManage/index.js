
import React, { PureComponent } from 'react'
import { Table,} from 'antd';
import {connect} from 'dva';
import Modal from '@/components/Modal';

const modify={
  btn:"修改 |",
  style:{
    background:"#fff",
    border:0,
    color:'#1890ff',
    height: 'auto',
    padding:0,
    boxShadow:'0 0 0 #fff'
  },
  title:'修改班级'
}

const addClass={
  btn:"+添加班级",
  title:'添加班级',
}

class GradeManage extends PureComponent {

  columns = [{
    title: '班级名',
    dataIndex: 'grade_name',
    key: 'name'
  }, {
    title: '课程名',
    dataIndex: 'subject_text',
    key: 'age',
  }, {
    title: '教室号',
    dataIndex: 'room_text',
    key: 'address',
  }, 
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span style={{display:'flex'}}>
        <Modal data={modify} text={text}/>
        <a href=" javascript:;" onClick={()=>this.del(text)}>&nbsp;删除</a>
      </span>
    ),
  }];

  componentDidMount(){
    this.props.dispatch({
      type:'class/getClassManagement'
    })
  }
  
  del(text){
    this.props.dispatch({
      type:'class/getRemoveClass',
      grade_id:text.grade_id
    })
  }

  render(){
    let {classData}=this.props;
    return <div>
            <div>
              <Modal data={addClass}/>
              <Table columns={this.columns} dataSource={classData} rowKey='grade_id'/>
            </div>
    </div>
  }
}

const mapState=store=>{
  return {
    ...store.class
  }
}

export default connect(mapState)(GradeManage)