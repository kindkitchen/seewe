<script setup lang="ts">
import {
  useCodeClient,
  type ImplicitFlowErrorResponse,
  type ImplicitFlowSuccessResponse,
} from "vue3-google-signin"

const emit = defineEmits<{
  success: [res: ImplicitFlowSuccessResponse]
  fail: [res: ImplicitFlowErrorResponse]
}>()

const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
  emit("success", response)
}

const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
  console.error(errorResponse)
  emit("fail", errorResponse)
}

const { isReady, login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
})
</script>

<template>
  <div @click="login">
    <slot v-bind="{ isReady }">
      <tag-link to="#">Login with Google</tag-link>
    </slot>
  </div>
</template>
