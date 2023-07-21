<script setup>
import { RouterView } from 'vue-router'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const greaterSM = breakpoints.greater('sm')

</script>

<template>
  <main v-if="greaterSM" class="">
    <RouterView />
  </main>
  <div v-else class="flex items-center justify-center h-screen">
    <div class="w-full h-96">
      <img src="./components/icons/plug-pana.svg" alt="" class="px-4 mb-16">
      <h1 class=" text-center text-slate-700 px-8">
        Vous ne pouvez pas utiliser cette App depuis un mobile
      </h1>
      <div class="absolute bottom-0 flex justify-center w-full py-8">
        <a href="https://vistin-portfolio.netlify.app/" class="inline-flex mx-auto text-center items-center text-slate-700 space-x-2">
          <span>@Craillon</span>
          <img src="./components/icons/image-1000x1000.jpg" alt="designer image" class="w-10 h-10 rounded-full">
        </a>
      </div>
    </div>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

* {
  font-family: 'Ubuntu', sans-serif;
}
</style>
