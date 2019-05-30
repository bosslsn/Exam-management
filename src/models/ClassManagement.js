import {
  getClassManagement,
  getAddClass,getRemoveClass,
  getClassRoomManage,
  getCurriculumUsre,
  getModifyClass
} from '@/api/index.js';
import {message} from 'antd';

export default {
  namespace: 'class',
  state: {
    classData:[],//默认显示数据
    classList:[],//班级号
    CurriculumList:[]//教室号
  },
  effects: {
    // 班级管理（获取已经分配教室的班级的接口）
    *getClassManagement(action, { call, put }){
      let result = yield call(getClassManagement);
      if(result.code===1){
        yield put({ type: 'changeState', classData:result.data});
      }
    },
    // 添加班级
    *getAddClass(action, { call, put }){
      let result = yield call(getAddClass,action.body);
      if(result.code===1){
        yield put({ type: 'changeState', classData:result.data});
        message.success('创建班级成功')
        let mmm = yield call(getClassManagement);
        yield put({ type: 'changeState', classData:mmm.data});
      }else{
        message.success('创建班级成功')
      }
    },
    // 删除班级
    *getRemoveClass(action, { call, put }){
      let result = yield call(getRemoveClass,action);
      if(result.code===1){
        yield put({ type: 'changeState', classData:result.data});
        message.success(result.msg)
        let mmm = yield call(getClassManagement);
        yield put({ type: 'changeState', classData:mmm.data});
      }else{
        message.success(result.msg)
      }
    },
    // 获取教室号
    *getClassRoomManage(action, { call, put }){
      let result = yield call(getClassRoomManage);
      if(result.code===1){
        yield put({ type: 'changeState', classList:result.data});
      }
    },
    // 获取课程名
    *getCurriculumUsre(action, { call, put }){
      let result = yield call(getCurriculumUsre);
      if(result.code===1){
        yield put({ type: 'changeState', CurriculumList:result.data});
      }
    },
    // 修改班级
    *getModifyClass(action, { call, put }){
      let result = yield call(getModifyClass,action.body);
      if(result.code===1){
        message.success(result.msg)
        let mmm = yield call(getClassManagement);
        yield put({ type: 'changeState', classData:mmm.data});
      }
    }
  },
  reducers: {
    changeState(state,action) {
      return {
        ...state,...action
      }
    }
  }
}
