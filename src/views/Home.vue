<template>
  <div>
    <el-header class="my-header">
      <Header></Header>
    </el-header>
    <el-aside class="my-aside">
      <AsideView></AsideView>
    </el-aside>
    <el-main class="my-main">
      <!--      <router-view></router-view>-->
      Main
    </el-main>
  </div>
</template>

<script>
import AsideView from "../components/AsideView";
import Header from "../components/Header";

export default {
  name: "Home",
  components: {Header, AsideView}
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