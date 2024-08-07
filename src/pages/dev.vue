<script setup lang="ts">
import { FormKit } from "@formkit/vue"
</script>

<template>
  <t-h>Dev (t-h)</t-h>
  <hr />
  <t-a to="https://google.com">External link to google (t-a to="https://google.com")</t-a>
  <t-a to="/home">Link to Home page (t-a to="/home")</t-a>
  <t-a :to="{ path: '/home' }">Link to Home page (t-a :to="{ path: '/home' }")</t-a>
  <t-a>Mock link (t-a)</t-a>
  <hr />
  <FormKit type="button">Submit</FormKit>
</template>
