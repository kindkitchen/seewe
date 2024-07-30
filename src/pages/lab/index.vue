<script lang="ts">
import { get_hello_world_query } from "@/queries/get_hello_world.query"
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic"

const load_get_hello_world = defineBasicLoader("/lab/", () => get_hello_world_query())
</script>

<script setup lang="ts">
const { data: hw_data, isLoading, error: hw_error, reload } = load_get_hello_world()
</script>

<template>
  <h1>Lab</h1>
  <pre v-if="isLoading">
    ...loading
  </pre>
  <pre v-else-if="hw_error">{{ hw_error }}</pre>
  <pre v-else>{{ hw_data.message }}</pre>
  <hr />
  <the-button @click="reload()">reload</the-button>
  <div class="h-[200px]"></div>
  <router-link to="/lab/hero">Go to Hero Page</router-link>
  <router-link to="/lab/grid">Go to Grid Lab</router-link>
</template>
