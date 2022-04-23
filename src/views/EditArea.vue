<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { jobId: `${jobId}`, floorId: `${floorId}` },
    }"
    >⬅️ Back to Floor Data</router-link
  >
  <h1>Edit area - {{ floorId }}/ {{ areaId }} /{{ areaName }}</h1>
  <form @submit.prevent="editCurrentArea">
    <label>Edit area Id</label>
    <input
      v-model="editAreaIdSubmission"
      type="text"
      name=""
      id="editAreaIdSubmission"
      required
      placeholder="for eg. 001"
    />
    <br />
    <br />
    <label>Edit area name</label>
    <input
      v-model="editAreaNameSubmission"
      type="text"
      name=""
      id="editAreaNameSubmission"
      required
      placeholder="for eg. bedroom"
    />
    <br />
    <br />

    <label>Edit area Access?</label>
    <input
      v-model="editAreaAccessSubmission"
      type="text"
      name=""
      id="editAreaAccessSubmission"
      required
      placeholder="full, limited, or no"
    />
    <br />
    <br />
    <button type="submit">Save area</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter, useRoute } from "vue-router";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  deleteField,
} from "firebase/firestore";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["jobId", "floorId", "areaId", "areaName"],
  setup(props) {
    const editAreaIdSubmission = ref(null);
    const editAreaNameSubmission = ref(null);
    const editAreaAccessSubmission = ref(null);
    const router = useRouter();

    // console.log(props.jobId);
    const editCurrentArea = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      // const doc1 = await getDoc(docRef);
      const tempObject = await getDoc(docRef);

      await updateDoc(docRef, {
        [`floors.floor${props.floorId}.areas.${editAreaIdSubmission.value}`]:
          tempObject.data().floors[`floor${props.floorId}`].areas[
            `${props.areaId}`
          ],
        [`floors.floor${props.floorId}.areas.${editAreaIdSubmission.value}.areaInfo.areaAccess`]:
          editAreaAccessSubmission.value,
        [`floors.floor${props.floorId}.areas.${editAreaIdSubmission.value}.areaInfo.areaName`]:
          editAreaNameSubmission.value,
        [`floors.floor${props.floorId}.areas.${editAreaIdSubmission.value}.areaInfo.areaId`]:
          editAreaIdSubmission.value,

        [`floors.floor${props.floorId}.areas.${props.areaId}`]: deleteField(),
      });

      router.push({
        name: "SurveyArea",
        params: {
          jobId: props.jobId,
          floorId: props.floorId,
          areaId: props.areaId,
        },
      });
    };
    return {
      editCurrentArea,
      editAreaIdSubmission,
      editAreaNameSubmission,
      editAreaAccessSubmission,
    };
  },
};
</script>

<style></style>
