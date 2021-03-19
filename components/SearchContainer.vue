<template>
  <vs-dialog blur v-model="active">
    <template #header>
      <h3 class="not-margin">Search movie or TV show</h3>
    </template>
    <form @submit="searchMovies" class="search-container">
      <input v-model="movieName" class="search-input" type="text">
      <vs-button type="submit" class="search-button" gradient>Search</vs-button>
    </form>
    <div v-if="searchResult.length == 0">
      <div class="search-results-container"></div>
    </div>
    <div v-else>
      <div class="search-results-container">
        <div @click="openMovieModal(movie.id, movie.title ? 'movie' : 'tv')" v-for="(movie, i) in searchResult" :key="i" class="movie-search-container">
          <img class="search-poster" :src="'https://themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path" alt="">
          <span>{{ movie.title ? movie.title : movie.name }}</span>
        </div>
      </div>
    </div>
  </vs-dialog>
</template>

<script>
export default {
  name: "SearchContainer",
  props: {
    active: Boolean
  },
  data() {
    return {
      movieName: "",
      searchResult: []
    }
  },
  methods: {
    async searchMovies(e) {
      e.preventDefault();
      const name = this.movieName;
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=7d170c233de4b468625db8cf935d4e30&query=${name}`);
      const data = await res.json();
      let results = [];

      for (let n = 0; n < data.results.length; n++) {
        const mediaType = data.results[n].media_type;
        if (mediaType == 'movie' || mediaType == 'tv') {
          results.push(data.results[n]);
        }
      }

      this.searchResult = results;
    },
    async openMovieModal(id, media) {
      this.$router.push(`/to-watch?id=${id}&media=${media}`);
    }
  }
}
</script>

<style>
.search-container {
  width: 100%;
  padding: 7px;
  display: flex;
  justify-content: space-evenly;
}
.search-input {
  width: 70%;
  border: 2px solid var(--primary);
  background-color: var(--background);
  color: var(--vs-text);
  padding: 5px;
  border-radius: 20px;
  font-family: 'poppins';
  font-size: 16px;
}
.search-button {
  padding: 5px;
}
.search-results-container {
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
.movie-search-container {
  width: 90%;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  cursor: pointer;
  align-items: center;
  background-color: rgb(16, 23, 31);
  transition: 300ms;
}
.movie-search-container:hover {
  background-color: rgb(18, 27, 36);
}
.movie-search-container:active {
  background-color: rgb(10, 15, 20);
}
.search-poster {
  width: 50px;
  height: 75px;
  border-radius: 5px;
  margin-right: 20px;
}
</style>