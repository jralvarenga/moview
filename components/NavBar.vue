<template>
  <div>
    <vs-navbar class="navbar" center-collapsed>
      <template #left>
        <img class="logo" src="~/assets/img/brandname.png" alt="">
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
.logo {
  width: 150px;
  height: 24px;
}
.search-button {
  width: 90px;
  font-family: 'poppins';
}
</style>