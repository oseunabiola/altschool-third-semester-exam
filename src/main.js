import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import NotFound from "./pages/NotFound.vue";
import RepoDetails from "./pages/RepoDetails.vue";
import Search from "./pages/SearchPage.vue";

const routes = [
  { path: "/", component: Search, name: "search" },
  { path: "/repo/:username/:repoName", component: RepoDetails, name: "repo" },
  { path: "/:pathMatch(.*)*", component: NotFound, name: "not-found" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
