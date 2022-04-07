<template>
  <h1>Add a new item</h1>
  <router-link to="/surveyarea">Back to survey area</router-link>
  <div class="new-item-form">
    <form @submit.prevent="addData" action="">
      <div class="form-slot">
        <label for="">Item name</label>
        <input v-model="itemName" type="text" name="" id="" />
      </div>
      <div class="form-slot">
        <label for="">Material</label>
        <input v-model="material" type="text" name="" id="" />
      </div>
      <div class="form-slot">
        <label for="">Suspect Asbestos?</label>
        <select v-model="suspectAsbestos" name="" id="">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div class="form-slot acm-scores" v-if="suspectAsbestos === 'yes'">
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
            <option value="2">1</option>
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
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const itemName = ref("");
    const material = ref("");
    const suspectAsbestos = ref(null);
    const scoreProductType = ref(null);
    const scoreCondition = ref(null);
    const scoreSurfaceTreatment = ref(null);
    const scoreAsbestosType = ref(null);
    const addData = () => {
      // use Local Storage to store survey data for now
    };
    return {
      itemName,
      material,
      suspectAsbestos,
      scoreProductType,
      scoreCondition,
      scoreSurfaceTreatment,
      scoreAsbestosType,
    };
  },
};
</script>

<style>
.form-slot {
  margin: 2rem 0;
}
.acm-scores {
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
