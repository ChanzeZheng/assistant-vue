<template>
  <!-- 浏览作业详情的页面 -->
  <div class="my-homework-view">
    <p class="my-font-normal">查询条件</p>
    <div class="my-query-form">
      <el-form :inline="true" :model="queryInfo" ref="queryInfo">
        <el-form-item v-model="queryInfo.subject" label="科目" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item v-model="queryInfo.title" label="标题" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item class="my-form-item" label="提交状态">
          <el-select size="small" v-model="queryInfo.isSubmit">
            <el-option :key="queryInfo.isSubmit"
                       label="全部"
                       value="-1"></el-option>
            <el-option :key="queryInfo.isSubmit"
                       label="已提交" :value="1"></el-option>
            <el-option :key="queryInfo.isSubmit" label="未提交" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="my-form-item">
          <el-button type="primary" size="small" @click="getHomeworkList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="my-font-normal">作业总览</p>
    <div class="my-table-view">
      <el-table :data="homeworkList" stripe style="width: 100%" :default-sort="{prop:'deadline'}">
        <el-table-column sortable prop="homework.subject" label="科目"></el-table-column>
        <el-table-column sortable prop="homework.title" label="标题"></el-table-column>
        <el-table-column sortable prop="homework.deadline" label="截止日期"></el-table-column>
        <el-table-column prop="homework.description" label="描述"></el-table-column>
        <el-table-column prop="submitted" label="是否已提交" :formatter="formatSubmitBoolean"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeworkView",
  data() {
    return {
      queryInfo: {
        title: '',
        subject: '',
        // isSubmit: -1,
      },
      homeworkList: [],
      unSubmitList: [],
      submitList: [],

    }
  },
  methods: {
    getHomeworkList() {
      this.axios.post('/api/common/getSelfHomework', this.queryInfo)
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              let data = responseData.data;
              this.homeworkList = data.allHomeworkList;
              this.unSubmitList = data.unSubmitList;
              this.submitList = data.submitList
            } else {
              this.$message.warning(message)
            }
          })
    },
    formatSubmitBoolean(row,column,cellValue){
      var ret = ''  //页面展示的值
      if(cellValue){
        ret = '是'
      }else{
        ret = '否'
      }
      return ret;
    }
  },
  computed: {},
  created() {
    this.getHomeworkList();
  },
}
</script>

<style scoped>
.my-homework-view {
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