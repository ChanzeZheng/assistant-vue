<template>
  <!-- 发布作业通知 -->
  <div class="my-publish-homework-view">
    <p class="my-font-normal">发布新作业</p>
    <div class="my-homework-form">
      <el-form :inline="true" label-width="80px" label-position="left" ref="homeworkForm" :model="homeworkForm">
        <el-form-item label="科目" class="my-form-item">
          <el-input v-model="homeworkForm.subject" size="small"></el-input>
        </el-form-item>
        <el-form-item label="作业标题" class="my-form-item">
          <el-input v-model="homeworkForm.title" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="是否需要上传文件">
          <el-select size="small" v-model="homeworkForm.uploadFile">
            <el-option
                label="是" :value=true
            ></el-option>
            <el-option label="否" :value=false></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="my-form-item" label="截止时间">
          <!--          <div class="clock">-->
          <el-date-picker
              v-model="homeworkForm.deadline"
              type="datetime"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择作业截止时间">
          </el-date-picker>
          <!--          </div>-->
        </el-form-item>
      </el-form>
      <el-form :model="homeworkForm" label-width="80px" label-position="left">
        <el-form-item label="作业描述" class="my-form-item-textarea">
          <el-input v-model="homeworkForm.description" :rows="7" size="small" type="textarea"></el-input>
        </el-form-item>
        <el-form-item class="my-submit-btn">
          <el-button type="success" size="small" @click="publishNewHomework">发布新作业</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublishHomework",
  data() {
    return {
      homeworkForm: {
        subject: '',
        title: '',
        description: '',
        deadline: '',
        uploadFile: false
      },
    }
  },
  methods: {
    publishNewHomework() {
      this.axios.post('/api/study_member/publish_homework', this.homeworkForm)
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              // this.notificationForm.studentInfoList = responseData.data;
              this.$message.success(message);
              this.getUnReadNotification()
            } else {
              this.$message.warning(message)
            }
          })
    },
    getUnReadNotification() {
      this.axios.post('/api/common/unReadNotification')
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode
            var message = responseData.message
            var notificationList = responseData.data
            if (statusCode == 200) {
              this.$store.dispatch('setUnReadCountAction', notificationList.length);
            } else {
              this.$message.warning(message)
            }

          })
          .catch((error) => {
            alert('调用获取未读消息接口有错误!');
            error
          })
    }
  },
  computed: {

  },
  created() {

  },
}
</script>

<style scoped>
.my-publish-homework-view {
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 250px;
  padding-top: 10px;
  padding-left: 5px;
  padding-bottom: 20px;
  border: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 80vh;
}

.my-homework-form {
  text-align: left;
  padding-left: 50px;
  border-radius: 2px;
  padding-top: 20px;
  margin-bottom: 20px;
}

.my-font-normal {
  text-align: left;
  padding-left: 20px;
}

.my-form-item {
  /*margin-right: 40px;*/
  width: 300px;
}

.my-form-item-textarea {
  width: 1270px;
}

.my-submit-btn {
  text-align: right;
  margin-right: 160px;
}


</style>