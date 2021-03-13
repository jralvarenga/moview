<template>
<div>
  <div class="watch-container">
    <div v-for="(movie, i) in list" v-bind:key="i">
      <vs-card @click="openMovieModal(movie.id, movie.title ? 'movie' : 'tv')" class="movie-container" type="2">
        <template #title>
          <h3>{{ movie.title ? movie.title : movie.name }}</h3>
        </template>
        <template #img>
          <img :src="'https://themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path" alt="">
        </template>
        <template #text>
          <p>{{ movie.release_date ? movie.release_date : movie.first_air_date }}</p>
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
</div>
</template>

<script>
export default {
  name: "WatchList",
  props: {
    list: Array
  },
  methods: {
    async openMovieModal(id, media) {
      this.$router.push(`/to-watch?id=${id}&media=${media}`);
    }
  }
}
</script>

<style>
</style>