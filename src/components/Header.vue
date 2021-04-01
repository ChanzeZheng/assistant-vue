<template>
  <el-row type="flex" justify="end">
    <el-col :span="2">
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link my-right-section">
    个人中心<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">
            未读消息
            <el-badge class="" :value="unReadCount" :max="99"></el-badge>
          </el-dropdown-item>
          <el-dropdown-item divided>
            退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      unReadCount: 100
    }
  },
  methods: {
    handleCommand(command) {
      this.$message('点击了按钮' + command)
    }
  }

}

</script>

<style scoped>
.my-right-section {
  line-height: 60px;
  text-align: center;
  color: #ffffff;
  font-size: large;
  font-weight: bold;
}

</style>