<template>
  <router-link
    :to="{
      name: 'Job',
      params: { jobId: `${jobId}` },
    }"
    ><button>⬅️Back to Job Dashboard</button>
  </router-link>
  <h1>This is the info for job {{ jobId }}</h1>

  <h2>Site Name: {{ siteName }}</h2>
  <h3>Site Access: {{ siteAccess }}</h3>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
export default {
  props: ["jobId"],
  setup(props) {
    const siteName = ref(null);
    const siteAccess = ref(null);
    const showJobInfo = async () => {
      const response = await getDoc(doc(db, "surveyorBD", `${props.jobId}`));
      // console.log(response.data());
      siteName.value = response.data().jobInfo.siteName;
      siteAccess.value = response.data().jobInfo.siteAccess;
    };
    showJobInfo();

    return {
      siteName,
      siteAccess,
    };
  },
};
</script>

<style></style>
