import React, {Component, Fragment} from 'react'
import { Form, Input, Select, Button } from 'antd'
import styles from './style.less'
import {connect} from 'dva'

const Option = Select.Option;


@Form.create()
@connect()
class CardFrom extends Component {
  constructor(props) {
    super(props)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.userName && values.userPass && values.userStatus) {
          this.props.dispatch({
            type: 'addUser/addUser',
            actions: {
              user_name: values.userName,
              user_pwd: values.userPass,
              identity_id: values.userStatus
            }
          })
        } else if(values.adduser) {
          this.props.dispatch({
            type: 'addUser/addIdentity',
            actions: {
              identity_text: values.adduser
            }
          })
        } else if(values.iptApiName && values.iptApiUrl && values.iptApiFun) {
          this.props.dispatch({
            type: 'addUser/addApiInterface',
            actions: {
              api_authority_text: values.iptApiName,
              api_authority_url: values.iptApiUrl,
              api_authority_mehtod: values.iptApiFun
            }
          })
        } else if (values.viewName && values.viewId) {
          this.props.dispatch({
            type: 'addUser/addView',
            actions: {
              view_authority_text: values.viewName,
              view_id: values.viewId
            }
          })
        } else if (values.userId && values.checkApi) {
          this.props.dispatch({
            type: 'addUser/IdentityApi',
            actions: {
              identity_id: values.userId,
              api_authority_id: values.checkApi
            }
          })
        } else if(values.checkUserId && values.checkShowId) {
          this.props.dispatch({
            type: 'addUser/viewIdentity',
            actions: {
              identity_id: values.checkUserId,
              view_authority_id: values.checkShowId
            }
          })
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let FromData = this.props.Froms
    if(!FromData.input) {
      FromData.input = []
    }
    if(!FromData.seled) {
      FromData.seled = []
    }
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          {
            FromData.input.map(item => {
              return (
                <Form.Item key={item.keys}>
                  {getFieldDecorator(item.keys)(
                      <Input placeholder={item.place} type={item.type} />
                  )}
                </Form.Item>
              )
            })
          }
          {
            FromData.seled.map(item => {
              return (
                <Form.Item key={item.keys}>
                  {getFieldDecorator(item.keys)(
                    <Select style={{ width: 120 }} placeholder={item.place}>
                      {
                        item.childrens.map(val => {
                          return <Option key={val.keys} value={val.keys}>{val.seleName}</Option>
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
              )
            })
          }
          <Form.Item>

          </Form.Item>
          <Button  htmlType="submit" className={styles.cardBtn} type="primary">确定</Button>
          <Button>重置</Button>
        </Form>
      </Fragment>
    )
  }
}

export default CardFrom