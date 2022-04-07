import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SurveyArea from "../views/SurveyArea.vue";
import NewItem from "../views/NewItem.vue";
import Job from "../views/Job.vue";
import NewJob from "../views/NewJob.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/newjob",
    name: "NewJob",
    component: NewJob,
  },
  {
    path: "/jobs/:jobId",
    name: "Job",
    component: Job,
    props: true,
  },
  // {
  //   path: "/surveyarea",
  //   name: "SurveyArea",
  //   component: SurveyArea,
  // },
  // {
  //   path: "/newitem",
  //   name: "NewItem",
  //   component: NewItem,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
