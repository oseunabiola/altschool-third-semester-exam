<script setup>
import ErrorCard from "@/components/ErrorCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";
import RepoCard from "@/components/RepoCard.vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const developer = useRoute().params.username;
const state = reactive({ repos: [], isLoading: true, error: null });

async function getDeveloperRepos() {
  try {
    let result = await fetch(`https://api.github.com/users/${developer}/repos`);
    if (!result.ok) {
      result = await result.json();
      throw new Error(result.message);
    }
    result = await result.json();
    state.repos = result;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.isLoading = false;
  }
}

onMounted(() => {
  getDeveloperRepos();
});
</script>

<template>
  <div class="py-3">
    <LoadingCard v-if="state.isLoading" />
    <ErrorCard v-if="state.error">
      <p>Oops! Something went wrong. Please try again later</p>
      <p class="mb-0 small">Details:</p>
      <pre>{{ state.error }}</pre>
    </ErrorCard>

    <template v-if="state.repos.length">
      <p class="fw-bold mb-1">List of repos by {{ developer }}</p>
      <ul class="ps-0 list-group">
        <template v-for="repo in state.repos" :key="repo.id">
          <li class="list-group-item">
            <RepoCard :repo="repo" />
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>
