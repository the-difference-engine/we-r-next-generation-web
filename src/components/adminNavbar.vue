<template>
  <div id="navbar-container container-fluid">
    <div id="admin-header" class="row">
      <div id="header-left" class="col-xs-3 col-sm-3">
        <router-link to="/home">
          <img src="static/assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" class="img-responsive">
        </router-link>
      </div>
      <div alt="Menu Button" class="col-xs-4" id="menu-button">
            <button v-on:click.prevent="toggleMenu" v-bind:class="{'is-active': menuClicked}" class="hamburger hamburger--collapse" type="button">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
      <div id="header-right" class="menu-items col-xs-9 col-sm-9" v-bind:class="{ showMenu: menuClicked }">
        <router-link to="/home"><button class="btn btn-warning">User Site</button></router-link>
        <router-link to="/admin/applications">Applications</router-link>
        <router-link to="/admin/users">Members</router-link>
        <router-link to="/admin/camp/create">New CampEx</router-link>
        <button @click="toggleEdit" class="edit-button">Edit
          <ul v-if="show" class="edit-list">
            <li class="edit-options"><router-link to="/home">Home</router-link></li>
            <li class="edit-options"><router-link to="/admin/faqEdit">FAQs</router-link></li>
            <li class="edit-options"><router-link to="/admin/addSuccessStory">Success Stories</router-link></li>
            <li class="edit-options"><router-link to="/faqEdit">FAQs</router-link></li>
            <li class="edit-options"><router-link to="/admin/home-edit">Home</router-link></li>
            <li class="edit-options"><router-link to="/faq">FAQs</router-link></li>
            <li class="edit-options"><router-link to="/successStories">Success Stories</router-link></li>
            <li class="edit-options">
              <router-link :to="{ name: 'AdminUserWaiverEdit', params: { type: 'camper' } }">
                Camper Waiver
              </router-link>
            </li>
            <li class="edit-options">
              <router-link :to="{ name: 'AdminUserWaiverEdit', params: { type: 'volunteer' } }">
                Volunteer Waiver
              </router-link>
            </li>
          </ul>
        </button>
        <button id="logout-button"
          class="btn btn-primary"
          v-on:click.prevent="submitLogout"
        >Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminNavbar',
  data() {
    return {
      menuClicked: false,
      show: false,
      edits: {
        home: 'Home',
        faqs: 'FAQs',
        sucessStories: 'Success Stories',
        waiver: 'Waiver'
      }
    };
  },
  methods: {
    submitLogout: function(evt) {
      this.$store.dispatch('logout', { router: this.$router });
    },
    toggleMenu: function() {
      this.menuClicked = !this.menuClicked;
    },
    toggleEdit: function() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
#navbar-container {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid black;
}
#logout-button {
  background-color: #5faaf6;
  border-color: #5faaf6;
}
#admin-header {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.menu-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s linear;
}
#menu-button {
  display: none;
}
.edit-button {
  border-radius: 4px;
}
.edit-list {
  padding-left: 0px;
}
.edit-options {
  list-style-type: none;
}
@media (max-width: 700px) {
  .menu-items {
    visibility: hidden;
    height: 1px;
    width: 100%;
    display: flex;
  }
  #menu-button {
    display: inline-block;
    width: 30%;
  }
  #header-left {
    width: 60%;
  }
  .showMenu {
    width: 100%;
    visibility: visible;
    height: 50px;
  }
}
@media (min-width: 875px) {
  .menu-items {
    padding-right: 5%;
  }
}
</style>
