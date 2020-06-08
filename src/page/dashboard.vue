<template>
    <div>
        <test-upload :file-name="name"
        :FileTypeErrorText="['只能上传图片格式文件', '上传文件大小不能超过10M']"
        :FileLimit="10"
        :limit="1"
        :FileTypeList="['JPG']"
        :file-type="uploadType"
        @success="appendFile"/>
        <el-button type="primary" @click="getFormData">点击发送请求</el-button>
         <transfer-tree
      :options="options"
      :data="Data"
      @add="add"
      @remove="remove"
    ></transfer-tree>
    </div>
</template>
<script>
import TestUpload from '../components/common/DialogButton/upload' 
import transferTree from '../components/common/treeTransfer'
export default {
     components: { TestUpload,transferTree  },
    data() {
        return {
            name: 'file', // 上传时, 文件的参数名称
            uploadType: 'fileDrag', // 选择上传文件的样式类型, 四种, picview, file, fileDrag, picfile
            form: new FormData(),
              options: {
        title: [
          '选择车型',
          '已选车型'
        ]
      },
      Data: []
        }
    },
    methods: {
        appendFile(formData) {
            console.log(formData.get(this.name))
            this.form.append(this.name, formData.get(this.name))
        },
        getFormData() {
            console.log(this.form.get('file'))
            // 这里直接传参数 form就行
        },
         add (fromData, toData, obj, arr) {
    },
    remove (fromData, toData, obj, arr) {
    }
    }
  
}
</script>