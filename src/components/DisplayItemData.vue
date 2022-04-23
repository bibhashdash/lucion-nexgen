<template>
  <div class="item-slot">
    <h3>
      <span class="item item-name">{{ ad[0] }}</span>
      <span class="item item-material">{{ ad[1] }}</span>
      <!-- <span @click="deleteItem">☠️</span> -->
    </h3>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
export default {
  props: ["ad", "jobId", "areaId", "floorId"],
  setup(props) {
    // const deleteItem = async () => {
    //   const collRef = collection(
    //     db,
    //     "surveyorBD",
    //     `${props.jobId}`,
    //     "surveyData",
    //     `floor-${props.floorId}`,
    //     "areas"
    //   );
    //   const areasDocsSnap = await getDocs(collRef);
    //   areasDocsSnap.forEach(async (areasDoc) => {
    //     if (areasDoc.data().areaInfo.areaId === `${props.areaId}`) {
    //       const tempDocRef = doc(collRef, `${areasDoc.id}`);
    //       await updateDoc(tempDocRef, {
    //         [`items.${props.ad.itemName}`]: deleteField(),
    //       });
    //       location.reload();
    //     }
    //   });
    // };
    // return {
    //   deleteItem,
    // };
  },
};
</script>

<style>
.item-slot {
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.351);
  border-radius: 5px;
  position: relative;
}
.item-slot h3 {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-slot h2 span {
  cursor: pointer;
}
.hidden {
  display: none;
}
.modal {
  position: absolute;
  z-index: 5;

  /* */
}
.modal-bg {
  /* position: absolute; */
  top: 0;
  left: 0;
  background-color: rgba(53, 53, 53, 0.454);
  backdrop-filter: blur(2px);
  width: 100vw;
  height: 100vh;
}
.modal-content {
  z-index: 8;
  position: absolute;
}

/* .item-name {
  justify-self: flex-start;
}
.item-material {
  justify-self: flex-end;
} */
</style>
