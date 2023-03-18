<script setup>
import DeveloperList from "@/components/DeveloperList.vue";
import ErrorCard from "@/components/ErrorCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";
import useFetch from "@/useFetch";
import { onMounted, reactive, ref } from "vue";

const state = reactive({ developers: [], error: null, isLoading: true, currentSearch: "" });
const username = ref("oseunabiola");
const input = ref(null);

async function getDevelopers() {
  input.value.blur();
  state.developers = [];
  state.isLoading = true;
  const url = `https://api.github.com/search/users?q=${username.value}`;

  try {
    const { data, err } = await useFetch(url);
    state.developers = data;
    state.error = err;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.isLoading = false;
    state.currentSearch = username.value;
  }
}

onMounted(() => {
  state.isLoading = false;
  username.value && getDevelopers();
});
</script>

<template>
  <div class="mb-4">
    <form @submit.prevent="getDevelopers">
      <input
        ref="input"
        type="search"
        class="form-control py-3 px-4"
        name="developer"
        id="developer"
        v-model.trim="username"
        placeholder="Search developer" />
    </form>
  </div>

  <LoadingCard v-if="state.isLoading" />
  <ErrorCard v-if="state.error">
    <p>Oops! Something went wrong. Please try again later</p>
    <p class="mb-0 small">Details:</p>
    <pre>{{ state.error }}</pre>
  </ErrorCard>

  <div v-if="!username" class="text-center my-5">
    <p>Looking for a dev? Search devs with github username</p>
  </div>

  <DeveloperList
    v-if="username"
    :developers="state.developers.items"
    :developer="state.currentSearch" />
</template>
