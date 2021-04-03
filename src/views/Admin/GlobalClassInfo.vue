<template>
  <div class="my-global-class-info-view">
    <p class="my-font-normal">查询条件</p>
    <div class="my-query-form">
      <el-form :inline="true" :model="classQuery" ref="classQuery">
        <el-form-item label="学院" class="my-form-item">
          <el-select v-model="classQuery.departmentName" placeholder="请选择学院"
                     @change="initGradeList(classQuery.departmentName)">
            <el-option v-for="(department) in departmentList"
                       :key="department.departmentName"
                       :label="department.departmentName"
                       :value="department.departmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" class="my-form-item">
          <el-select v-model="classQuery.grade" placeholder="请选择年级" @change="initMajorList(classQuery.grade)">
            <el-option v-for="(grade) in gradeList" :key="grade.gradeName" :label="grade.gradeName"
                       :value="grade.gradeName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" class="my-form-item">
          <el-select v-model="classQuery.major" placeholder="请选择专业">
            <el-option v-for="(major) in majorList" :key="major.majorName" :label="major.majorName"
                       :value="major.majorName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="my-form-item">
          <el-button type="primary" @click="getGlobalClassInfo()">查询</el-button>
        </el-form-item>
        <el-form-item class="my-form-item">
          <el-button @click="resetQueryForm()">重置查询条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="my-font-normal">Excel表操作</p>
    <div class="my-btn-div">
      <el-button class="my-btn-left" size="small" type="success" @click="downloadClassInfoTemplate">下载班级信息模板表
      </el-button>
      <el-button class="my-btn-left" type="success" size="small">上传班级信息表</el-button>
      <el-button class="my-btn-left" type="success" size="small" @click="exportClassInfoExcel">导出全体班级信息表</el-button>
    </div>
    <p class="my-font-normal">班级详细信息</p>
    <div class="my-table-view">
      <el-table :data="globalClassList" stripe style="width: 100%" :default-sort="{prop:'className'}">
        <el-table-column sortable prop="departmentName" label="学院"></el-table-column>
        <el-table-column sortable prop="grade" label="年级"></el-table-column>
        <el-table-column sortable prop="major" label="专业"></el-table-column>
        <el-table-column sortable prop="className" label="班级"></el-table-column>
        <el-table-column prop="monitorName" label="班长姓名"></el-table-column>
        <el-table-column prop="monitorNumber" label="班长学号"></el-table-column>
        <el-table-column prop="monitorPhone" label="班长联系方式"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalClassInfo",
  data() {
    return {
      classQuery: {
        departmentName: '',    //学院
        grade: '',             //年级
        major: '',             //专业
      },
      //todo 暂时先写死，后面再研究怎么对vuex中的数据做过滤
      departmentList: [],
      gradeList: [],
      majorList: [],
      globalClassList: [],
    }
  },
  methods: {
    readClassLevel() {
      var level = this.$store.getters.getDepartmentLevel
      this.departmentList = level
    },
    initGradeList(departmentName) {
      this.gradeList = this.departmentList.find((item) => {
        return item.departmentName === departmentName
      }).gradeList
      // .map((item)=>{item.gradeList})
    },
    initMajorList(gradeName) {
      this.majorList = this.gradeList.find((item) => {
        return item.gradeName === gradeName
      }).majorList
    },
    getGlobalClassInfo() {
      //将classQuery作为参数传到后端进行查询
      this.axios.post('/api/admin/getGlobalClassInfo', this.classQuery)
          .then((response) => {
            var responseData = response.data
            var code = responseData.statusCode
            var message = responseData.message
            if (code == 200) {
              this.globalClassList = responseData.data;
            } else {
              alert(message);
              this.globalClassList=[];
            }
          })
    },
    resetQueryForm() {
      this.classQuery.departmentName = ''
      this.classQuery.grade = '';
      this.classQuery.major = '';
      this.gradeList = [];
      this.majorList = [];
      this.getGlobalClassInfo();
    },
    downloadClassInfoTemplate() {

      this.$fileUtil.downloadFileByGet(this.axios,'/api/admin/download/template/classInfoExcel');
    },
    exportClassInfoExcel() {
      //导出班级信息表
      this.axios.post('/api/admin/export/classInfoExcel', this.classQuery,{responseType: 'blob'})
          .then((response) => {
            //下载文件流
            let blob = new Blob([response.data], {type: 'application/ms-excel;charset=utf-8'})
            let downloadElement = document.createElement('a')
            let href = window.URL.createObjectURL(blob);  //创建下载的链接
            downloadElement.href = href
            downloadElement.download = response.headers['filename'];  //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click();    //点击下载
            document.body.removeChild(downloadElement);//下载完成移除元素
            window.URL.revokeObjectURL(href);   //释放blob对象
            return response.data
          })

    }

  },

  computed: {
    // classLevel() {
    //   return this.$store.getters.getClassLevel
    // },
  },
  created() {
    // this.$rightUtil.pageCheckRightAdmin(this.$store,this.$router)
    this.getGlobalClassInfo()
    this.readClassLevel()
  }
}
</script>

<style scoped>
.my-global-class-info-view {
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
  /*background-color: gray;*/

}

.my-btn-div {
  text-align: left;
  margin-right: 20px;
  margin-left: 20px;
}

.my-btn-left {

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