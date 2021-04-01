<template>
    <el-col :span="18">
      <h3>导航栏</h3>
      <el-menu
          unique-opened
          default-active="this.$router.path"
          class=""
          @open="handleOpen"
          @close="handleClose"
          router>
        <el-submenu index="1" v-show="rightCode.userRight">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>个人信息管理</span>
          </template>
          <el-menu-item-group>
            <!--          <template slot="title"></template>-->
            <el-menu-item index="1-1">查看个人信息</el-menu-item>
            <el-menu-item index="1-2">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>功能模块</span>
          </template>
          <!-- 功能模块的子选项 -->
          <!-- 作业管理 -->
          <el-submenu index="2-1" v-show="rightCode.userRight">
            <template slot="title">
              作业管理
            </template>
            <el-menu-item index="2-1-1">查询作业</el-menu-item>
            <el-menu-item index="2-1-2">提交作业</el-menu-item>
            <el-menu-item index="2-1-3">修改作业</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2" v-show="rightCode.userRight">
            <template slot="title">
              消息通知管理
            </template>
            <el-menu-item index="2-2-1" v-show="rightCode.userRight">查看所有未读消息</el-menu-item>
            <el-menu-item index="2-2-2" v-show="rightCode.userRight">查看所有通知</el-menu-item>
            <el-menu-item index="2-2-3" v-show="rightCode.monitorRight">查看未读通知的人数</el-menu-item>
            <el-menu-item index="2-2-4" v-show="rightCode.studyMemberRight">查看未读作业通知的人数</el-menu-item>
          </el-submenu>
          <!-- 班级管理(班长权限可看) -->
          <el-submenu index="2-3" v-show="rightCode.monitorRight">
            <template slot="title">
              班级管理
            </template>
            <el-menu-item index="2-3-1">导入班级信息表</el-menu-item>
            <el-menu-item index="2-3-2">导出班级信息表</el-menu-item>
            <el-menu-item index="2-3-3">重置班级成员密码</el-menu-item>
            <el-menu-item index="2-3-4">查看尚未修改密码的成员</el-menu-item>
            <el-menu-item index="2-3-5">发布班级通知</el-menu-item>
          </el-submenu>
          <!-- 班级作业管理(学习委员权限可看) -->
          <el-submenu index="2-4" v-show="rightCode.studyMemberRight">
            <template slot="title">
              班级作业管理
            </template>
            <el-menu-item index="2-4-1">查看作业提交情况</el-menu-item>
            <el-menu-item index="2-4-2">发布新的作业</el-menu-item>
            <el-menu-item index="2-4-3">打包导出班级作业</el-menu-item>
          </el-submenu>

        </el-submenu>
        <el-menu-item index="4">
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
    return {
      rightCode: {   //权限
        userRight: true, //用户权限
        monitorRight: true,  //班长权限
        studyMemberRight: true //学习委员权限

      },

    }
  }
}
</script>

<style scoped>

</style>