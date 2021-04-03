<template>
  <el-col :span="18">
    <h3>导航栏</h3>
    <el-menu
        unique-opened
        default-active="this.$router.path"
        class=""

        router>
      <el-submenu index="1" v-show="isUser">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>个人信息管理</span>
        </template>
        <el-menu-item-group>
          <!--          <template slot="title"></template>-->
          <el-menu-item index="personInfo">查看个人信息</el-menu-item>
          <el-menu-item index="ChangePassword">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>功能模块</span>
        </template>
        <!-- 功能模块的子选项 -->
        <!-- 作业管理 -->
        <el-submenu index="2-1" v-show="isUser">
          <template slot="title">
            作业管理
          </template>
          <el-menu-item index="HomeworkView">查询作业</el-menu-item>
          <el-menu-item index="SubmitHomework">提交作业</el-menu-item>
          <el-menu-item index="ModifyHomework">修改作业</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2" v-show="isUser">
          <template slot="title">
            消息通知管理
          </template>
          <el-menu-item index="UnReadNotification" v-show="isUser">查看所有未读消息</el-menu-item>
          <el-menu-item index="NotificationView" v-show="isUser">查看所有通知</el-menu-item>
          <el-menu-item index="UnReadStudent" v-show="isMonitor">查看某条消息未读的学生</el-menu-item>
          <el-menu-item index="UnReadHomeworkStudent" v-show="isStudyMember">查看未读作业通知的学生</el-menu-item>
        </el-submenu>
        <!-- 班级管理(班长权限可看) -->
        <el-submenu index="2-3" v-show="isMonitor">
          <template slot="title">
            班级管理
          </template>
          <el-menu-item index="ClassInfo">班级信息</el-menu-item>
          <!--            <el-menu-item index="2-3-2">导出班级信息表</el-menu-item>-->
          <el-menu-item index="ResetStudentPassword">重置班级成员密码</el-menu-item>
          <el-menu-item index="FirstLoginStudent">查看尚未修改密码的成员</el-menu-item>
          <el-menu-item index="PublishNotification">发布班级通知</el-menu-item>
        </el-submenu>
        <!-- 班级作业管理(学习委员权限可看) -->
        <el-submenu index="2-4" v-show="isStudyMember">
          <template slot="title">
            班级作业管理
          </template>
          <el-menu-item index="SubmitSituation">查看作业提交情况</el-menu-item>
          <el-menu-item index="PublishHomework">发布新的作业</el-menu-item>
          <el-menu-item index="ZipHomework">打包导出班级作业</el-menu-item>
        </el-submenu>

      </el-submenu>
      <el-menu-item index="SystemSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>

</template>

<script>
export default {
  name: "AsideView",
  data() {
    return {}
  },
  methods: {},
  created() {

  },
  computed: {
    isUser() {
      return this.$store.getters.isUser
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isMonitor() {
      return this.$store.getters.isMonitor
    },
    isStudyMember() {
      return this.$store.getters.isStudyMember
    }
  }
}
</script>

<style scoped>

</style>