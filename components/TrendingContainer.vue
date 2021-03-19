<template>
<div>
  <vs-card-group class="trending-container1">
    <div v-for="(movie, i) in list" v-bind:key="i">
      <vs-card @click="openMovieModal(movie.id, movie.title ? 'movie' : 'tv')" class="movie-container" type="1">
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
  </vs-card-group>

  <div class="trending-container2">
    <div v-for="(movie, i) in list" v-bind:key="i">
      <vs-card @click="openMovieModal(movie.id, movie.title ? 'movie' : 'tv')" class="movie-container" type="1">
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
  name: "TrendingContainer",
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

.trending-container1 {
  width: 98%;
  margin: auto;
  border-radius: 30px;
  margin-top: 0px;
  margin-bottom: 40px;
}
.trending-container2 {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  border-radius: 30px;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 40px;
  flex-direction: row;
  overflow-x: auto;
}

@media only screen and (min-width: 601px) {
  .trending-container2 {
    display: none;
  }
}
@media only screen and (max-width: 600px) {
  .trending-container1 {
    display: none;
  }
}
</style>