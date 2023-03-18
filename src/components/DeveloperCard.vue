<script setup>
import { defineProps } from "vue";

const props = defineProps(["developer"]);
</script>
<template>
  <router-link :to="'/repos/' + props.developer.login" class="text-center text-dark">
    <div class="col-6 mx-auto my-3">
      <img class="rounded-circle" :src="props.developer.avatar_url" alt="" />
    </div>
    <div class="mb-2">
      <p class="fw-bold mb-0">
        {{ props.developer.login }}
      </p>
    </div>
  </router-link>
</template>

<style></style>
