import React, { Component } from 'react'
import { Table, Button, Input,Form,Select } from 'antd';
import {connect} from 'dva'
const Option = Select.Option;
class StudentManage extends Component {
    constructor(){
        super()
        this.state ={
            list:[],
            newlist:[],
            columns:[{
              title: '姓名',
              dataIndex: 'student_name',
              key: 'student_name'
            },
            {
              title: '学号',
              dataIndex: 'student_id',
              key: 'student_id'
            },
            {
              title: '班级',
              dataIndex: 'grade_name',
              key: 'grade_name'
            },
            {
              title: '教室',
              dataIndex: 'room_text',
              key: 'room_text'
            },
            {
              title: '密码',
              dataIndex: 'student_pwd',
              key: 'student_pwd'
            },{
              title: '操作',
              key: 'action',
              render: (text, record) => <Button onClick={() => {
                this.deleteStudent(record)
              }}>删除</Button>
            }] 
        }
    }
    render(){
      let {getStudentsManageList}=this.props;
      const { getFieldDecorator } = this.props.form;
      let {getClassRoomManage}=this.props;
      console.log(this.props,'aa')
        return <div>
            <div>
               <div style={{margin:'20px 0',display:'flex'}}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('user')(
                      <Input placheolder="输入学生姓名" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('class')(
                      <div>
                        <Select defaultValue="输入教室号" style={{ width: 120 }} >
                          {
                            console.log(getClassRoomManage)
                          }
                        </Select>
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('classroom')(
                      <div>
                        <Select  defaultValue="班级名" style={{ width: 120 }} >
                          <Option value="jack">Jack (100)</Option>
                          <Option value="lucy">Lucy (101)</Option>
                        </Select>
                      </div>
                    )}
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    搜索
                  </Button>
                </Form>

                <Button type="primary" onClick={this.clearStudent}>重置</Button> 
               </div>
                <Table columns={this.state.columns}  dataSource={getStudentsManageList} />
            </div>
        </div>
    }
    componentDidMount(){
        this.getStudents();
        this.handleChangeClass()
    }
    getStudents=()=>{
        this.props.dispatch({
          type:"studentsManage/getStudentsManage",
      }) 
    }
    //删除学生
   deleteStudent = (i) =>{
     this.props.dispatch({
        type:"studentsManage/getStudentdsDelete",
        body:{
          'id': i.student_id
         }
      })
    this.getStudents() 
  }
  clearStudent(){
    console.log('重置')
  }
  //查询更新
  searchStudent = (i) =>{
    this.props.dispatch({
       type:"studentsManage/gerStudentSearch",
       body:{
         'id': i.student_id
        }
     })
 }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChangeClass=()=>{
    this.props.dispatch({
      type:"studentsManage/getClassRoomManage",
    }) 
  }

  // handleChangeClassroom=()=>{
  //   this.props.dispatch({
  //     type:"studentsManage/getClassRoomManage",
  //   }) 
  // }
}

const mapState=store=>{
    return {
      ...store.studentsManage
    }
}
export default connect(mapState)(Form.create()(StudentManage));




