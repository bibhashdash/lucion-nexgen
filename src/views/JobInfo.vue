<template>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    >Back to Job Dashboard</router-link
  >
  <h1>This is the info for job {{ jobId }}</h1>

  <h2>Site Name: {{ info }}</h2>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  props: ["jobId"],
  setup(props) {
    const info = ref(null);
    const showJobInfo = async () => {
      const response = await getDoc(doc(db, "surveyorBD", `${props.jobId}`));
      // console.log(response.data());
      info.value = response.data().jobInfo.siteName;

      console.log(info.value);
    };
    showJobInfo();
    console.log(info.value);
    return {
      info,
    };
  },
};
</script>

<style></style>
