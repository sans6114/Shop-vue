<template>
  <!-- component -->

  <!-- Header Navbar -->
  <NavBarShop />

  <!-- View of my page-->
  <router-view></router-view>
  <!-- Footer -->
  <Footer />
</template>

<script setup lang="ts">
import { Footer } from '../components';
import NavBarShop from '../components/NavBarShop.vue';
</script>
