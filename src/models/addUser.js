import { 
  getUserStatus,
  getNowShow,
  getApiAuthority,
  getAllUser,
  addUser,
  addIdentity,
  addApiInterface,
  addView,
  IdentityApi,
  viewIdentity
} from '@/api/index.js'
import {message} from 'antd'

export default {
  namespace: 'addUser',
  state: {
    userStatus: [],
    nowShow: [],
    apiAuthority: [],
    allUser: []
  },
  effects: {
    * getUserStatus(action, {call, put}) {
      let result = yield call(getUserStatus)
      yield put({
        type: 'getUserData',
        payload: result.data
      })
    },
    * getNowShow(action, {call, put}) {
      let result = yield call(getNowShow)
      yield put({
        type: 'nowShows',
        payload: result.data
      })
    },
    * getApiAuthority(action, {call, put}) {
      let result = yield call(getApiAuthority)
      yield put({
        type: 'apiAuthoritys',
        payload: result.data
      })
    },
    * getAllUser(action, {call, put}) {
      let result = yield call(getAllUser)
      yield put({
        type: 'getAllUsers',
        payload: result.data
      })
    },
    * addUser(action, {call, put}) {
      let result = yield call(addUser, action.actions)
      if(result.code === 1) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    * addIdentity(action, {call, put}) {
      let result = yield call(addIdentity, action.actions)
      if(result.code === 1) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    * addApiInterface(action, {call, put}) {
      let result = yield call(addApiInterface, action.actions)
      if(result.code === 1) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    * addView(action, {call, put}) {
      let result = yield call(addView, action.actions)
      if(result.code === 1) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    * IdentityApi(action, {call, put}) {
      let result = yield call(IdentityApi, action.actions)
      if(result.code === 1) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    * viewIdentity(action, {call, put}) {
      let result = yield call(viewIdentity, action.actions)
      if(result.code === 1) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    }
  },
  reducers: {
    getUserData(state, {payload}) {
      return {
        ...state,
        userStatus: payload
      }
    },
    nowShows(state, {payload}) {
      return {
        ...state,
        nowShow: payload
      }
    },
    apiAuthoritys(state, {payload}) {
      return {
        ...state,
        apiAuthority: payload
      }
    },
    getAllUsers(state, {payload}) {
      return {
        ...state,
        allUser: payload
      }
    }
  }
}