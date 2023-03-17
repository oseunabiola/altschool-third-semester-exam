<script setup>
import { defineProps } from 'vue';

const props = defineProps(['developer'])



</script>
<template>
  <form on-submit="">
    <input
      type="search"
      class="form-control py-3 px-4"
      name="developer"
      id="developer"
      :value="props.developer"
      placeholder="Search developer" />
  </form>
</template>
