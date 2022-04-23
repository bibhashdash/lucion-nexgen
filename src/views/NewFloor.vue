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
    <br />
    <br />
    <div class="error hidden">Error, floor already exists</div>
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
  terminate,
} from "firebase/firestore";

export default {
  props: ["jobId"],
  setup(props) {
    const router = useRouter();
    const newFloorSubmission = ref(null);
    console.log(props.jobId);
    const createNewFloor = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      const tempObject = await getDoc(docRef);
      if (
        tempObject
          .data()
          .floors.hasOwnProperty(`floor${newFloorSubmission.value}`)
      ) {
        document.querySelector(".error").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".error").classList.add("hidden");
        }, 2000);
        router.push({
          name: "NewFloor",
          params: { jobId: props.jobId },
        });
      } else {
        await updateDoc(
          docRef,
          {
            [`floors.floor${newFloorSubmission.value}`]: {
              areas: {},
              floorId: newFloorSubmission.value,
            },
          },
          { merge: true }
        );
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
