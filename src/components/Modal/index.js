import React, { Component } from 'react'
import { Modal,Button,Form,Input,Select} from 'antd';
import {connect} from 'dva';

const Option = Select.Option;

class Modals extends Component {

  state = {visible: false}

  showModal=()=>{
    this.setState({visible: true})
  }

  handleCancel = (e) => {
    this.setState({visible: false});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.props.text){//修改班级
      this.props.form.validateFields((err, values) => {
        let classId=this.props.text.grade_id;
        if (!err) {
          this.props.dispatch({type:'class/getModifyClass', body: {
            'grade_name': values.class,
            'room_id': values.Classroom,
            'subject_id':values.curriculum,
            'grade_id':classId
          }})
          this.setState({visible: false});
        }
      });
    }else{//天骄班级
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.dispatch({type:'class/getAddClass', body: {
            'grade_name': values.class,
            'room_id': values.Classroom,
            'subject_id':values.curriculum
          }})
          this.setState({visible: false});
        }
      });
    }
    
  }
  
  componentDidMount(){
    this.props.dispatch({
      type:'class/getClassRoomManage'
    })
    this.props.dispatch({
      type:'class/getCurriculumUsre'
    })
  }

  render(){
    let { getFieldDecorator } = this.props.form;
    let {classList,CurriculumList,data,text}=this.props;
    return <div>
        <Button type="primary" style={data.style} onClick={this.showModal}>{data.btn}</Button>
        <Modal
          title={data.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              提交
            </Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('class', {
                rules: [{ required: true, message: '请输入班级号' }],
              })(
                <Input placeholder={text?text.grade_name:'请输入班级号'} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('Classroom', {
                rules: [{ required: true, message: '请输入教室号' }],
              })(
                <Select
                  size="default"
                >
                  {
                    classList.map(item=>{
                      return <Option key={item.room_id}>{item.room_text}</Option>
                    })
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('curriculum', {
                rules: [{ required: true, message: '请输入课程名' }],
              })(
                <Select
                  size="default"
                >
                  {
                    CurriculumList.map(item=>{
                      return <Option key={item.subject_id}>{item.subject_text}</Option>
                    })
                  }
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
    </div>
  }
}

const mapState=store=>{
  return {
    ...store.class
  }
}

export default connect(mapState)(Form.create()(Modals));