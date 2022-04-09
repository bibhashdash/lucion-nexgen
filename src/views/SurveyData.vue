<template>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job Dashboard</router-link
  >
  <h1>{{ jobId }}</h1>
  <div class="" v-for="(data, floorId) in surveyData" :key="data">
    <router-link
      :to="{
        name: 'Floor',
        params: { floorId: `${floorId}` },
        props: ['jobId', 'floorId'],
      }"
      ><h2>View data for Floor {{ floorId }}</h2></router-link
    >
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
