<template>
  <div class="item-slot">
    <h2>
      <span class="item item-name">{{ ad.itemName }}</span>
      <span class="item item-material">{{ ad.itemMaterial }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  props: ["ad"],
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
