<template>
  <div class="login-box">

    <div class="loginText">

      <h1 style="--x: 6; --y: -6;">
        <span style="--index: 0; --alpha-l: 0.125; --alpha-u: 0.25;">深</span>
        <span style="--index: 1; --alpha-l: 0.125; --alpha-u: 0.25;">夜</span>
        <span style="--index: 2; --alpha-l: 0.125; --alpha-u: 0.25;">网</span>
        <span style="--index: 3; --alpha-l: 0.125; --alpha-u: 0.25;">抑</span>
        <span style="--index: 4; --alpha-l: 0.125; --alpha-u: 0.25;">云</span>
        <span style="--index: 5; --alpha-l: 0.125; --alpha-u: 0.25;"></span>
      </h1>

      <!-- <h1 style="--x: 3; --y: -3;">
        <span style="--index: 0; --alpha-l: 0.25; --alpha-u: 0.5;">深</span><span
          style="--index: 1; --alpha-l: 0.25; --alpha-u: 0.5;">夜</span><span
          style="--index: 2; --alpha-l: 0.25; --alpha-u: 0.5;">网</span><span
          style="--index: 3; --alpha-l: 0.25; --alpha-u: 0.5;">抑</span><span
          style="--index: 4; --alpha-l: 0.25; --alpha-u: 0.5;">云</span><span
          style="--index: 5; --alpha-l: 0.25; --alpha-u: 0.5;"></span>
      </h1> -->

      <h1>
        <span style="--index: 0; --alpha-l: 0.5; --alpha-u: 1;">深</span><span
          style="--index: 1; --alpha-l: 0.5; --alpha-u: 1;">夜</span><span
          style="--index: 2; --alpha-l: 0.5; --alpha-u: 1;">网</span><span
          style="--index: 3; --alpha-l: 0.5; --alpha-u: 1;">抑</span><span
          style="--index: 4; --alpha-l: 0.5; --alpha-u: 1;">云</span><span
          style="--index: 5; --alpha-l: 0.5; --alpha-u: 1;"></span>
      </h1>

    </div>

    <div class="bounceToDown loginBox">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
        class="demo-ruleForm login-container">
        <el-form-item prop="account">
          <!-- el-icon-user-solid -->
          <label for="phone">
            <span style="color: #ffffff">手机号:</span>
            <el-input type="text" v-model="ruleForm2.account" placeholder="请输入手机号" autocomplete="on" id="phone" />
            <span class="show-pwd">
              <i class="el-icon-user-solid" />
            </span>
          </label>
        </el-form-item>
        <el-form-item prop="checkPass">

          <label for="pwd">
            <span style="color: #ffffff">密码：</span>
            <el-input :type="passwordType" v-model="ruleForm2.checkPass" autocomplete="on" placeholder="请输入密码"
              @keyup.enter.native="login" id="pwd" />
            <span class="show-pwd" @click="showPwd">
              <i :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-view'" />
            </span>
          </label>

        </el-form-item>
        <el-checkbox click="remberuser" v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="login" :loading="logining">登录</el-button>
        </el-form-item>

        <div class="register" style="width: 100%">
          <el-button type="danger" size="mini" :loading="dirloginLoad" @click="directLogin">直接听歌</el-button>
        </div>

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
  data () {
    return {
      logining: false,
      dirloginLoad: false,
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
  created () {
    this.ruleForm2.checkPass = "";
    if (localStorage.getItem('userName')) {  // 记住密码操作
      this.ruleForm2.account = localStorage.getItem('userName');
      this.ruleForm2.checkPass = localStorage.getItem('password');
    }

    var iSstranger = true
    sessionStorage.setItem("stranger", JSON.stringify({ iSstranger }));


  },
  methods: {
    login () {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true
          const params = {
            userCode: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          }
          // const loginLoading = this.$loading({
          //   lock: true,
          //   text: '登录中,请稍后。。。',
          //   spinner: "el-icon-loading"
          // });
          // 登录请求
          this.$store.dispatch('LoginByUsername', params).then((res) => {
            if (!getToken()) {
              this.$notify({
                title: '登录失败',
                message: '登录失败',
                type: 'error',
                duration: 2000
              })
              // loginLoading.close()
              return
            }
            // 不是陌生人
            var iSstranger = false
            sessionStorage.setItem("stranger", JSON.stringify({ iSstranger }));
            this.$store.commit('changeStronger', false)
            this.logining = false
            // loginLoading.close()
            this.$router.push({ path: "/" })  // 去主页
            this.$message({
              message: '晚上好，小宝贝',
              type: 'success',
              duration: 3 * 1000
            })

          }).catch((error) => {
            console.log(error)
            if (error.response) {
              this.$message({
                message: error.response.data.errorMsg || '用户名或密码错误，登录失败',
                type: 'error',
                duration: 5 * 1000
              })
            }
          }).finally(() => {
            this.logining = false
            // loginLoading.close()
          })
        } else {
          this.logining = false
          console.log('error submit!!')
          return false
        }
      })
    },
    // 密码显示
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    directLogin () {
      // 陌生人登录
      var loginName = '抑郁少年'
      sessionStorage.setItem("user", JSON.stringify({ loginName }));
      this.dirloginLoad = true
      setTimeout(() => {
        this.dirloginLoad = false
        this.$router.push({ path: "/" })
      }, 2000);
      this.$store.commit('changeStronger', true)
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/them.scss";
@import "../../assets/css/style.css";
.login-box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-image: url("../../assets/img/4.png");
  background-size: auto;
}

.loginBox {
  opacity: 0.3;
  transition: all 2s;
}
.text-header {
  font: 5em Brush Script MT;
  color: #a5536a;
  text-shadow: -4px -2px 0 #fff;
}
.register {
  display: -webkit-box;
  display: -ms-flexbox;
  /* display: flex; */
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: end;
}
.loginBox:hover {
  opacity: 0.8;
}

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 500px;
  padding: 35px 35px 15px;
  // background: #333;
  background-color: rgba(0, 0, 0, 0.376);
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 40px;
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
@keyframes myfirst {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
</style>