<template>
  <router-link
    :to="{
      name: 'Floor',
      params: { jobId: `${jobId}`, floorId: `${floorId}` },
    }"
    >⬅️ Back to Floor Data</router-link
  >
  <h1>Edit area - {{ areaId }}/{{ areaName }}</h1>
  <form @submit.prevent="editCurrentArea">
    <label>Edit area Id</label>
    <input
      v-model="editAreaIdSubmission"
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
      v-model="editAreaNameSubmission"
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
      v-model="editAreaAccessSubmission"
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
  updateDoc,
  collection,
  getDocs,
  deleteField,
} from "firebase/firestore";
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

      console.log(
        tempObject.data().floors[`floor${props.floorId}`].areas[
          `${props.areaId}`
        ]
      );

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

      //   router.push({
      //     name: "SurveyData",
      //     params: { jobId: props.jobId },
      //   });
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
