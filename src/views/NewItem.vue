<template>
  <router-link
    :to="{
      name: 'SurveyArea',
      params: { floorId: `${floorId}`, jobId: `${jobId}`, areaId: `${areaId}` },
    }"
    ><button>⬅️ Back to Survey Area</button>
  </router-link>
  <h1>Let's add a new item</h1>

  <div class="new-item-form">
    <form @submit.prevent="addData" action="">
      <div class="form-slot">
        <label for="">Item name</label>
        <input v-model="itemName" type="text" name="" id="" required />
      </div>
      <div class="form-slot">
        <label for="">Material</label>
        <input v-model="itemMaterial" type="text" name="" id="" required />
      </div>
      <div class="form-slot">
        <label for="">Item Access</label>
        <select v-model="itemAccess" name="" id="" required>
          <option value="full">Full</option>
          <option value="limited">Limited</option>
          <option value="no">No</option>
        </select>
      </div>

      <div class="form-slot">
        <label for="">Suspect Asbestos?</label>
        <select v-model="acmSuspect" name="" id="" required>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div class="form-slot acm-data" v-if="acmSuspect === 'Yes'">
        <div class="sampleid-slot">
          <label for="">Sample number</label>
          <input v-model="sampleId" type="text" />
        </div>
        <div class="acm-scores">
          <div class="score-slot score-product-type">
            <label for="">Product Type</label>
            <select v-model="scoreProductType" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="score-slot score-condition">
            <label for="">Condition</label>
            <select v-model="scoreCondition" name="" id="">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="score-slot score-surfaceTreatment">
            <label for="">Surface Treatment</label>
            <select v-model="scoreSurfaceTreatment" name="" id="">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="score-slot score-asbestosType">
            <label for="">Asbestos Type</label>
            <select v-model="scoreAsbestosType" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-slot">
        <label for="">Item Comments</label>

        <textarea
          v-model="itemComments"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
export default {
  props: ["jobId", "areaId", "floorId", "floorData", "areaName"],
  setup(props) {
    const router = useRouter();
    const itemName = ref("");
    const itemMaterial = ref("");

    const itemAccess = ref("");
    const acmSuspect = ref("");
    const scoreProductType = ref(null);
    const scoreCondition = ref(null);
    const scoreSurfaceTreatment = ref(null);
    const scoreAsbestosType = ref(null);
    const sampleId = ref("");
    const itemComments = ref("");
    const addData = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      await updateDoc(docRef, {
        [`floors.floor${props.floorId}.areas.${props.areaId}.items.${itemName.value}`]:
          {
            itemName: itemName.value,
            itemMaterial: itemMaterial.value,
            itemAccess: itemAccess.value,
            acmSuspect: acmSuspect.value,
            itemComments: itemComments.value,
            acmData: {
              sampleId: sampleId.value,
              scoreProductType: scoreProductType.value,
              scoreCondition: scoreCondition.value,
              scoreSurfaceTreatment: scoreSurfaceTreatment.value,
              scoreAsbestosType: scoreAsbestosType.value,
            },
          },
      });
      router.push({
        name: "SurveyArea",
        params: {
          floorId: `${props.floorId}`,
          jobId: `${props.jobId}`,
          areaId: `${props.areaId}`,
          areaName: `${props.areaName}`,
        },
      });
    };

    return {
      addData,
      itemName,
      itemMaterial,
      acmSuspect,
      scoreProductType,
      scoreCondition,
      scoreSurfaceTreatment,
      scoreAsbestosType,
      itemAccess,
      sampleId,
      itemComments,
    };
  },
};
</script>

<style>
.form-slot {
  margin: 2rem 0;
}
.acm-data {
  border: 1px solid red;
  padding: 1rem;
}
.score-slot {
  margin: 1rem 0;
}
label {
  margin-right: 1rem;
}
</style>
