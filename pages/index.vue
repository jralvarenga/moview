<template>
  <div>
    <NavBar />
    <div class="main-container">

    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      trending: []
    }
  },
  created() {
    this.test();
    console.log(this.trending);
  },
  methods: {
    async test() {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
      const data = await res.json();
      const trending = data.results;
      console.log(trending);
    }
  }
}
</script>

<style>
.main-container {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
}
</style>
