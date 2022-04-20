<template>
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    >⬅️ Back to Job Data</router-link
  >
  <h1>Welcome to Floor {{ floorId }}</h1>
  <router-link
    :to="{
      name: 'NewArea',
      params: { jobId: `${jobId}`, floorId: `${floorId}` },
    }"
    ><p>Add a new area</p></router-link
  >
  <ul class="" v-for="fd in floorData" :key="fd">
    <router-link
      :to="{
        name: 'SurveyArea',
        params: {
          jobId: `${jobId}`,
          floorId: `${floorId}`,
          areaId: `${fd.areaInfo.areaId}`,
        },
      }"
      :jobId="jobId"
      :areaId="`${fd.areaInfo.areaId}`"
      :floorId="floorId"
      :floorData="floorData"
      ><li>
        {{ floorId }}/{{ fd.areaInfo.areaId }}/{{ fd.areaInfo.areaName }}
        <span v-if="fd.areaInfo.areaAccess === 'full'">✅</span>
        <span v-else>⛔</span>
      </li></router-link
    >
  </ul>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
export default {
  props: ["jobId", "floorId", "data"],
  setup(props) {
    const floorData = ref([]);
    const showFloorData = async () => {
      const collRef = collection(
        db,
        "surveyorBD",
        `${props.jobId}`,
        "surveyData",
        `floor-${props.floorId}`,
        "areas"
      );
      const docsSnap = await getDocs(collRef);
      docsSnap.forEach((doc) => {
        floorData.value.push(doc.data());
      });
    };
    showFloorData();
    return {
      showFloorData,
      floorData,
    };
  },
};
</script>

<style></style>
