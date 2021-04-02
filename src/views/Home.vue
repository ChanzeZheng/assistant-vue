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

export default {
  name: "Home",
  components: {AsideView, Header},
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