<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { floorId: `${floorId}` },
    }"
    ><button>⬅️ Back to Floor</button>
  </router-link>
  <h1>{{ floorId }}/{{ areaId }}/{{ areaName }}</h1>
  <div class="cta-buttons">
    <router-link
      :to="{
        name: 'NewItem',
        params: {
          floorId: `${floorId}`,
          jobId: `${jobId}`,
          areaId: `${areaId}`,
          areaName: `${areaName}`,
        },
      }"
      ><button>Add a new item ➕</button>
    </router-link>
    <router-link
      :to="{
        name: 'EditArea',
        params: {
          jobId: `${jobId}`,
          floorId: `${floorId}`,
          areaId: `${areaId}`,
          areaName: `${areaName}`,
        },
      }"
      ><button>Edit Area</button></router-link
    >
  </div>

  <div class="area-data" v-if="areaData">
    <ul v-for="ad in areaData" :key="ad">
      <li>
        <DisplayItemData
          :ad="ad"
          :jobId="jobId"
          :areaId="areaId"
          :floorId="floorId"
          :areaName="areaName"
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
  props: ["jobId", "areaId", "floorId", "floorData", "areaName"],
  components: { DisplayItemData },
  setup(props) {
    const areaData = ref([]);
    const showAreaData = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      const tempDoc = await getDoc(docRef);
      // console.log(tempDoc.data().floors[`floor${props.floorId}`]);
      for (const [key, value] of Object.entries(
        tempDoc.data().floors[`floor${props.floorId}`].areas[`${props.areaId}`]
          .items
      )) {
        areaData.value.push([value.itemName, value.itemMaterial]);
      }
    };
    showAreaData();
    return {
      areaData,
      showAreaData,
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
  /* display: flex;
  flex-direction: column;
  align-items: center; */
}
.area-data li {
  display: flex;
  justify-content: center;
}
</style>
