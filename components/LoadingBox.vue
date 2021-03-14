<template>
<div class="loading-screen">
    <div class="loadingAni">
        <img src="~/assets/img/brandname.png" alt="screenImg" class="logo">
        <div class="loading-bar"></div>
    </div>
</div>
</template>

<script>
export default {
  name: "LoadingScreen"
}
</script>

<style>
.loading-screen {
  position: fixed;
  top: 100;
  left: 0;
  width: 100%;
  height: 70vh;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.logo {
  width: 150px;
  height: 24px;
}
.loading-bar {
  width: 150px;
  height: 2px;
  background: var(--background);
  margin-top: 22px;
  position: relative;
  overflow: hidden;
}
.loading-bar::before {
  content: "";
  width: 68px;
  height: 2px;
  background: var(--primary);
  position: absolute;
  left: -34px;
  animation: bluebar 1.5s infinite ease;
}
@keyframes bluebar {
  50% {
    left: 96px;
    background-color: var(--secondary);
  }
  
}
</style>