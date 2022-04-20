<template>
  <div class="home">
    <h1>Welcome to Nexgen</h1>

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
    <!-- <button @click="showRecentJobs">Show recent jobs</button> -->

    <div class="recent-jobs" v-if="recentJobs">
      <h2>Recent jobs</h2>
      <ul v-for="rj in recentJobs" :key="rj">
        <router-link :to="{ name: 'Job', params: { jobId: rj } }"
          ><li>{{ rj }}</li></router-link
        >

        <!-- <router-link>{{ rj }}</router-link> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import SingleJobSummaryDisplay from "../components/SingleJobSummaryDisplay.vue";
import NewJob from "../views/NewJob.vue";

export default {
  components: { SingleJobSummaryDisplay, NewJob },
  setup() {
    const recentJobs = ref([]);
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

    // retrieve 5 recent jobs
    const showRecentJobs = async () => {
      const collRef = collection(db, "surveyorBD");
      const docsSnap = await getDocs(collRef);
      docsSnap.forEach((doc) => {
        // console.log(doc.data().jobInfo.jobNumber);
        recentJobs.value.push(doc.data().jobInfo.jobNumber);
      });
    };
    showRecentJobs();
    return {
      jobSearchQuery,
      searchForJob,
      errorMessage,
      clearErrorMessage,
      recentJobs,
      showRecentJobs,
    };
  },
};
</script>
