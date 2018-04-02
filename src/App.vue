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
  .my-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-3 {
    margin-top: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }
  .my-4 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-5 {
    margin-top: 1.25rem !important;
    margin-bottom: 1.25rem !important;
  }
  .float-right {
    float: right;
  }
</style>
