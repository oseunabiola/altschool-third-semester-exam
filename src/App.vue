<style>
html {
  scroll-behavior: smooth;
}
body,
html,
#app {
  height: 100%;
  overflow: auto;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-size: 100%;
}

img,
picture {
  max-width: 100%;
  display: block;
}
input,
button,
textarea,
select {
  font: inherit;
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
main {
  min-height: 100%;
}
.wrapper {
  --border-radius: 15px;

  margin-inline: auto;
  flex: 0 1 600px;
  max-width: 90%;
  margin-block: 3rem;
  border-radius: var(--border-radius);
}
@media screen and (min-width: 769px) {
  .wrapper {
    max-width: 60%;
  }
}
.fs-300 {
  font-size: 0.7rem;
}
.fs-240 {
  font-size: 0.6rem;
}
.rounded-400 {
  border-radius: 15px;
}
</style>

<template>
  <main class="d-flex justify-content-center align-items-center bg-warning">
    <div class="wrapper py-3 px-4 bg-white">
      <header class="header | mt-3 mb-4">
        <h1 class="fw-bold h2 text-center">HelloDev!</h1>
      </header>
      <router-view />
    </div>
  </main>
</template>
