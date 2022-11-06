<script setup>
import FoodBookView from "../views/FoodBookView.vue";
import HomeContent from "../components/HomeContent.vue";
</script>

  <!-- <RouterView /> -->
<template>
  <div>
    <HomeContent/>
  </div>
  <div class="cardContainer" id="cardContainer">
    <FoodBookView/>
  </div>
</template>
   