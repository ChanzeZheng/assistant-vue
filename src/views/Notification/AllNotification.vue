<template>
  <!-- 所有消息的视图-->
  <div class="my-all-notification-view">
    <p class="my-font-normal">所有信息</p>
    <div class="my-table-view">
      <el-table  ref="multipleTable" :data="allNotification" stripe style="width: 100%" :default-sort="{prop:'studentNumber'}">
        <el-table-column type="selection" width55></el-table-column>
        <el-table-column prop="fromStudentName" label="消息发布人"></el-table-column>
        <el-table-column prop="fromStudentPosition" label="发布人身份"></el-table-column>
        <el-table-column prop="typeName" label="消息类型"></el-table-column>
        <el-table-column prop="notificationTitle" label="标题"></el-table-column>
        <el-table-column prop="notificationContent" label="内容"></el-table-column>
        <el-table-column sortable prop="readStatusName" label="读状态"></el-table-column>
      </el-table>
    </div>
    <el-button type="success" class="my-read-btn" @click="updateRead">标记为已读</el-button>
  </div>
</template>

<script>
export default {
  name: "AllNotification",
  data() {
    return {
      allNotification: [],
    }
  },

  methods: {
    getAllNotification() {
      this.axios.post('/api/common/getAllNotification')
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode;
            var message = responseData.message;
            var list = responseData.data;
            if (statusCode == 200) {
              this.allNotification = list;
            } else if (statusCode == 309) {
              this.allNotification = [];
            } else {
              this.$message.warning(message);
            }
          })
    },

    updateRead() {
      let list = this.$refs.multipleTable.selection.map((item) => {
        return item.id
      })
      this.axios.post('/api/common/updateRead', list)
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode;
            var message = responseData.message;
            if (statusCode == 200) {
              this.$message.success(message)
              this.getAllNotification();
            } else {
              this.$message.warning(message);
            }
          })
    },

  },
  created() {
    this.getAllNotification();
  },

}
</script>

<style scoped>
.my-all-notification-view{
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

.my-read-btn{
  margin-left: 1300px;
  margin-top: 20px;
}
</style>