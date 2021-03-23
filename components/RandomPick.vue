<template>
  <vs-dialog blur v-model="active">
    <template #header>
      <h3>Random pick</h3>
    </template>
    <div class="randompick-container">
      <form @submit="pickToWatch">
        <div class="pick-options">
          <vs-radio v-model="pickOption" val="all">All</vs-radio>
          <vs-radio v-model="pickOption" val="movie">Movie</vs-radio>
          <vs-radio v-model="pickOption" val="tv">Tv</vs-radio>
        </div>
        <div class="button-container">
          <vs-button class="pick-button" gradient>Pick random</vs-button>
        </div>
      </form>
    </div>
  </vs-dialog>
</template>

<script>
export default {
  name: "RandomPick",
  props: {
    active: Boolean,
    movies2: Array,
    tv2: Array,
    all2: Array
  },
  data() {
    return {
      movies: this.movies2,
      tv: this.tv2,
      all: this.all2,

      pickOption: "all"
    }
  },
  methods: {
    pickToWatch(e) {
      e.preventDefault();
      const movies = this.movies
      const tv = this.tv;
      const all = this.all;
      switch (this.pickOption) {
        case 'all':
          let arr1 = [];
          arr1.push(...movies, ...tv, ...all);
          const selected1 = arr1[ Math.floor(Math.random() * arr1.length) ];
          if (selected1.media_type) {
            this.$router.push(`/to-watch?id=${selected1.id}&media=${selected1.media_type}`);            
          } else {
            const media1 = selected1.title ? 'movie' : 'tv';
            this.$router.push(`/to-watch?id=${selected1.id}&media=${media1}`);
          }
        break;
        case 'movie':
          let newAll1 = [];
          for (let n = 0; n < all.length; n++) {
            if (all[n].title) {
              newAll1.push(all[n]);
            }
          }

          let arr2 = [];
          arr2.push(...movies, ...newAll1);
          const selected2 = arr2[ Math.floor(Math.random() * arr2.length) ];
          if (selected2.media_type) {
            this.$router.push(`/to-watch?id=${selected2.id}&media=${selected2.media_type}`);            
          } else {
            const media2 = selected2.title ? 'movie' : 'tv';
            this.$router.push(`/to-watch?id=${selected2.id}&media=${media2}`);
          }
        break;
        case 'tv':
          let newAll2 = [];
          for (let n = 0; n < all.length; n++) {
            if (all[n].name) {
              newAll2.push(all[n]);
            }
          }

          let arr3 = [];
          arr3.push(...tv, ...newAll2);
          const selected3 = arr3[ Math.floor(Math.random() * arr3.length) ];
          if (selected3.media_type) {
            this.$router.push(`/to-watch?id=${selected3.id}&media=${selected3.media_type}`);            
          } else {
            const media3 = selected3.title ? 'movie' : 'tv';
            this.$router.push(`/to-watch?id=${selected3.id}&media=${media3}`);
          }
        break;
      
        default:
        break;
      }
    }
  }
}
</script>

<style>
.randompick-container {
  width: 100%;
}
.pick-options {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.button-container {
  width: 100%;
  margin-top: 40px;
}
.pick-button {
  width: 150px;
  margin: auto;
  padding: 7px;
  font-size: 16px;
  font-family: 'poppins';
}
</style>