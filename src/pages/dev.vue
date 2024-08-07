<script setup lang="ts">
import Button from "primevue/button"
</script>

<template>
  <t-h>Dev (t-h)</t-h>
  <hr />
  <t-a to="https://google.com">External link to google (t-a to="https://google.com")</t-a>
  <t-a to="/home">Link to Home page (t-a to="/home")</t-a>
  <t-a :to="{ path: '/home' }">Link to Home page (t-a :to="{ path: '/home' }")</t-a>
  <t-a>Mock link (t-a)</t-a>
  <hr />
  <t-btn type="button">Submit</t-btn>
  <Button>Primeve</Button>
</template>
