<script setup lang="ts">
import { post_add_nik } from "@/queries/post_add_nik.query"
import { use_auth } from "@/stores/use_auth.store"
import type { FormKitNode } from "@formkit/core"
import { FormKit, setErrors } from "@formkit/vue"
import Tabs from "primevue/tabs"
import TabList from "primevue/tablist"
import Tab from "primevue/tab"
import TabPanels from "primevue/tabpanels"
import TabPanel from "primevue/tabpanel"

const auth = use_auth()
const handle_submit = async ({ nik }: { nik: string }, node: FormKitNode) => {
  try {
    await post_add_nik(nik)
  } catch (err: any) {
    console.log(err)
    setErrors("settings::add_nik", err)
  }
}
</script>
<template>
  <t-h>Settings</t-h>
  <Tabs :value="!auth.user?.nik ? 'username' : undefined">
    <TabList>
      <Tab value="username">Username</Tab>
      <Tab value="cv-visibility-options">CV visibility options</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="username">
        <t-h :n="5">Username</t-h>
        <FormKit id="settings::add_nik" type="form" @submit="handle_submit">
          <FormKit type="text" name="nik" :value="auth.user?.nik" />
        </FormKit>
      </TabPanel>
      <TabPanel value="cv-visibility-options">
        <t-h :n="5">Visibility options</t-h>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
