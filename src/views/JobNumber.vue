<template>
  <h1>0/001/lobby</h1>
  <router-link to="/newitem">Add a new item</router-link>
  <DisplayAreaData />
</template>

<script>
import DisplayAreaData from "../components/DisplayAreaData.vue";
export default {
  components: { DisplayAreaData },
};
</script>

<style></style>
