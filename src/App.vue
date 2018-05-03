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
  .mx-auto {
    margin: auto auto;
  }
  .mx-0 {
    margin-left: 0;
    margin-right: 0;
  }
  .mx-1 {
    margin-left: 0.25rem !important;
    margin-right: 0.25rem !important;
  }
  .mx-2 {
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
  }
  .mx-3 {
    margin-left: 0.75rem !important;
    margin-right: 0.75rem !important;
  }
  .mx-4 {
    margin-left: 1rem !important;
    margin-right: 1rem !important;
  }
  .px-0 {
    padding-right: 0;
    padding-left: 0;
  }
  .pr-0 {
    padding-right: 0;
  }
  .pr-1 {
    padding-right: 1.0em !important;
  }
  .pr-2 {
    padding-right: 1.5rem !important;
  }
  .pr-3 {
    padding-right: 2.0rem !important;
  }
  pl-1 {
    padding-left: 1.0rem !important;
  }
  pl-2 {
    padding-left: 1.5rem !important;
  }
  pl-3 {
    padding-left: 2.0rem !important;
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
  .mr-1 {
    margin-right: 0.25rem !important;
  }
  .mr-2 {
    margin-right: 0.5rem !important;
  }
  .float-right {
    float: right;
  }

  .justify-content-left {
    justify-content: left;
  }
  .justify-content-right {
    justify-content: right;
  }
  .justify-content-center {
    justify-content: center;
  }

  .font-weight-bold {
    font-weight: bold;
  }
  .font-size-1 {
    font-size: 1em;
  }
  .font-size-2 {
    font-size: 1.25em;
  }

  .align-baseline {
    vertical-align: baseline;
  }
  .align-bottom {
    vertical-align: bottom;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .align-middle {
    vertical-align: middle;
  }
  .align-top {
    vertical-align: top;
  }
</style>
