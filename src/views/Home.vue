<template>
  <div>
    <el-header class="my-header">
      <Header></Header>
    </el-header>
    <el-aside class="my-aside">
      <AsideView></AsideView>
    </el-aside>
    <el-main class="my-main">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import Header from "../components/Header";
import AsideView from "../components/AsideView";
// console.log(this.$route.params.isAdmin)
export default {
  name: "Home",
  components: {AsideView, Header},
  data() {
    return {
      currentUser: {
        username: '',
        accountNumber: '',
        positionName: '',
      },
      unReadNotification: {
        count: 0,
        List: [],
        message: ''
      },

    }
  },
  methods: {
    //获取当前未读消息
    getUnReadNotification() {
      this.axios.post('/api/common/unReadNotification')
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode
            var message = responseData.message
            var notificationList = responseData.data
            if (statusCode == 200) {
              this.unReadNotification.List = notificationList;
              this.unReadNotification.message = message;
              this.unReadNotification.count = notificationList.size();
            } else {
              this.unReadNotification.message = message;
            }

          })
          .catch((error) => {
            alert('调用获取未读消息接口有错误!');
            error
          })
    },

    //获取当前用户权限
    getRightCode() {
      this.axios.post('/api/common/getRightCode')
          .then((response) => {
            var responseData = response.data
            var statusCode = responseData.statusCode
            var rightCode = responseData.data
            var message = responseData.message;
            if (statusCode == 200) {
              this.$store.dispatch('addRightCode',rightCode)
            }else if (statusCode == 408) {
              //登陆信息已失效
              alert(message)
              this.$router.push('/')
            } else {
              alert(message);

            }
          })
    },
  },
  created() {
    this.getRightCode();
    this.getUnReadNotification();
    // var rightCode = this.$route.params.rightCode
    // if (rightCode) {
    //   //只有获取到值才进行展示，其余只能获取到默认
    //   this.rightCode = rightCode;
    // }
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
.my-header {
  background-color: dodgerblue;
  border-radius: 5px;
}

.my-aside {
  /*height: 100%;*/
  /*overflow: auto;*/
  /*width: 250px;*/

  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;

}

.my-main {
  /*position: absolute;*/
}

</style>