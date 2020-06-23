<template>
  <div class="dashboard">
    <h1>
      欢迎{{userName}}登录系统
    </h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: ''
    }
  },
  created(){
    var user= sessionStorage.getItem('user')
    if(user){
      user = JSON.parse(user)
      this.userName = user.loginName
    }
  }
}
</script>
<style scoped>
  .dashboard {
    margin: 0 auto;
    text-align: center;
  }
</style>