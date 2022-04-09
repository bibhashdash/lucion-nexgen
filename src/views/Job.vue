<template>
  <h1>Welcome to job {{ jobId }}</h1>
  <router-link
    :to="{
      name: 'JobInfo',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    >Show Job info</router-link
  >
  <router-link
    :to="{
      name: 'SurveyData',
      params: { jobId: `${jobId}` },
    }"
    :jobId="jobId"
    >Show survey Data</router-link
  >

  <router-link to="/">Back to Home</router-link>
</template>

<script>
import JobInfo from "../views/JobInfo.vue";
import { db } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  components: { JobInfo },
  props: ["jobId"],
  setup(props) {
    const jobInfo = ref(null);
    const surveyData = ref(null);
    const showJobInfo = async () => {
      const docRef = doc(db, "surveyorBD", `${props.jobId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        jobInfo.value = docSnap.data();
        console.log(jobInfo.value);
      } else {
        throw Error("No info for this number exists");
      }
    };

    return {
      jobInfo,
      surveyData,
      showJobInfo,
    };
  },
};
</script>

<style></style>
