import React, { Component } from 'react'
import styles from './style.less'
import {connect} from 'dva'
import { Card, Tabs } from 'antd'
import CardForm from './components/CardFrom/index.js'

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

@connect(state => {
  return {
    ...state.addUser
  }
})
class AddUsers extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'addUser/getUserStatus'
    })
    this.props.dispatch({
      type: 'addUser/getNowShow'
    })
    this.props.dispatch({
      type: 'addUser/getApiAuthority'
    })
    this.props.dispatch({
      type: 'addUser/getAllUser'
    })
  }
  render(){
    let {userStatus, nowShow, apiAuthority, allUser} = this.props;
    let userStatusData = [], nowShowData = [], apiAuthorityData = [], allUsers = []
    allUser.forEach(item => {
      allUsers.push({
        keys: item.user_id,
        seleName: item.user_name
      })
    })
    userStatus.forEach(item => {
      userStatusData.push({
        keys: item.identity_id,
        seleName: item.identity_text
      })
    })
    nowShow.forEach(item => {
      nowShowData.push({
        keys: JSON.stringify({view_authority_text: item.view_authority_text, view_id:item.view_authority_id}),
        seleName: item.view_authority_text
      })
    })
    apiAuthority.forEach(item => {
      apiAuthorityData.push({
        keys: item.api_authority_id,
        seleName: item.api_authority_text
      })
    })
    let useData = [
      {
        tab: ['添加用户', '更新用户'],
        Froms: [
          {
            input: [{
              place: '请输入用户名',
              type: 'text',
              keys: 'userName'
            },{
              place: '请输入密码',
              type: 'text',
              keys: 'userPass'
            }],
            seled: [
              {
                place: '请选择身份id',
                childrens: userStatusData,
                keys: 'userStatus'
              }
            ]
          },
          {
            seled: [
              {
                place: '请选择身份id',
                childrens: allUsers,
                keys: 'allUsers'
              },
              {
                place: '请选择身份id',
                childrens: userStatusData,
                keys: 'userStatus'
              }
            ],
            input: [{
              place: '请输入用户名',
              type: 'text',
              keys: 'userName'
            },{
              place: '请输入密码',
              type: 'text',
              keys: 'userPass'
            }]
          }
        ]
      },
      {
        tab: ['添加身份'],
        Froms: [
          {
            input: [{
              place: '请输入身份名称',
              type: 'text',
              keys: 'adduser'
            }]
          }
        ]
      },
      {
        tab: ['添加api接口权限'],
        Froms: [
          {
            input: [{
              place: '请输入api接口权限名称',
              type: 'text',
              keys: 'iptApiName'
            },{
              place: '请输入api接口权限url',
              type: 'text',
              keys: 'iptApiUrl'
            },{
              place: '请输入api接口权限方法',
              type: 'text',
              keys: 'iptApiFun'
            }]
          }
        ]
      },
      {
        tab: ['添加视图接口权限'],
        Froms: [
          {
            input: [{
              place: '请输入视图名称',
              type: 'text',
              keys: 'viewName'
            },{
              place: '请输入视图id',
              type: 'text',
              keys: 'viewId'
            }]
          }
        ]
      },
      {
        tab: ['给身份设置api权限接口'],
        Froms: [
          {
            seled: [
              {
                place: '请选择身份id',
                childrens: userStatusData,
                keys: 'userId'
              },
              {
                place: '请选择api接口权限',
                childrens: apiAuthorityData,
                keys: 'checkApi'
              }
            ]
          }
        ]
      },
      {
        tab: ['给身份设置视图权限'],
        Froms: [
          {
            seled: [
              {
                place: '请选择身份id',
                childrens: userStatusData,
                keys: 'checkUserId'
              },
              {
                place: '请选择视图权限id',
                childrens: nowShowData,
                keys: 'checkShowId'
              }
            ]
          }
        ]
      }
    ]
    if(userStatus.length > 0) {
      return <div className={styles.addUserBox}>
        {
          useData.map((item, i) => {
            return (<Card key={i} style={{ width: 300 }}>
              <Tabs onChange={callback}>
                {
                  item.tab.map((val, index) => {
                    return (<TabPane tab={val} key={index}>
                      <CardForm key={i} Froms={item.Froms[index]}/>
                    </TabPane>)
                  })
                }
                </Tabs>
            </Card>)
          })
        }
      </div>
    } else {
      return <div>暂无数据</div>
    }
  }
}

export default AddUsers