<script lang="ts">
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

export const primePlugin = [
  PrimeVue,
  {
    ripple: true,
    theme: {
      preset: Aura,
    },
  },
] as const;

export const ToastServicePlugin = ToastService;

export default {};
</script>

<style>
.p-toast {
  max-width: 70%;
}
</style>
