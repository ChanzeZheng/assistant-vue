<template>
  <!-- 查看班级信息视图 -->
  <div class="my-class-info-view">
    <p class="my-font-normal">查询条件</p>
    <div class="my-query-form">
      <el-form :inline="true" :model="queryInfo" ref="queryInfo">
        <el-form-item v-model="queryInfo.studentNumber" label="学号" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item v-model="queryInfo.studentName" label="姓名" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item class="my-form-item" label="职位">
          <el-select v-model="queryInfo.position" placeholder="选择职位" size="small">
            <el-option v-for="(position) in getPositionList"
                       :key="position.positionName"
                       :label="position.positionName"
                       :value="position.positionName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="my-form-item">
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="my-font-normal">班级成员信息</p>
    <div class="my-table-view">
      <el-table :data="studentInfoList" stripe style="width: 100%" :default-sort="{prop:'studentNumber'}">
        <el-table-column sortable prop="deptName" label="学院"></el-table-column>
        <el-table-column sortable prop="clazzName" label="班级"></el-table-column>
        <el-table-column sortable prop="studentNumber" label="学号"></el-table-column>
        <el-table-column prop="studentName" label="姓名"></el-table-column>
        <el-table-column sortable prop="positionName" label="职位"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系方式"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassInfo",
  data() {
    return {
      queryInfo: {
        studentNumber: '',
        studentName: '',
        position: '',
      },
      positionList: [
        //普通学生
        {
          positionID: 0,
          positionName: '学生',
        },
        //班长
        {
          positionID: 1,
          positionName: '班长',
        },
        //学委
        {
          positionID: 2,
          positionName: '学习委员',
        },
      ],

      //班级成员信息
      studentInfoList: [],
      //上传文件时的数据
      fileData: {
        limitNum: 1,   //同时允许上传的最大数
        fileList: [],  //excel文件列表
      },

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
              this.studentInfoList = responseData.data;
            } else {
              this.$message.warning(message)
            }
          })
    },
    initPositionList() {
      var list = this.$store.getters.positionGetter;
      this.positionList = list;
    }
  },
  computed: {
    getPositionList() {
      return this.$store.getters.positionGetter;
    }
  },
  created() {
    // this.initPositionList();
    this.getClassInfoList();
  }

}
</script>

<style scoped>
.my-class-info-view {
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