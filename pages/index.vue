<template>
<div v-if="loading">
  <LoadingScreen />
</div>
<div v-else>
  <NavBar
    :movies1="popularMovies"
    :tv1="popularTv"
    :all1="trending"
  />
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
  <Footer />
</div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import WatchList from '~/components/WatchList.vue';
import TrendingContainer from '~/components/TrendingContainer.vue';
import LoadingScreen from '~/components/LoadingScreen.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    NavBar,
    WatchList,
    TrendingContainer,
    LoadingScreen,
    Footer
  },
  data() {
    return {
      loading: true,
      searchMovie: true,
      trending: [],
      popularMovies: [],
      popularTv: [],
      upcomingMovies: [],
    }
  },
  async created() {
    const trendingFetch = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
    const moviesFetch = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
    const tvFetch = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`);
    const upcomingFetch = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);

    const trendingData = await trendingFetch.json();
    const moviesData = await moviesFetch.json();
    const tvData = await tvFetch.json();
    const upcommingData = await upcomingFetch.json();

    const trending = this.covertDate(trendingData.results);
    const popularMovies = this.covertDate(moviesData.results);
    const popularTv = this.covertDate(tvData.results);
    const upcomingMovies = this.covertDate(upcommingData.results);

    this.trending = trending;
    this.popularMovies = popularMovies;
    this.popularTv = popularTv;
    this.upcomingMovies = upcomingMovies;
    this.loading = false;
  },
  methods: {
    covertDate(movie) {
      const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      for (let n = 0; n < movie.length; n++) {
        const media = movie[n].media_type;
        const date = movie[n].release_date ? movie[n].release_date : movie[n].first_air_date;
        const converted = new Date(date);
        const month = monthsArray[converted.getMonth()];
        const day = converted.getDate();
        const year = converted.getFullYear();
        const newDate = `${day} ${month} ${year}`;
        if (media == 'tv') {
          movie[n].first_air_date = newDate;
        } else {
          movie[n].release_date = newDate;
        }
      }

      return movie;
    }
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
    background-color: inherit;
  }
  .movie-container {
    width: 120px;
    margin-left: 6px;
    margin-right: 6px;
  }
}
</style>
