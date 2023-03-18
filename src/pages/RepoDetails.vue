<script setup>
import ErrorCard from "@/components/ErrorCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const repoOwner = useRoute().params.username;
const repoName = useRoute().params.repoName;

const state = reactive({ repo: null, error: null, loading: false });

async function useFetch(url) {
  let data, err;

  try {
    let result = await fetch(url);
    if (!result.ok) {
      result = await result.json();
      throw new Error(result.message);
    }
    result = await result.json();
    data = result;
  } catch (error) {
    err = error.message;
  }

  return { data, err };
}

async function getRepo() {
  state.loading = true;
  const { data, err } = await useFetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
  state.repo = data;
  state.error = err;
  state.loading = false;
}

onMounted(() => {
  getRepo();
});
</script>

<template>
  <LoadingCard v-if="state.loading" />
  <ErrorCard v-if="state.error">
    Oops! Something went wrong, please try again.
    <p class="mb-0 small">Details:</p>
    <pre>{{ state.error }}</pre>
  </ErrorCard>
  <div v-if="state.repo" class="mb-4">
    <div>
      <button class="text-decoration-underline btn" @click="$router.back()">&larr; Back</button>
    </div>
    <div class="repo-owner | d-flex flex-column justify-content-center mb-4">
      <div class="col-6 col-md-4 col-lg-4 mx-auto mb-3">
        <img
          class="rounded-circle"
          :src="state.repo.owner.avatar_url"
          :alt="'likely picture of ' + state.repo.owner.login" />
      </div>
      <div class="col-12 col-md-8 col-lg-8 mx-auto text-center">
        <p class="mb-1">
          <span class="fw-bold">Name: </span>
          {{ state.repo.owner.login }}
        </p>
        <p>
          <span class="fw-bold">Github profile: </span>
          <a :href="state.repo.owner.html_url" target="_blank" rel="noopener noreferrer">
            {{ state.repo.owner.html_url }}
          </a>
        </p>
      </div>
    </div>

    <div class="repo-details text-center mb-4">
      <h2 class="mb-3 fw-bold">{{ state.repo.name }}</h2>
      <div class="text-secondary fst-italic small">
        <p class="mb-1">Last updated: {{ new Date(state.repo.updated_at).toDateString() }}</p>
        <p v-if="state.repo.fork">
          Forked from:
          <a :href="state.repo.parent.html_url" target="_blank" rel="noopener noreferrer">
            {{ state.repo.parent.full_name }}
          </a>
        </p>
      </div>
      <p v-if="state.repo.description" class="px-3">{{ state.repo.description }}</p>
      <p v-else class="px-3 fst-italic">No repo description</p>
      <div class="d-flex flex-wrap justify-content-center">
        <div class="me-2 p-3 px-4 text-center rounded-400 bg-warning">
          <span class="fs-2 fw-bold d-block">
            {{ state.repo.stargazers_count }}
          </span>
          <i class="bi bi-star-fill"></i> Stars
        </div>
        <div class="me-2 p-3 px-4 text-center rounded-400 bg-warning">
          <span class="fs-2 fw-bold d-block">
            {{ state.repo.watchers_count }}
          </span>
          <i class="bi bi-eye-fill"></i> Watch
        </div>
        <div class="me-2 p-3 px-4 text-center rounded-400 bg-warning">
          <span class="fs-2 fw-bold d-block">
            {{ state.repo.forks_count }}
          </span>
          <i class="bi bi-diagram-2-fill"></i> Forks
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center mx-auto">
      <a :href="state.repo.html_url" target="_blank" rel="noopener noreferrer">
        <button class="btn btn-primary">View repo on github</button>
      </a>
    </div>
  </div>
</template>
