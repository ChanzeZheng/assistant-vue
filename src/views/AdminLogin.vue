<template>
  <div class="my-login-form">
    <el-card class="el-col-6 el-col-push-9" header="管理员登录">
      <!--    <h3>用户登录</h3>-->
      <el-form status-icon :model="adminLoginForm" :rules="rules" ref="adminLoginForm" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input placeholder="请输入账号..." v-model="adminLoginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码..." v-model="adminLoginForm.password" prefix-icon="el-icon-lock"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el-col-push-6 el-col-8" type="primary" @click="submitForm('adminLoginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      adminLoginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true, message: '请输入管理员账号', trigger: 'blur'
          }
        ],
        password:
            [
              {
                required: true, message: '请输入密码', trigger: 'blur'
              },
              // {
              //   min: 6, max: 20, message: '密码长度为6～20位字符', trigger: 'blur'
              // }
            ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.adminLogin(this.adminLoginForm.username, this.adminLoginForm.password)
          // this.test_get_method()
        } else {
          return false
        }
      })
    },
    adminLogin(username, password) {
      this.axios.post('/api/admin/login', {username: username, password: password})
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              alert(message);
              this.$store.commit('login',this.adminLoginForm)
              // var path = this.$router.query.redirect    //获取校验之前的访问页面
              this.$router.push({
                name: 'Home',
                // params: {
                //   rightCode: rightCode
                // }
              })
            } else {
              alert('错误代码:' + code + ' ' + message)
            }
          })
          .catch((error) => {
            alert('进入error：' + error)
          })
    },
  }
}
</script>

<style scoped>

</style>