<template>
  <div>
    <search-box
    :list-query="listQuery"
    :search-options="searchOptions"
    :orderUpdate="orderUpdate"
    />
  </div>
</template>
<script>
import {orderUpdate} from '../../api/order'
import SearchBox from '../../components/searchBox'
export default {
  components: {
    SearchBox
  },
  data(){
    return {
      listQuery: {
        cancelStatus: '', // OMS订单取消状态12
        orderStatus: '', // OMS订单状态
        stockout: '', // 是否缺货标志
        orderNo: '', //订单号
      },
      orderUpdate: orderUpdate,
      searchOptions:[
        {
          label: 'OMS订单号:',
          rules: [],
          prop: 'orderNo',type: 'orderNo',name: 'orderNo',
          placeholder: '请输入订单号',
          proptype: 'input'
        },
        {
          label: 'OMS订单取消状态:',
          rules: [],
          prop: 'cancelStatus',type: 'cancelStatus',name: 'cancelStatus',
          placeholder: '请输入OMS订单取消状态',
          proptype: 'input'
        },
        {
          label: '是否缺货标志:',
          rules: [],
          prop: 'stockout',type: 'stockout',name: 'stockout',
          placeholder: '是否缺货标志',
          proptype: 'input'
        },
        {
          label: 'OMS订单状态:',
          rules: [],
          prop: 'orderStatus',type: 'orderStatus',name: 'orderStatus',
          placeholder: '请输入订单状态',
          proptype: 'input'
        }
      ],
    }
  },
}
</script>
