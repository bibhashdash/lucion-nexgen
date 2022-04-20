<template>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job Dashboard</router-link
  >
  <h1>{{ jobId }}</h1>
  <router-link
    :to="{
      name: 'NewFloor',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    ><p>Add a new floor</p></router-link
  >
  <div v-if="surveyData" class="">
    <div class="" v-for="data in surveyData" :key="data">
      <router-link
        :to="{
          name: 'Floor',
          params: { floorId: `${data.floorId}` },
          props: ['jobId', 'data.floorId', 'data'],
        }"
        ><h2>View data for Floor {{ data.floorId }}</h2></router-link
      >
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
export default {
  props: ["jobId", "floorId"],
  setup(props) {
    const surveyData = ref([]);
    const showSurveyData = async () => {
      const collRef = collection(
        db,
        "surveyorBD",
        `${props.jobId}`,
        "surveyData"
      );
      const docsSnap = await getDocs(collRef);

      docsSnap.forEach((doc) => {
        surveyData.value.push(doc.data());
      });
    };
    showSurveyData();

    return {
      surveyData,
    };
  },
};
</script>

<style></style>
