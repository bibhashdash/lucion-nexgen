<template>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    ><button>⬅️ Back to Job Dashboard</button>
  </router-link>
  <h1>{{ jobId }}</h1>
  <router-link
    :to="{
      name: 'NewFloor',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    ><button>Add a new floor ➕</button></router-link
  >

  <div class="" v-if="surveyData">
    <ul class="" v-for="data in surveyData" :key="data">
      <router-link
        class="item-slot"
        :to="{
          name: 'Floor',
          params: { floorId: `${data.floorId}` },
        }"
        ><li>
          <h2>View data for floor - {{ data.floorId }}</h2>
        </li></router-link
      >
    </ul>
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
    const surveyData = ref({});
    const showSurveyData = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);

      const doc1 = await getDoc(docRef);

      surveyData.value = doc1.data().floors;
    };
    showSurveyData();

    return {
      surveyData,
    };
  },
};
</script>

<style></style>
