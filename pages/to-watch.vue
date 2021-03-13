<template>
  <div>
    <NavBar />
    <main class="towatch-container">
      <div class="poster">
        <img class="movie-poster" :src="'https://themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path" alt="">
        <span class="movie-tagline">{{ movie.tagline }}</span>
        <div class="movie-rate-title">
          <span class="rate-box-title">Rate</span>
          <span class="rate-box-title">People</span>
        </div>
        <div class="movie-rate">
          <span class="rate-box">{{ movie.vote_average }}</span>
          <span class="rate-box">{{ kFormatter(movie.vote_count) }}</span>
        </div>
      </div>
      <div class="description">
        <h1>{{ movie.title ? movie.title : movie.name }}</h1>
        <div>
          <span v-for="(genres, i) in movie.genres" :key="i">
            {{ genres.name }} *
          </span>
          <span>{{ movie.runtime ? runtime(movie.runtime) : runtime(movie.episode_run_time) }} min.</span>
        </div>
        <div>
          <h3>Description</h3>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      movie: {}
    }
  },
  async fetch() {
    const query = this.$route.query;
    const id = query.id;
    const media = query.media;
    switch (media) {
      case 'movie':
        const res1 = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`);
        const data1 = await res1.json();
        this.movie = data1;
      console.log(this.movie);
      break;
      case 'tv':
        const res2 = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`);
        const data2 = await res2.json();
        this.movie = data2;
      console.log(this.movie);
      break;
    }
  },
  methods: {
    kFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    },
    runtime(arr) {
      if (Array.isArray(arr)) {
        const sum = arr.reduce((previous, current) => current += previous);
        return sum / arr.length;
      }
      return arr;
    }
  }
}
 
</script>

<style>
.towatch-container {
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: row;
  box-shadow: 4px 4px 20px 5px rgb(15, 22, 29);
  padding: 30px;
  border-radius: 15px;
  margin-top: 100px;
}
.poster {
  display: flex;
  flex-direction: column;
}
.description {
  margin-left: 20px;
  height: 100%;
}

.movie-poster {
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  height: 375px;
  border-radius: 30px;
}
.movie-tagline {
  width: 250px;;
  text-align: center;
  font-family: 'poppins';
  margin-top: 5px;
  font-size: 14px;
  color: rgb(139, 139, 139);
}
.movie-rate-title {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.movie-rate {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}
.rate-box {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'poppins';
  box-shadow: 4px 4px 20px 5px rgb(15, 22, 29);
}
.rate-box-title {
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'poppins';
}

@media only screen and (max-width: 600px) {
  .towatch-container {
    width: 80%;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .description {
    margin-left: 0px;
  }
}
</style>