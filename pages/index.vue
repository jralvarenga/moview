<template>
  <div>
    <NavBar />
    <main class="container">
      <span class="section-title">Trending Movies</span>
      <MoviesContainer :list="trendingMovies" />
      <span class="section-title">Trending TV Shows</span>
      <TvContainer :list="trendingTv" />
      <span class="section-title">Upcoming Movies</span>
      <MoviesContainer :list="upcomingMovies" />
    </main>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import MoviesContainer from '~/components/MoviesContainer.vue';
import TvContainer from '~/components/TvContainer.vue';

export default {
  components: {
    NavBar,
    MoviesContainer,
    TvContainer
  },
  data() {
    return {
      trendingMovies: [],
      trendingTv: [],
      upcomingMovies: []
    }
  },
  async fetch() {
    const moviesFetch = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`);
    const tvFetch = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`);
    const upcomingFetch = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);
    const moviesData = await moviesFetch.json();
    const tvData = await tvFetch.json();
    const upcommingData = await upcomingFetch.json();
    const trendingMovies = moviesData.results;
    const trendingTv = tvData.results;
    const upcomingMovies = upcommingData.results;
    this.trendingMovies = trendingMovies;
    this.trendingTv = trendingTv;
    this.upcomingMovies = upcomingMovies;
  },
  methods: {
    test() {
      console.log(this.trending);
    }
  }
}
</script>

<style>
.container {
  margin-top: 130px;
}
.watch-container {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  box-shadow: 4px 4px 20px 5px rgb(15, 22, 29);
  border-radius: 30px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  flex-direction: row;
  overflow-x: auto;
}
.movie-container {
  width: 200px;
  margin-left: 20px;
  margin-right: 20px;
}
.section-title {
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  margin-left: 5%;
}
</style>
