<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { floorId: `${floorId}` },
    }"
    >Back to Floor</router-link
  >

  <h1 v-if="areaData">{{ areaData.areaInfo.areaName }}</h1>
  <h2>Items</h2>
  <div class="" v-if="areaData">
    <ul v-for="(i, j) in areaData.areaItems" :key="i">
      <li>{{ j }}:{{ i.material }}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  props: ["jobId", "areaId", "floorData", "floorId"],
  setup(props) {
    const areaData = ref(null);
    const showAreaData = async () => {
      const response = await getDoc(doc(db, "surveyorBD", `${props.jobId}`));
      areaData.value =
        response.data().surveyData[`${props.floorId}`][`${props.areaId}`];
    };
    showAreaData();
    return {
      areaData,
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
