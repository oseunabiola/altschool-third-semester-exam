<script setup>
import { reactive } from "vue";
import RepoList from "../components/RepoList.vue";
import SearchBar from "../components/SearchBar.vue";

const state = reactive({ developerUsername: "oseunabiola" });
</script>

<template>
  <div class="mb-4">
    <SearchBar :developer="state.developerUsername" />
  </div>
  <RepoList :developer="state.developerUsername" />
</template>
