<template>
<div class="watch-container">
  <div v-for="(movie, i) in list" v-bind:key="i">
    <vs-card class="movie-container" type="2">
      <template #title>
        <h3>{{ movie.title }}</h3>
      </template>
      <template #img>
        <img :src="'https://themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path" alt="">
      </template>
      <template #text>
        <p>{{ movie.release_date }}</p>
      </template>
      <template #interactions>
        <vs-button class="btn-chat" shadow primary>
          <i class='bx bx-chat' ></i>
          <span>{{ movie.vote_average }}</span>
        </vs-button>
      </template>
    </vs-card>
  </div>
</div>
</template>

<script>
export default {
  name: "MoviesContainer",
  props: {
    list: Array
  }
}
</script>

<style>
</style>