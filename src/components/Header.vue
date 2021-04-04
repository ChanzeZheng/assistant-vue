<template>
  <el-row type="flex" justify="end">
    <el-col :span="2">
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link my-right-section">
    个人中心<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/UnReadNotification">
            未读消息
            <el-badge class="" :value="getUnreadCount" :max="99"></el-badge>
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
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
      if(command=='/UnReadNotification'){
        this.$router.push(command)
      }
      else if(command=='logout'){
        this.axios.post('/api/common/logout')
        .then((response)=>{
          const responseData = response.data;
          const statusCode = responseData.statusCode;
          const message = responseData.message;
          if (statusCode == 200) {
            alert(message);
            this.$router.push('/')
          }else if(statusCode==408){
            alert(message);
            this.$router.push('/')
          }
        })
      }
    }
  },
  computed:{
    getUnreadCount(){
      return this.$store.getters.getUnReadCount
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