<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const repoOwner = useRoute().params.username;
const repoName = useRoute().params.repoName;

const state = reactive({ repo: {} });

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
  const { data, err } = useFetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
  state.repo = data;
  state.error = err;
}

onMounted(() => {
  getRepo();
});
</script>

<template>
  <div>
    {{ repo }}
  </div>
</template>
