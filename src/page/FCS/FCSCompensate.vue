<template>
  <div>
    <search-box
    :list-query="listQuery"
    :search-options="searchOptions"
    :orderUpdate="fcsCompensateHk"
    />
  </div>
    
</template>
<script>
import {fcsCompensateHk} from '../../api/fcsOrder'
import SearchBox from '../../components/searchBox'
export default {
  name: 'FcsCompensateHk',
  components: {
    SearchBox
  },
  data(){
    return {
      listQuery: {
        bizType: '', //单据类型
        limit: ''
      },
      fcsCompensateHk: fcsCompensateHk,
      searchOptions:[
        {
          label: '单据类型:',
          rules: [
          {
          required: true,
          message: "请输入单据类型",
          trigger: "blur"
          }],
          prop: 'bizType',type: 'bizType',name: 'bizType',
          placeholder: '请输入单据类型',
          proptype: 'input'
        },
        {
          label: '分页数:',
          rules:[
          {
            required: true,
            message: "请输入分页数",
            trigger: "blur"
          }],
          prop: 'limit',type: 'limit',name: 'limit',
          placeholder: '请输入分页数',
          proptype: 'input'
        },
      ]
    }
  },

}
</script>
