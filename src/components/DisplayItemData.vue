<template>
  <div class="item-slot">
    <h2>
      <span class="item item-name">{{ ad.itemName }}</span>
      <span class="item item-material">{{ ad.itemMaterial }}</span>
      <span @click="deleteItem">☠️</span>
    </h2>
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
    // console.log(props.ad.itemName, props.ad.itemMaterial);
    const deleteItem = async () => {
      console.log(`You clicked delete on item ${props.ad.itemName}`);
      const collRef = collection(
        db,
        "surveyorBD",
        `${props.jobId}`,
        "surveyData",
        `floor-${props.floorId}`,
        "areas"
      );
      const areasDocsSnap = await getDocs(collRef);
      areasDocsSnap.forEach(async (areasDoc) => {
        if (areasDoc.data().areaInfo.areaId === `${props.areaId}`) {
          const tempDocRef = doc(collRef, `${areasDoc.id}`);
          await updateDoc(tempDocRef, {
            [`items.${props.ad.itemName}`]: deleteField(),
          });
          location.reload();
        }
      });
      //
    };
    return {
      deleteItem,
    };
  },
};
</script>

<style>
.item-slot {
  width: 100%;
  display: flex;
  justify-content: center;
}
.item-slot h2 {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* .item-name {
  justify-self: flex-start;
}
.item-material {
  justify-self: flex-end;
} */
</style>
