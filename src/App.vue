<template>
  <div class="app">
    <div class="ui inverted attached menu">
      <router-link to="/">
        <img src="@/assets/favicon.png" class="item" />
      </router-link>
      <router-link
        to="/resume"
        :class="`${$route.name === 'resume' ? 'active' : ''} item`"
        ><i class="large file alternate outline icon"></i>Resume</router-link
      >
      <router-link
        to="/movies"
        :class="`${$route.name === 'movies' ? 'active' : ''} item`"
        ><i class="large film icon"></i>Movies</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    $('.ui.dropdown').dropdown();
  },
};
</script>

<style lang="less" scoped>
.ui.inverted.attached.menu {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}
</style>