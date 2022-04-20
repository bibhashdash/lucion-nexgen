<template>
  <router-link to="/">⬅️ Back to Home</router-link>
  <h1>Welcome to job {{ jobId }}</h1>
  <router-link
    :to="{
      name: 'JobInfo',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    >Show Job info</router-link
  >
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    >Show survey Data</router-link
  >
</template>

<script>
import JobInfo from "../views/JobInfo.vue";
import SurveyData from "../views/SurveyData.vue";
import { db } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  components: { JobInfo, SurveyData },
  props: ["jobId"],
};
</script>

<style></style>
