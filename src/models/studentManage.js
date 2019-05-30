import {getClassRoomManage,getStudentsManage,getStudentdsDelete,gerStudentSearch} from "@/api/index"
import {message} from 'antd'
export default {
  namespace:"studentsManage",
  state:{
    getStudentsManageList:[],
    successStutend:[]
  },
  reducers:{
    changeUpdataState(state,action){
      return {
        ...state,...action
      }
    }
  },
  effects:{
    //默认的教室号全部
    * getClassRoomManage ({payload},{call,put}){
      let request=yield call(getClassRoomManage);
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          getClassRoomManage:request.data
        })
      }    
    },
    //学生管理
    * getStudentsManage ({payload},{call,put}){
      let request=yield call(getStudentsManage);
      console.log(request,'reqaa')
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          getStudentsManageList:request.data
        })
      }    
    },
    //删除学生
    * getStudentdsDelete(action,{call,put}){
      let request=yield call(getStudentdsDelete,action.body);
      if(request.code===1){
        yield put({
          type:'changeUpdataState'
        })
        message.success('删除成功')
      }else{
        message.error('删除失败')
      }  
    },
    * gerStudentSearch(action,{call,put}){
      let request=yield call(gerStudentSearch,action.body);
      console.log('action.body',action.body)
      console.log(request,'eee')
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          successStutend:request.data
        })
        message.success('查询成功')
      }else{
        message.error('查询失败')
      }  
    }
  }
}

