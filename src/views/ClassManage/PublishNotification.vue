<template>
  <!-- 发布消息通知 -->
  <div class="my-publish-notification-view">
    <p class="my-font-normal">通知内容</p>
    <div class="my-notification-form">
      <el-form ref="notificationForm" :model="notificationForm">

        <el-form-item label-width="80px" label="通知类型">
          <el-select v-model="notificationForm.typeName" placeholder="选择通知类型">
            <el-option v-for="(notification) in notificationType"
                       :key="notification.id"
                       :label="notification.name"
                       :value="notification.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="80px" label="通知标题">
          <el-input v-model="notificationForm.notificationTitle"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" label-width="80px" prop="content">
          <el-input type="textarea" v-model="notificationForm.notificationContent" :rows="7"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="my-btn-group">
            <el-button type="primary" @click="publish()">发布通知</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublishNotification",
  data() {
    return {
      notificationForm: {
        typeName: '',    //消息类型
        notificationTitle: '',     //标题
        notificationContent: '',   //通知内容
        studentInfoList: [],
      },
      notificationType: [
        {
          id: 0,
          name: '公共通知'
        },
        {
          id: 1,
          name: '作业通知',
        }
      ],
    }
  },
  methods: {
    //获取班级成员信息
    getClassInfoList() {
      this.axios.post('/api/monitor/getStudentInfo')
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              this.notificationForm.studentInfoList = responseData.data;
            } else {
              this.$message.warning(message)
            }
          })
    },

    //发布通知
    publish(){
      this.axios.post('/api/monitor/publishNotification',this.notificationForm)
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              this.notificationForm.studentInfoList = responseData.data;
              this.$message.success(message);
            } else {
              this.$message.warning(message)
            }
          })
    }
  },
  created() {
    this.getClassInfoList();
  }

}
</script>

<style scoped>


.my-publish-notification-view {
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

.my-font-normal {
  text-align: left;
  padding-left: 20px;
}

.my-notification-form {
  text-align: left;
  padding-left: 50px;
  padding-right: 200px;
  border-radius: 2px;
  padding-top: 20px;
  margin-bottom: 20px;
}

.my-btn-group {
  margin-left: 80px;
}

</style>