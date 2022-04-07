<template>
  <h1>Welcome to job {{ jobId }}</h1>
  <button @click="showJobInfo">Show job info</button>
  <div class="" v-if="jobInfo">
    <div class="" v-for="values in jobInfo" :key="values">
      <div class="" v-for="(value, k) in values" :key="value">
        {{ k }}: {{ value }}
      </div>
    </div>
  </div>

  <button @click="showSurveyData">Show survey data</button>
  <router-link to="/">Back to Home</router-link>
</template>

<script>
import { db } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
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
