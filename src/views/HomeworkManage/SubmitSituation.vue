<template>
  <!-- 查看作业提交情况视图-->
  <div class="my-homework-submit-situation-view">
    <p class="my-font-normal">查询条件</p>
    <div class="my-query-form">
      <el-form :inline="true" :model="queryInfo" ref="queryInfo">
        <el-form-item v-model="queryInfo.subject" label="科目" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item v-model="queryInfo.title" label="标题" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item class="my-form-item">
          <el-button type="primary" size="small" @click="getHomeworkList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="my-font-normal">作业提交总览</p>
    <div class="my-table-view">
      <el-table :data="homeworkList" stripe style="width: 100%" :default-sort="{prop:'deadline'}">
        <el-table-column sortable prop="subject" label="科目"></el-table-column>
        <el-table-column sortable prop="title" label="标题"></el-table-column>
        <el-table-column sortable prop="deadline" label="截止日期"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="commited" label="提交人数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmitSituation",
  data() {
    return {
      queryInfo: {
        subject: '',
        title: '',
      },
      homeworkList: [],

    }
  },
  methods: {
    getHomeworkList() {
      this.axios.post('/api/study_member/getHomeworkList', this.queryInfo)
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              this.homeworkList = responseData.data;
            } else {
              this.$message.warning(message)
            }
          })
    },

  },
  computed: {
  },
  created() {
    this.getHomeworkList();
  },
}
</script>

<style scoped>
.my-homework-submit-situation-view {
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

.my-query-form {
  text-align: left;
  padding-left: 50px;
  border-radius: 2px;
  padding-top: 20px;
  margin-bottom: 20px;
}

.my-form-item {
  margin-right: 40px;
}

.my-font-normal {
  text-align: left;
  padding-left: 20px;
}


.my-table-view {
  padding-left: 40px;
}

</style>