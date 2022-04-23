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

  <div class="" v-if="floorData">
    <ul v-for="fd in floorData" :key="fd">
      <router-link
        :to="{
          name: 'SurveyArea',
          params: {
            jobId: `${jobId}`,
            floorId: `${floorId}`,
            areaId: `${fd[0]}`,
            areaName: `${fd[1]}`,
          },
        }"
      >
        <li>
          {{ floorId }}/{{ fd[0] }}/{{ fd[1] }}
          <span v-if="fd[2] != 'full'">⛔</span>
        </li></router-link
      >
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default {
  props: ["jobId", "floorId"],

  setup(props) {
    const floorData = ref([]);

    const showFloorData = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      const docsSnap = await getDoc(docRef);
      // console.log(typeof docsSnap.data().floors);
      for (const [key, value] of Object.entries(docsSnap.data().floors)) {
        if (key === `floor${props.floorId}`) {
          // console.log(value.areas);
          for (const [k, v] of Object.entries(value.areas)) {
            // console.log(v);
            // console.log(v.areaInfo.areaId, v.areaInfo.areaName);
            floorData.value.push([
              v.areaInfo.areaId,
              v.areaInfo.areaName,
              v.areaInfo.areaAccess,
            ]);
          }
        }
      }
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
