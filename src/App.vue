<style>
body,
html,
#app {
  height: 100%;
  overflow: auto;
}

li {
  list-style-type: none;
}
a {
  text-decoration: none;
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
main {
  min-height: 100%;
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
