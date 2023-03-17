<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="text-center mb-3">
    <h1 class="fw-bold display-1">404</h1>
    <div class="row col-8 mx-auto">
      <p>Oops! The page you are looking for does not exist yet.</p>
    </div>
    <button class="btn btn-primary" @click="(event) => router.go(-1)">Go back</button>
  </div>
</template>
