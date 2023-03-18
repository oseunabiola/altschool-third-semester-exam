<script setup>
import { defineProps } from "vue";

const props = defineProps(["repo"]);

function truncate(text) {
  return text ? text.substring(0, 100) + "..." : "";
}

function isForked(fork) {
  return fork ? "Forked" : "Owned";
}
</script>
<template>
  <div class="py-2">
    <h2 class="h6">
      <router-link :to="'/repos/' + props.repo.full_name" class="me-2">
        {{ props.repo.name }}
      </router-link>
      <span v-if="props.repo.private" class="badge rounded-pill bg-success fs-240">Private</span>
      <span v-else class="badge rounded-pill bg-secondary fs-240">Public</span>
    </h2>
    <p class="small">
      {{ truncate(props.repo.description) }}
    </p>
    <div class="d-flex justify-content-between text-secondary fs-300">
      <div>
        <span class="me-4">
          {{ isForked(props.repo.fork) }}
        </span>
        <span> Updated on {{ new Date(props.repo.updated_at).toDateString() }} </span>
      </div>
      <div>
        <span v-if="props.repo.stargazers_count">
          <i class="bi bi-star-fill me-2"></i>
          {{ props.repo.stargazers_count }}
        </span>
        <span v-else><i class="bi bi-star me-2"></i> 0</span>
      </div>
    </div>
  </div>
</template>

<style></style>
