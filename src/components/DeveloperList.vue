<script setup>
import { defineProps } from "vue";
import DeveloperCard from "./DeveloperCard.vue";

const props = defineProps(["developers", "developer"]);
</script>

<template>
  <div class="py-3">
    <template v-if="props.developers">
      <p class="mb-2">
        List of developers matching <span class="fst-italic fw-bold"> {{ developer }}</span>
      </p>
      <ul class="developer-cards | d-grid gap-3 ps-0">
        <template v-for="dev in props.developers" :key="dev.id">
          <li class="developer-card card">
            <DeveloperCard :developer="dev" />
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>
