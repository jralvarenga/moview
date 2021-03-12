<template>
  <div>
    <NavBar />
    <main class="container">
      <span class="section-title">Trending Now</span>
      <TrendingContainer :list="trending" />
      <span class="section-title">Popular Movies</span>
      <WatchList :list="popularMovies" />
      <span class="section-title">Popular TV Shows</span>
      <WatchList :list="popularTv" />
      <span class="section-title">Upcoming Movies</span>
      <WatchList :list="upcomingMovies" />
    </main>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import WatchList from '~/components/WatchList.vue';
import TrendingContainer from '~/components/TrendingContainer.vue';

export default {
  components: {
    NavBar,
    WatchList,
    TrendingContainer
  },
  data() {
    return {
      trending: [],
      popularMovies: [],
      popularTv: [],
      upcomingMovies: []
    }
  },
  async fetch() {
    const trendingFetch = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
    const moviesFetch = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
    const tvFetch = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`);
    const upcomingFetch = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);

    const trendingData = await trendingFetch.json();
    const moviesData = await moviesFetch.json();
    const tvData = await tvFetch.json();
    const upcommingData = await upcomingFetch.json();

    const trending = trendingData.results;
    const popularMovies = moviesData.results;
    const popularTv = tvData.results;
    const upcomingMovies = upcommingData.results;

    this.trending = trending;
    this.popularMovies = popularMovies;
    this.popularTv = popularTv;
    this.upcomingMovies = upcomingMovies;
  },
  methods: {
  }
}
</script>

<style>
.container {
  margin-top: 100px;
}
.watch-container {
  width: 95%;
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

@media only screen and (max-width: 500px) {
  .watch-container {
    width: 100%;
    padding: 0px;
    box-shadow: 0px 0px 0px 0px;
    border-radius: 15px;
  }
  .movie-container {
    width: 120px;
    margin-left: 6px;
    margin-right: 6px;
  }
}
</style>
