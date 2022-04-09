<template>
  <h1>This is the survey data for job {{ jobId }}</h1>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job Dashboard</router-link
  >
</template>

<script>
export default {
  props: ["jobId"],
};
</script>

<style></style>
