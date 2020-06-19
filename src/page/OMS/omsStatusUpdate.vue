<template>
  <div>
    <search-box
    :list-query="listquery"
    :search-options="searchOptions"
    :orderUpdate="orderStatusUpdate"
    />
  </div>
    
</template>
<script>
import SearchBox from '../../components/searchBox'
import {orderStatusUpdate} from '../../api/order'
export default {
  name: 'OmsTaskStatusUpdate',
  components: {
    SearchBox
  },
  data(){
    return {
      searchOptions:[
        {
          label: '主键值:',
          rules: [
          {
          required: true,
          message: "请输入主键值",
          trigger: "blur"
          }],
          prop: 'id',type: 'id',name: 'id',
          placeholder: '请输入主键值',
          proptype: 'input'
        },
        {
          label: 'OMS订单号:',
          rules: [
          {
          required: true,
          message: "请输入订单号",
          trigger: "blur"
          }],
          prop: 'orderNo',type: 'orderNo',name: 'orderNo',
          placeholder: '请输入订单号',
          proptype: 'input'
        },
        {
          label: '任务状态:',
          rules: [
          {
          required: true,
          message: "请输入任务状态",
          trigger: "blur"
          }],
          prop: 'processStatus',type: 'processStatus',name: 'processStatus',
          placeholder: '请输入任务状态',
          proptype: 'input'
        },
        {
          label: '任务失败次数:',
          rules: [
          {
          required: true,
          message: "请输入任务失败次数",
          trigger: "blur"
          }],
          prop: 'failCount',type: 'failCount',name: 'failCount',
          placeholder: '请输入任务失败次数',
          proptype: 'input'
        },
        {
          label: '任务下次触发时间:',
          rules: '',
          prop: '',type: '',name: 'nextExecuteTime',
          proptype: 'date'
        }
      ],
      listquery: {
        id: '', //主键值
        failCount: '', // 任务失败次数
        nextExecuteTime: null, // 任务下次触发时间
        processStatus: '', // 任务状态
        orderNo: '', //订单号
      },
      orderStatusUpdate: orderStatusUpdate
    }
  },
}
</script>
