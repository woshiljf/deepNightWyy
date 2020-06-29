<template>
  <div class="login-box">
    <div class="login-page-container bounceToDown">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <!-- el-icon-user-solid -->
          <el-input type="text" v-model="ruleForm2.account" placeholder="请输入用户名" autocomplete="on" />
            <span class="show-pwd">
              <i class="el-icon-user-solid" />
            </span>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input :type="passwordType" v-model="ruleForm2.checkPass" autocomplete="on" placeholder="请输入密码" @keyup.enter.native="login"/>
            <span class="show-pwd" @click="showPwd">
              <i :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-view'" />
            </span>
        </el-form-item>
        <el-checkbox click="remberuser" v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="login" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import * as commonApi from "api/common";
import * as types from "../../store/mutation-types"
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  props: {},
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      passwordType: 'password',
      rules2: {
        account: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          }
        ]
      },
      checked: true
    };
  },
  created() {
    this.ruleForm2.checkPass = "";
    if (localStorage.getItem('userName')) {  // 记住密码操作
      this.ruleForm2.account = localStorage.getItem('userName');
      this.ruleForm2.checkPass = localStorage.getItem('password');
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true
          const params = {
            userCode: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          }
          const loginLoading = this.$loading({
            lock: true,
            text: '登录中,请稍后。。。',
            spinner: "el-icon-loading"
            });
          this.$store.dispatch('LoginByUsername', params).then((res) => {
           if (!getToken()) {
             this.$notify({
               title: '登录失败',
               message: '登录失败',
               type: 'error',
               duration: 2000
             })
             loginLoading.close()
             return
           }
           this.logining = false
           loginLoading.close()
           this.$router.push({ path: "/" })  // 去主页
           }).catch((error) => {
            if (error.response) {
              this.$message({
                message: error.response.data.errorMsg || '用户名或密码错误，登录失败',
                type: 'error',
                duration: 5 * 1000
              })
            }
          }).finally(() => {
            this.logining = false
            loginLoading.close()
          })
        }else {
          this.logining = false
          console.log('error submit!!')
          return false
        }
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
  }
};
</script>

<style lang="scss">
@import "../../assets/css/them.scss";
.login-box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: $globalBgColor;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
}

label.el-checkbox.remember {
  margin: 0px 0px 35px 0px;
}
.bounceToDown {
  animation: myfirst 1s;
}
@keyframes myfirst
{
0%, 60%, 75%, 90%, 100% {
    -webkit-animation-timing-function: cubic-bezier(.215,.61,.355,1);
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
}
0% {
    opacity: 0;
    -webkit-transform: translate3d(0,-3000px,0);
    transform: translate3d(0,-3000px,0);
}
60% {
    opacity: 1;
    -webkit-transform: translate3d(0,25px,0);
    transform: translate3d(0,25px,0);
}
75% {
    -webkit-transform: translate3d(0,-10px,0);
    transform: translate3d(0,-10px,0);
}
90% {
    -webkit-transform: translate3d(0,5px,0);
    transform: translate3d(0,5px,0);
}
100% {
    -webkit-transform: none;
    transform: none;
}
}



</style>