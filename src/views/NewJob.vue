<template>
  <router-link to="/">Back to Home</router-link>
  <h1>Create a new job</h1>
  <form @submit.prevent="createNewJob">
    <div class="form-slot">
      <label>Job Number</label>
      <input v-model="jobNumber" type="number" name="" id="" required />
    </div>
    <div class="form-slot">
      <label>Site Name</label>
      <input v-model="siteName" type="text" name="" id="" required />
    </div>
    <div class="form-slot">
      <label>Site Access</label>
      <input v-model="siteAccess" type="text" name="" id="" required />
    </div>
    <!-- <div class="form-slot">
      <label>Start Date</label>
      <input v-model="startDate" type="datetime" name="" id="" />
    </div> -->
    <!-- <div class="form-slot">
      <label>End Date</label>
      <input v-model="endDate" type="datetime" name="" id="" />
    </div> -->
    <button type="submit">Create Job</button>
  </form>
</template>

<script>
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const jobNumber = ref(null);
    const siteName = ref("");
    const siteAccess = ref("");
    const router = useRouter();
    const createNewJob = async () => {
      await setDoc(doc(db, "surveyorBD", `${jobNumber.value}`), {
        jobInfo: {
          jobNumber: jobNumber.value,
          siteName: siteName.value,
          siteAccess: siteAccess.value,
        },
      }).then(router.push("/"));
    };

    return {
      jobNumber,
      siteName,
      createNewJob,
      siteAccess,
    };
  },
};
</script>

<style></style>
