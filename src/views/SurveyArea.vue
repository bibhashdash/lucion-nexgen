<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { floorId: `${floorId}` },
    }"
    >⬅️ Back to Floor</router-link
  >
  <h1>{{ floorId }}/{{ areaId }}</h1>
  <router-link
    :to="{
      name: 'NewItem',
      params: {
        floorId: `${floorId}`,
        jobId: `${jobId}`,
        areaId: `${areaId}`,
      },
    }"
    >Add a new item</router-link
  >
  <div class="area-data" v-if="areaData">
    <ul v-for="ad in areaData" :key="ad">
      <li>
        <DisplayItemData
          :ad="ad"
          :jobId="jobId"
          :areaId="areaId"
          :floorId="floorId"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import DisplayItemData from "../components/DisplayItemData.vue";
export default {
  props: ["jobId", "areaId", "floorId", "floorData"],
  components: { DisplayItemData },
  setup(props) {
    const areaData = ref(null);
    const areaFirebaseId = ref("");
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
      areasDocsSnap.forEach(async (areasDoc) => {
        if (areasDoc.data().areaInfo.areaId === `${props.areaId}`) {
          areaData.value = areasDoc.data().items;
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
  padding: 0;
}
.area-data {
  width: 100%;
}
</style>
