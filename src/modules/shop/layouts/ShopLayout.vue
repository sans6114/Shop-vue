<template>
  <!-- component -->

  <!-- Header Navbar -->
  <NavBar />

  <!-- View of my page-->
  <router-view></router-view>
  <!-- Footer -->
  <Footer />
</template>

<script setup>
import { Footer, NavBar } from '../components'
</script>
