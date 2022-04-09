<template>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job Dashboard</router-link
  >
  <h1>This is the survey data for job {{ jobId }}</h1>
  <div class="" v-for="(data, roomId) in surveyData" :key="data">
    <h2>{{ roomId }}</h2>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  props: ["jobId"],
  setup(props) {
    const surveyData = ref(null);
    const showSurveyData = async () => {
      const response = await getDoc(doc(db, "surveyorBD", `${props.jobId}`));
      // console.log(response.data());
      surveyData.value = response.data().surveyData;
    };
    showSurveyData();

    return {
      surveyData,
    };
  },
};
</script>

<style></style>
