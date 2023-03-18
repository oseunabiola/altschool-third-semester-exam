<script setup>
import ErrorCard from "@/components/ErrorCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";
import RepoCard from "@/components/RepoCard.vue";
import useFetch from "@/useFetch";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const developer = useRoute().params.username;
const rowsPerPage = 5;
const state = reactive({
  repos: [],
  isLoading: true,
  error: null,
  currentPage: 1,
  totalResults: 1,
  totalPages: 1,
});

async function getDeveloperRepos() {
  try {
    const { data, err } = await useFetch(`https://api.github.com/users/${developer}/repos`);
    state.repos = data;
    state.error = err;
    state.totalPages = Math.ceil(data.length / rowsPerPage) || 1;
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
        <li
          class="list-group-item"
          v-for="repo in state.repos.slice(
            state.currentPage * rowsPerPage - rowsPerPage,
            state.currentPage * rowsPerPage
          )"
          :key="repo.id">
          <RepoCard :repo="repo" />
        </li>
      </ul>

      <div class="container p-1">
        <div class="d-flex mx-auto">
          <ul class="mx-auto p-1 border-1 rounded-1 pagination">
            <li :class="`page-item ${state.currentPage === 1 ? 'disabled' : ''}`">
              <button
                class="page-link"
                @click="state.currentPage = 1"
                :disabled="state.currentPage === 1">
                <i class="bi bi-chevron-double-left"></i>
              </button>
            </li>
            <li :class="`page-item ${state.currentPage === 1 ? 'disabled' : ''}`">
              <button
                class="page-link"
                @click="state.currentPage = state.currentPage - 1 || 1"
                :disabled="state.currentPage === 1">
                <i class="bi bi-chevron-left"></i>
              </button>
            </li>
            <select
              class="page-link"
              @change="($event) => (state.currentPage = +$event.target.value)">
              <option
                v-for="_page in state.totalPages"
                :value="_page"
                :key="_page"
                :selected="state.currentPage === _page">
                {{ _page }}
              </option>
            </select>
            <li :class="`page-item ${state.currentPage === state.totalPages ? 'disabled' : ''}`">
              <button
                class="page-link"
                @click="
                  state.currentPage =
                    state.currentPage < state.totalPages ? state.currentPage + 1 : state.currentPage
                "
                :disabled="state.currentPage === state.totalPages">
                <i class="bi bi-chevron-right"></i>
              </button>
            </li>
            <li :class="`page-item ${state.currentPage === state.totalPages ? 'disabled' : ''}`">
              <button
                class="page-link"
                @click="state.currentPage = state.totalPages"
                :disabled="state.currentPage === state.totalPages">
                <i class="bi bi-chevron-double-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
