<template>
<div>
  <NavBar />
  <div v-if="loading == true">
    <LoadingBox />
  </div>
  <div v-else>
    <main class="towatch-container">
      <div class="poster">
        <img class="movie-poster" :src="'https://themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path" alt="">
        <span class="movie-tagline">{{ movie.tagline }}</span>
        <span class="movie-tagline">{{ movie.release_date ? movie.release_date : movie.first_air_date }}</span>
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
        <div class="genres-container">
          <span class="genres" v-for="(genres, i) in movie.genres" :key="i">{{ genres.name }}</span>
          <span class="runtime">{{ movie.runtime ? runtime(movie.runtime) : runtime(movie.episode_run_time) }} min.</span>
            <span v-if="movie.seasons" class="runtime">{{ movie.seasons.length }} seasons.</span>
          <span class="language">{{ movie.original_language }}</span>
        </div>
        <div>
          <h3>Description</h3>
          <p>{{ movie.overview }}</p>
        </div>
        <div class="movie-info">
          <vs-button @click="goToWebsite(movie.homepage)" v-if="movie.homepage" class="visit-link" circle gradient>Visit website</vs-button>
          <vs-button @click="goToTMDb" class="visit-link" circle gradient>Go to TMDb</vs-button>
        </div>
      </div>
    </main>
    <main class="container">
      <span class="recomendations-title">Recomended</span>
      <RecomendedList :list="recomended" />
    </main>
  </div>
  <Footer />
</div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import RecomendedList from '~/components/RecomendedList.vue';
import LoadingBox from '~/components/LoadingBox.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    NavBar,
    RecomendedList,
    LoadingBox,
    Footer
  },
  data() {
    return {
      loading: true,
      movie: {},
      recomended: [],
      id: this.$route.query.id,
      media: this.$route.query.media
    }
  },
  async fetch() {
    switch (this.media) {
      case 'movie':
        const res1 = await fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=7d170c233de4b468625db8cf935d4e30`);
        const data1 = await res1.json();
        this.movie = this.convertDate(data1);
        const recomendations1 = await fetch(`https://api.themoviedb.org/3/movie/${this.id}/recommendations?api_key=7d170c233de4b468625db8cf935d4e30`);
        const recomended1 = await recomendations1.json();
        this.recomended = this.convertDateArr(recomended1.results);
        this.loading = false;
      break;
      case 'tv':
        const res2 = await fetch(`https://api.themoviedb.org/3/tv/${this.id}?api_key=7d170c233de4b468625db8cf935d4e30`);
        const data2 = await res2.json();
        this.movie = this.convertDate(data2);
        const recomendations2 = await fetch(`https://api.themoviedb.org/3/tv/${this.id}/recommendations?api_key=7d170c233de4b468625db8cf935d4e30`);
        const recomended2 = await recomendations2.json();
        this.recomended = this.convertDateArr(recomended2.results);
        this.loading = false;
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
    },
    goToWebsite(link) {
      window.location = link;
    },
    goToTMDb() {
      switch (this.media) {
        case 'movie':
          const id1 = this.movie.id;
          window.location = `https://www.themoviedb.org/movie/${id1}`;
        break;
        case 'tv':
          const id2 = this.movie.id;
          window.location = `https://www.themoviedb.org/tv/${id2}`;
        break;
      }
    },
    convertDateArr(movie) {
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
    },
    convertDate(movie) {
      const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const media = movie.media_type;
      const date = movie.release_date ? movie.release_date : movie.first_air_date;
      const converted = new Date(date);
      const month = monthsArray[converted.getMonth()];
      const day = converted.getDate();
      const year = converted.getFullYear();
      const newDate = `${day} ${month} ${year}`;
      if (media == 'tv') {
        movie.first_air_date = newDate;
      } else {
        movie.release_date = newDate;
      }
      return movie;
    }
  }
}
 
</script>

<style>
.towatch-container {
  width: 95%;
  margin: auto;
  display: flex;
  flex-direction: row;
  padding: 30px;
  border-radius: 15px;
  margin-top: 100px;
  margin-bottom: 40px;
  animation: load-page 300ms ease-in;
}
.poster {
  display: flex;
  flex-direction: column;
}
.description {
  margin-left: 20px;
  height: 100%;
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
.genres {
  padding: 7px;
  font-size: 14px;
  border-radius: 60px;
  margin: 5px;
  background-color: var(--primary);
}
.runtime {
  padding: 7px;
  margin: 3px;
  font-size: 14px;
  border-radius: 60px;
  border: 2px solid var(--primary);
}
.language {
  padding: 7px;
  margin-left: 0px;
  font-size: 14px;
  border-radius: 60px;
  border: 2px solid var(--primary);  
}
.movie-info {
  float: right;
  margin-top: 50px;
  display: flex;
}
.visit-link {
  font-family: 'poppins';
  font-size: 18px;
}
.recomendations-title {
  font-size: 25px;
  font-weight: 700;
  margin-left: 5%;
}

@media only screen and (max-width: 600px) {
  .towatch-container {
    width: 80%;
    flex-direction: column;
    margin-bottom: 20px;
    box-shadow: 0px 0px 0px 0px;
  }
  .description {
    margin-left: 0px;
  }
  .genres-container {
    display: flex;
    flex-direction: column;
  }
  .runtime,
  .language,
  .genres {
    margin: 0px;
    margin-top: 10px;
    text-align: center;
    width: auto;
  }
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