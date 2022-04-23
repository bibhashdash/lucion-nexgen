<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { jobId: `${jobId}`, floorId: `${floorId}` },
    }"
    >⬅️ Back to Floor Data</router-link
  >
  <h1>Create a new area for floor - {{ floorId }}</h1>
  <form @submit.prevent="createNewArea">
    <label>Enter an area Id</label>
    <input
      v-model="newAreaIdSubmission"
      type="text"
      name=""
      id=""
      required
      placeholder="ensure 3 digits for eg. 002"
    />
    <br />
    <br />
    <label>Enter an area name</label>
    <input
      v-model="newAreaNameSubmission"
      type="text"
      name=""
      id=""
      required
      placeholder="for eg. bedroom"
    />
    <br />
    <br />

    <label>Access?</label>
    <input
      v-model="areaAccessSubmission"
      type="text"
      name=""
      id=""
      required
      placeholder="full, limited, or no"
    />
    <br />
    <br />
    <button type="submit">Create area</button>
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
  addDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
export default {
  props: ["jobId", "floorId"],
  setup(props) {
    console.log(props.jobId, props.floorId);
    const router = useRouter();
    const newAreaIdSubmission = ref("");
    const newAreaNameSubmission = ref("");
    const areaAccessSubmission = ref("");

    const createNewArea = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);

      const doc1 = await getDoc(docRef);
      await updateDoc(docRef, {
        [`floors.floor${props.floorId}.areas.${newAreaIdSubmission.value}`]: {
          areaInfo: {
            areaName: newAreaNameSubmission.value,
            areaId: newAreaIdSubmission.value,
            areaAccess: areaAccessSubmission.value,
          },
          items: {},
        },
      });
      router.push({
        name: "Floor",
        params: { jobId: `${props.jobId}`, floorId: `${props.floorId}` },
      });
    };
    return {
      createNewArea,
      newAreaIdSubmission,
      newAreaNameSubmission,
      areaAccessSubmission,
    };
  },
};
</script>

<style></style>
