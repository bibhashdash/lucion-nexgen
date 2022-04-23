<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { jobId: `${jobId}`, floorId: `${floorId}` },
    }"
    >Back to Survey Data</router-link
  >
  <h1>Edit floor</h1>
  <form @submit.prevent="editCurrentFloor">
    <label>Edit Floor Number</label>
    <input
      v-model="editFloorSubmission"
      type="number"
      name=""
      id="edit-floor"
    />
    <button type="submit">Save floor</button>
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

export default {
  props: ["jobId", "floorId", "data"],
  setup(props) {
    const editFloorSubmission = ref(null);
    const router = useRouter();

    // console.log(props.jobId);
    const editCurrentFloor = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      // const doc1 = await getDoc(docRef);
      const tempObject = await getDoc(docRef);

      for (const [key, value] of Object.entries(tempObject.data().floors)) {
        if (key === `floor${props.floorId}`) {
          await updateDoc(docRef, {
            [`floors.floor${editFloorSubmission.value}`]: value,
            [`floors.floor${editFloorSubmission.value}.floorId`]:
              editFloorSubmission.value,
            [`floors.${key}`]: deleteField(),
          });
        }
      }

      router.push({
        name: "SurveyData",
        params: { jobId: props.jobId },
      });
    };
    return {
      editCurrentFloor,
      editFloorSubmission,
    };
  },
};
</script>

<style></style>
