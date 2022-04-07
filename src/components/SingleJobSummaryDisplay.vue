<template>
  <div class="single-job-summary-display">
    <router-link
      :to="{
        name: 'Job',

        params: { jobId: singleJob.jobId },
      }"
      >{{ singleJob.jobId }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "SingleJobSummaryDisplay",
  props: ["singleJob"],
};
</script>

<style></style>
