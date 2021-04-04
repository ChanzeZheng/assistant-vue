<template>
  <!-- 查看班级信息视图 -->
  <div class="my-class-info-view">
    <p class="my-font-normal">查询条件</p>
    <div class="my-query-form">
      <el-form :inline="true" :model="queryInfo" ref="queryInfo">
        <el-form-item label="学号" class="my-form-item">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="my-form-item">
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
    <p class="my-font-normal">Excel表操作</p>
    <div class="my-btn-div">
      <el-button class="my-btn-left" size="small" type="success" @click="downloadStudentInfoTemplate">下载班级成员信息模板表
      </el-button>
      <!--      <el-button class="my-btn-left" type="success" size="small">上传班级信息表</el-button>-->
      <el-button class="my-btn-left" type="success" size="small" @click="exportStudentInfoExcel">导出班级成员信息表</el-button>
      <div class="my-upload-area">
        <!-- limit代表允许上传的最大数 -->
        <el-upload drag
                   :auto-upload="false"
                   accept="xlsx，xls"
                   :action="uploadURL()"
                   :before-upload="beforeUploadFile"
                   :on-change="fileChange"
                   :on-exceed="exceedFile"
                   :on-success="uploadSuccess"
                   :on-error="uploadError"
                   :file-list="fileData.fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
        </el-upload>
        <br/>
        <el-button size="small" type="primary" @click="uploadStudentInfoExcel">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </div>
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
    uploadURL() {
      //action参数为必填项，我们需要二次确认才真正上传，所以这里返回空字符串即可
      return "";
    },
    //上传文件之前的钩子函数，参数为上传的文件，若返回false或者返回Promise且被reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload!');
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024;
      if (extension !== 'xlsx' || extension !== 'xls') {
        this.$message.warning('只能上传后缀是.xlsx或.xls的文件');
      }
      if (size > 10) {
        this.$message.warning("文件大小不超过10M");
      }
    },
    //文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(`只能选择${this.fileData.limitNum}个文件，当前共选择了${files.length + fileList.length}个文件`)
    },
    //文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw);
      this.fileData.fileList.push(file.raw);
      console.log(this.fileData.fileList);
      if (fileList.length > 0) {
        this.fileData.fileList = [fileList[fileList.length - 1]]
      }
    },

    uploadSuccess() {
      this.$message.success('文件上传成功!');
    },
    uploadError() {
      this.$message.error('文件上传失败！');
    },
    downloadStudentInfoTemplate() {
      this.$fileUtil.downloadFileByGet(this.axios, '/api/monitor/download/StudentInfoTemplate')
    },
    uploadStudentInfoExcel() {
      if (this.fileData.fileList.length == 0) {
        this.$message.warning('请上传文件');
      } else {
        // this.$refs.upload.submit();
        let form = new FormData();
        form.append('file', this.fileData.fileList[0].raw)
        this.axios.post('/api/monitor/upload/StudentInfo', form, {
          headers: {
            'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
          }
        })
            .then((response) => {
              var responseData = response.data
              var code = responseData.statusCode
              var message = responseData.message
              if (code == 200) {
                this.uploadSuccess();
              } else {
                alert(message);
                this.uploadError();
              }
            })
      }
    },
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
    exportStudentInfoExcel() {
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

.my-btn-div {
  text-align: left;
  margin-right: 20px;
  margin-left: 20px;
}

.my-upload-area {
  text-align: left;
  /*margin-top: 20px;*/
  margin-top: -50px;
  margin-left: 400px;
  width: 25%;
  /*background-color: #fffff3;*/
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