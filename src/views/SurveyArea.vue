<template>
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job</router-link
  >
  <h1>{{ areaName }}</h1>
  <ul v-for="(material, item) in areaData" :key="material">
    <li v-if="material != `${areaName}`">{{ item }}: {{ material }}</li>
  </ul>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  props: ["jobId", "areaId"],
  setup(props) {
    const areaData = ref(null);
    const areaName = ref(null);
    const showAreaData = async () => {
      const response = await getDoc(doc(db, "surveyorBD", `${props.jobId}`));

      areaData.value = response.data().surveyData[`${props.areaId}`];
      areaName.value = response.data().surveyData[`${props.areaId}`].areaName;
    };
    showAreaData();

    return {
      areaData,
      areaName,
    };
  },
};
</script>

<style>
ul,
li {
  list-style: none;
}
</style>
