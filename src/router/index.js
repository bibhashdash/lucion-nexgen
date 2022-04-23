import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SurveyArea from "../views/SurveyArea.vue";
import NewItem from "../views/NewItem.vue";
import Job from "../views/Job.vue";
import NewJob from "../views/NewJob.vue";
import JobInfo from "../views/JobInfo.vue";
import SurveyData from "../views/SurveyData.vue";
import Floor from "../views/Floor.vue";
import NewFloor from "../views/NewFloor.vue";
import EditFloor from "../views/EditFloor.vue";
import NewArea from "../views/NewArea.vue";
import EditArea from "../views/EditArea.vue";

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
    path: "/jobs/:jobId/surveydata/newfloor",
    name: "NewFloor",
    component: NewFloor,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata/:floorId/editfloor",
    name: "EditFloor",
    component: EditFloor,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata/:floorId/newarea",
    name: "NewArea",
    component: NewArea,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata/:floorId/:areaId/:areaName/editarea",
    name: "EditArea",
    component: EditArea,
    props: true,
  },
  {
    path: "/jobs/:jobId/surveydata/:floorId/:areaId/newitem",
    name: "NewItem",
    component: NewItem,
    props: true,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
