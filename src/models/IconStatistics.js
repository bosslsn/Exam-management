import {getLconData,getChartData,getCurriculumUsre} from '@/api/index.js';
export default {
  namespace: 'lcon',
  state: {
    CurriculumList:[]
  },
  effects: {
    // 总揽数量统计
    * getLconData(action, { call, put }) {
      let result = yield call(getLconData);
      // console.log(result);
    },
    // 图表数据
    *getChartData(action, { call, put }){
      let result = yield call(getChartData);
      // console.log(result);
    },
    // 获取课程名
    *getCurriculumUsre(action, { call, put }){
      let result = yield call(getCurriculumUsre);
      if(result.code===1){
        localStorage.setItem('CurriculumList',JSON.stringify(result.data))
        // yield put({ type: 'changeState', CurriculumList:result.data});
      }
    },
  },
  reducers: {
    changeState(state, action) {
      return {
        ...state,...action
      }
    }
  }
}
