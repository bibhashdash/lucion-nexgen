<template>
  <router-link to="/"><button>⬅️ Back to Home</button></router-link>
  <h1>Welcome to job {{ jobId }}</h1>
  <router-link
    class="item-slot"
    :to="{
      name: 'JobInfo',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
  >
    <h2>Show Job info</h2>
  </router-link>
  <router-link
    class="item-slot"
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    ><h2>Show survey Data</h2></router-link
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
