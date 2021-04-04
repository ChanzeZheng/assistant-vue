<template>
  <div class="my-login-form">
    <el-card class="el-col-6 el-col-push-9" header="修改密码">
      <!--    <h3>用户登录</h3>-->
      <el-form :model="changePasswordForm" status-icon :rules="rules" ref="changePasswordForm" label-width="100px">

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="changePasswordForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="changePasswordForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('changePasswordForm')">修改密码</el-button>
        </el-form-item>
        <el-dialog title="填写你收到的验证码" :visible.sync="changePasswordForm.showValidateCode">
          <el-form :model="changePasswordForm">
            <el-form-item label="验证码" :label-width="formLabelWidth">
              <el-input v-model="changePasswordForm.checkCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkCode()">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.changePasswordForm.checkPass !== '') {
          this.$refs.changePasswordForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.changePasswordForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      changePasswordForm: {
        pass: '',
        checkPass: '',
        showValidateCode: false,
        checkCode:''
      },
      formLabelWidth:'120px',
      rules: {
        pass: [
          {
            validator: validatePass, trigger: 'blur'
          }
        ],
        checkPass: [
          {
            validator: validatePass2, trigger: 'blur'
          }
        ],
      }

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendChangePasswordMessage()
        } else {
          return false;
        }
      })
    },
    sendChangePasswordMessage() {
      this.axios.post('/api/message/sendChangePasswordMessage')
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode
            var message = responseData.message;
            if (statusCode == 200) {
              alert(message)
              this.changePasswordForm.showValidateCode = true
            } else if (statusCode == 408) {
              //登陆信息已失效
              alert(message)
              this.$router.push('/')
            } else {
              alert(message);
            }
          })
          .catch((error) => {
            alert(error);
          })
    },
    checkCode(){
      this.axios.post('/api/user/checkVerCode',this.changePasswordForm.checkCode)
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode
            var message = responseData.message;
            if (statusCode == 200) {
              alert(message)
              this.changePassword(this.changePasswordForm.pass);
            } else if (statusCode == 408) {
              //登陆信息已失效
              alert(message)
              this.$router.push('/')
            } else {
              alert(message);
            }
          })
          .catch((error) => {
            alert(error);
          })
    },
    changePassword(newPassword) {
      this.axios.post('/api/user/changePassword', newPassword)
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode
            var message = responseData.message;
            if (statusCode == 200) {
              alert(message);
              this.changePasswordForm.showValidateCode=false;
              this.axios.post('/api/common/logout');
              this.$router.push('/');
            } else if (statusCode == 408) {
              //登陆信息已失效
              alert(message)
              this.$router.push('/')
            } else {
              alert(message);
            }
          })
          .catch((error) => {
            alert(error);
          })
    }

  }

}
</script>

<style scoped>

</style>