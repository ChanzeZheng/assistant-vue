<template>
  <div class="my-login-form">
    <el-card class="el-col-6 el-col-push-9" header="用户登录">
      <!--    <h3>用户登录</h3>-->
      <el-form status-icon :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item label="学号" prop="username">
          <el-input placeholder="请输入学号..." v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码..." v-model="loginForm.password" prefix-icon="el-icon-lock"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el-col-push-6 el-col-8" type="primary" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true, message: '请输入学号', trigger: 'blur'
          },
          {
            min: 12, max: 12, message: '学号长度为12位', trigger: 'blur'
          }],
        password:
            [
              {
                required: true, message: '请输入密码', trigger: 'blur'
              },
              {
                min: 6, max: 20, message: '密码长度为6～20位字符', trigger: 'blur'
              }
            ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userLogin(this.loginForm.username, this.loginForm.password)
          // this.test_get_method()
        } else {
          return false
        }
      })
    },
    userLogin(username, password) {
      this.axios.post('/api/user/login', {username: username, password: password})
          .then((response) => {
            var resData = response.data
            if(resData.status=="error"){
              alert(resData.message);
            }else{
              alert(resData.message);
              this.$router.push('/home')
            }
          })
          .catch((error) => {
            console.log('error' + error)
          })
    }
  }
}
</script>

<style scoped>

</style>