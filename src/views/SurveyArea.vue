<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { floorId: `${floorId}` },
    }"
    >Back to Floor</router-link
  >
  <h1>{{ floorId }}/{{ areaId }}</h1>
  <ul v-for="ad in areaData" :key="ad">
    <li>{{ ad }}</li>
  </ul>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
export default {
  props: ["jobId", "areaId", "floorId", "floorData"],
  setup(props) {
    const areaData = ref([]);
    const showAreaData = async () => {
      const areasCollRef = collection(
        db,
        "surveyorBD",
        `${props.jobId}`,
        "surveyData",
        `floor-${props.floorId}`,
        "areas"
      );

      const areasDocsSnap = await getDocs(areasCollRef);
      areasDocsSnap.forEach((areasDoc) => {
        if (areasDoc.data().areaInfo.areaId === `${props.areaId}`) {
          console.log(areasDoc.data().areaInfo.areaId, areasDoc.id);

          const tempCollRef = collection(
            areasCollRef,
            `${areasDoc.id}`,
            "items"
          );
          console.log(tempCollRef);

          const tempDocsSnap = getDocs(tempCollRef);
          console.log(Object.values(tempDocsSnap));
        }
      });
    };
    showAreaData();
    return {
      showAreaData,
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
