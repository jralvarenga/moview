<template>
<div v-if="loading">
  <LoadingScreen />
</div>
<div v-else>
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
import LoadingScreen from '~/components/LoadingScreen.vue';

export default {
  components: {
    NavBar,
    WatchList,
    TrendingContainer,
    LoadingScreen
  },
  data() {
    return {
      loading: true,
      trending: [],
      popularMovies: [],
      popularTv: [],
      upcomingMovies: [],
    }
  },
  async created() {
    const trendingFetch = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=7d170c233de4b468625db8cf935d4e30`);
    const moviesFetch = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7d170c233de4b468625db8cf935d4e30`);
    const tvFetch = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=7d170c233de4b468625db8cf935d4e30`);
    const upcomingFetch = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=7d170c233de4b468625db8cf935d4e30`);

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
    this.loading = false;
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
  font-size: 25px;
  font-weight: 700;
  margin-left: 5%;
}

@media only screen and (max-width: 600px) {
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
