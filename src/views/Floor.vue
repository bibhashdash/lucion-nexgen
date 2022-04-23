<template>
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
  >
    <button>⬅️ Back to Job Data</button>
  </router-link>
  <h1>Welcome to Floor {{ floorId }}</h1>
  <div class="cta-buttons">
    <router-link
      :to="{
        name: 'NewArea',
        params: { jobId: `${jobId}`, floorId: `${floorId}` },
      }"
      ><button>Add a new area</button></router-link
    >
    <router-link
      :to="{
        name: 'EditFloor',
        params: { jobId: `${jobId}`, floorId: `${floorId}` },
      }"
      ><button>Edit Floor</button></router-link
    >
  </div>

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

<style>
.cta-buttons {
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
