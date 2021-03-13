<template>
  <div>
    <vs-navbar class="navbar" center-collapsed>
      <template #left>
        <img @click="redirect" class="logo1" src="~/assets/img/brandname.png" alt="">
        <img @click="redirect" class="logo2" src="~/assets/img/logo.png" alt="">
      </template>
      <template #right class="actions">
        <vs-button gradient icon @click="showSearch=!showSearch">
        <img src="~/assets/icons/search-icon.svg" alt="">
      </vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
      searchValue: "",
      showSearch: false
    }
  },
  methods: {
    redirect() {
      this.$router.push('/');
    }
  }
}
</script>

<style>
.navbar {
  padding: 20px;
}
.actions {
  display: flex;
  justify-content: center ;
  align-items: center;
}
.logo1 {
  width: 150px;
  height: 24px;
  cursor: pointer;
}
.logo2 {
  width: 58px;
  height: 50px;
  cursor: pointer;
}
.search-button {
  width: 90px;
  font-family: 'poppins';
  color: #fff;
}

@media only screen and (min-width: 601px) {
  .logo2 {
    display: none;
  }
}
@media only screen and (max-width: 600px) {
  .logo1 {
    display: none;
  }
  .search-button {
    display: none;
  }
}
</style>