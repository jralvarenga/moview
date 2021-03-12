<template>
  <div>
    <vs-navbar class="navbar" center-collapsed>
      <template #left>
        <img class="logo1" src="~/assets/img/brandname.png" alt="">
        <img class="logo2" src="~/assets/img/logo.png" alt="">
      </template>
      <template #right class="actions">
        <vs-input primary v-model="searchValue" placeholder="Type a movie or TV show" />
        <vs-button class="search-button">Search</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      searchValue: ""
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
}
.logo2 {
  width: 58px;
  height: 50px;
}
.search-button {
  width: 90px;
  font-family: 'poppins';
}

@media only screen and (min-width: 501px) {
  .logo2 {
    display: none;
  }
}
@media only screen and (max-width: 500px) {
  .logo1 {
    display: none;
  }
  .search-button {
    display: none;
  }
}
</style>