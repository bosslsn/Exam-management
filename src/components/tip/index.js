import React, { Component } from "react";
import "./index.css";
import request from "../../utils/request";
import { Input, Button, Select, message } from "antd";
const Option = Select.Option;
class Tip extends Component {
  state = {
    val_class: "",
    val_room: "",
    val_sub: "",
    sub_list: [],
    room_list: []
  };
  render() {
    return this.props.flag ? (
      <div className="z_tip">
        <div className="mask">
          <p>
            <b>添加班级</b>
          </p>
          <p>班级名:</p>
          <Input
            placeholder="请输入班级名称"
            onChange={e => this.onChange(e)}
          />
          <p style={{ marginTop: "10px" }}>教室号:</p>
          <Select
            showSearch
            style={{ width: 260 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange2}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.room_list.map(item => (
              <Option value={item.room_id} key={item.room_id}>
                {item.room_text}
              </Option>
            ))}
          </Select>
          <p style={{ marginTop: "10px" }}>课程名:</p>
          <Select
            showSearch
            style={{ width: 260 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.sub_list.map(item => (
              <Option value={item.subject_id} key={item.subject_id}>
                {item.subject_text}
              </Option>
            ))}
          </Select>
          <div className="btn">
            <Button block onClick={() => this.props.toggle()}>
              取消
            </Button>
            <Button type="primary" block onClick={this.submit}>
              提交
            </Button>
          </div>
        </div>
      </div>
    ) : null;
  }
  onChange = e => {
    this.setState({
      val_class: e.target.value
    });
  };
  handleChange = value => {
    this.setState({
      val_sub: value
    });
  };
  handleChange2 = value => {
    this.setState({
      val_room: value
    });
  };
  componentDidMount() {
    let that = this;
    request("/exam/subject").then(data => {
      if (data.code === 1) {
        that.setState({
          sub_list: data.data
        });
      }
      
    });
    request("/manger/room").then(data => {
      if (data.code === 1) {
        that.setState({
          room_list: data.data
        });
      }
     
    });
  }
  submit = () => {
    let { val_class, val_room, val_sub } = this.state;
    if (val_class && val_room && val_sub) {
      this.props.toggle({
        val_class,
        val_room,
        val_sub
      });
    } else {
      message.info("请填写完整信息");
    }
  };
}
export default Tip;
