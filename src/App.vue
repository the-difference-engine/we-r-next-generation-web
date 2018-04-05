<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view ></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 10px;
    background-color: white;
  }
  .container{
    margin: 30px;
  }
  .mx-0 {
    margin-left: 0;
    margin-right: 0;
  }
  .px-0 {
    padding-right: 0;
    padding-left: 0;
  }
  .float-right {
    float: right;
  }
</style>
