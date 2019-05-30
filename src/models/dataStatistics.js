import { getLconData, getTableData } from '@/api/index.js'

export default {
  namespace: 'dataStatistics',
  state: {
    getLconDataList: [],
    getTableDataList: []
  },
  effects: {
    * getLconData (actions, {put, call}) {
      let result = yield call(getLconData)
      console.log(result)
    },
    * getTableData (actions, {put, call}) {
      let result = yield call(getTableData)
      console.log(result)
    }
  },
  reducers: {

  }
}