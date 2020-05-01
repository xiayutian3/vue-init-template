<template>
  <div class="home">
    <div>{{name}}</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <Header></Header>
    <Toast/>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from '@/api/http'
import { module1Mixin } from '@/utils/mixin'

export default {
  name: 'Home',
  mixins: [module1Mixin]
  // async mounted () {
  //   const res = await axios.get('/doorEvent/list')
  //   console.log(res)
  // }
}
</script>
<style lang="scss">
.ss{
  height: 20px;
  width: 60px;
}
</style>
