<template>
  <footer class="footer">
    <img class="tmdb-logo" src="~/assets/img/tmdb.png" alt="">
    <span class="creator">An app by Failedbump</span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
.footer {
  width: 100%;
  margin: auto;
  height: 100px;
  margin-top: 100px;
  margin-bottom: 30px;
  background-color: #0f151b;
  display: flex;
  align-items: center;
  border-radius: 20px;
}
.tmdb-logo {
  width: 120px;
  height: 47px;
  margin-left: 2%;
}
.creator {
  font-size: 18px;
  color: rgb(65, 65, 65);
  margin-left: auto;
  margin-right: 2%;
}

@media only screen and (max-width: 600px) {
  .footer {
    margin-top: 70px;
    height: 80px;
  }
  .tmdb-logo {
    width: 100px;
    height: 39px;
    margin-left: 5%;
  }
  .creator {
    font-size: 13px;
    color: rgb(65, 65, 65);
    margin-left: auto;
    margin-right: 5%;
  }
}
</style>