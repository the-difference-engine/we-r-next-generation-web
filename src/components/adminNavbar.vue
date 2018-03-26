<template>
  <div id="navbar-container">
    TEST NAVBAR FOR ADMIN SITE
    <button id="logout-button"
      class="btn btn-primary"
      v-on:click.prevent="submitLogout"
    >Logout
    </button>
  </div>
</template>

<script>
export default {
  name: 'adminNavbar',
  data () {
    return {}
  },
  methods :{
    submitLogout: function (evt) {
      this.$store.dispatch('logout', {router: this.$router})
    },
  }
}
</script>

<style scoped>
  #navbar-container {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid black;
  }
</style>
