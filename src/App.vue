<template>
  <div id="app" class="fillcontain">
    <router-view/>
  </div>
</template>

<script>
import headTop from './components/headTop'
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "./style/common";
</style>
