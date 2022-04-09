<template>
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job Data</router-link
  >
  <h1>Welcome to Floor {{ floorId }}</h1>

  <div class="" v-for="(data, areaId) in floorData" :key="data">
    <router-link
      :to="{
        name: 'SurveyArea',
        params: { areaId: `${areaId}` },
        props: ['jobId', 'floorId', 'floorData', 'areaId'],
      }"
      ><h2>
        {{ floorId }}/{{ areaId }}/{{ data.areaInfo.areaName }}
      </h2></router-link
    >
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  props: ["jobId", "floorId"],
  setup(props) {
    const floorData = ref(null);

    const showFloorData = async () => {
      const response = await getDoc(doc(db, "surveyorBD", `${props.jobId}`));

      floorData.value = response.data().surveyData[`${props.floorId}`];
      console.log(floorData.value);
    };
    showFloorData();

    return {
      floorData,
    };
  },
};
</script>

<style></style>
