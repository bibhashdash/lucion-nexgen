import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SurveyArea from "../views/SurveyArea.vue";
import NewItem from "../views/NewItem.vue";
import Job from "../views/Job.vue";
import NewJob from "../views/NewJob.vue";
import JobInfo from "../views/JobInfo.vue";
import SurveyData from "../views/SurveyData.vue";
import Floor from "../views/Floor.vue";

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
  {
    path: "/jobs/:jobId/jobinfo",
    name: "JobInfo",
    component: JobInfo,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata",
    name: "SurveyData",
    component: SurveyData,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata/:floorId/:areaId",
    name: "SurveyArea",
    component: SurveyArea,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata/:floorId",
    name: "Floor",
    component: Floor,
    props: true,
  },
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
