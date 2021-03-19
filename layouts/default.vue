<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
* {
  --vs-primary: 241, 142, 22;
  --vs-secondary: 255, 255, 00;
  --vs-background: 20, 29, 38;
  --vs-text: 255, 255, 255;
  --vs-success: 23, 201, 100;
  --vs-danger: 242, 19, 93;
  --vs-warn: 254, 130, 0;
  --vs-dark: 36, 33, 69;
  --background: #141D26;
  --primary: rgb(241, 142, 22);
  --secondary: rgb(255, 255, 0);
}

@font-face {
  font-family: "poppins";
  src: local("poppins"),
    url(~assets/font/Poppins-Regular.ttf) format("truetype");
}

html {
  font-family: 'poppins';
  color: #fff;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: var(--background);
  overflow-x: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--background);
  cursor: pointer;
}

/* Handle */
::-webkit-scrollbar-thumb {
  transition: 300ms;
  background: var(--primary);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
  cursor: pointer;
}
</style>
