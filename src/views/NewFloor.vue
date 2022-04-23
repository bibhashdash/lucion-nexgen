<template>
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    >Back to Survey Data</router-link
  >
  <h1>Add a new floor to job {{ jobId }}</h1>
  <form @submit.prevent="createNewFloor">
    <label>Enter a Floor Number</label>
    <input v-model="newFloorSubmission" type="number" name="" id="" />
    <button type="submit">Create floor</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter, useRoute } from "vue-router";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";

export default {
  props: ["jobId"],
  setup(props) {
    const router = useRouter();
    const newFloorSubmission = ref("");
    console.log(props.jobId);
    const createNewFloor = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      const tempObject = await getDoc(docRef);
      for (const [key, value] of Object.entries(tempObject.data().floors)) {
        if (key === `floor${newFloorSubmission.value}`) {
          alert("Error creating floor: Already exists!");
        } else {
          await updateDoc(docRef, {
            [`floors.floor${newFloorSubmission.value}`]: {
              areas: {},
              floorId: newFloorSubmission.value,
            },
          });
        }
        router.push({
          name: "SurveyData",
          params: { jobId: props.jobId },
        });
      }
    };

    return {
      createNewFloor,
      newFloorSubmission,
    };
  },
};
</script>

<style></style>
