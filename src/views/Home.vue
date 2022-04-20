<template>
  <div class="home">
    <h1>Welcome to Nexgen</h1>
    <!-- <h2>Here is your list of jobs</h2> -->
    <!-- <router-link to="/surveyarea">Go to survey area</router-link> -->
    <!-- <div class="jobNumbersList" v-for="job in jobs" :key="job.jobId">
      <SingleJobSummaryDisplay :singleJob="job" />
    </div> -->
    <router-link to="/newjob">Create a new job</router-link>
    <form @submit.prevent="searchForJob">
      <input
        v-model="jobSearchQuery"
        type="number"
        placeholder="search for a job number"
        required
      />
      <button type="submit">Search</button>
    </form>
    <div class="" v-if="errorMessage">
      {{ errorMessage }} <span @click="clearErrorMessage">❌</span>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import SingleJobSummaryDisplay from "../components/SingleJobSummaryDisplay.vue";
import NewJob from "../views/NewJob.vue";

export default {
  components: { SingleJobSummaryDisplay, NewJob },
  setup() {
    const jobSearchQuery = ref(null);
    const router = useRouter();
    const errorMessage = ref("");
    const searchForJob = async () => {
      const docRef = doc(db, "surveyorBD", `${jobSearchQuery.value}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        router.push({
          name: "Job",
          params: { jobId: `${jobSearchQuery.value}` },
        });
      } else {
        errorMessage.value = "Job not found";
      }
    };
    const clearErrorMessage = () => {
      errorMessage.value = "";
      jobSearchQuery.value = "";
    };

    return { jobSearchQuery, searchForJob, errorMessage, clearErrorMessage };
  },
};
</script>
