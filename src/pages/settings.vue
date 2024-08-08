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
import Panel from "primevue/panel"
import { useToast } from "primevue/usetoast"

const { add } = useToast()
const auth = use_auth()
const handle_submit = async ({ nik }: { nik: string }, node: FormKitNode) => {
  try {
    await post_add_nik(nik)
    add({ severity: "success", detail: `Hi there! ${nik}!`, summary: "Cool!", life: 2000 })
  } catch (err: any) {
    console.log(err)
    setErrors("settings::add_nik", err)
    add({
      severity: "warn",
      summary: "Unable to set username",
      detail: "See error messages",
      life: 2000,
    })
  }
}
</script>
<template>
  <t-h>Settings</t-h>
  <div class="min-h-[250px] bg-emerald-50">
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
          <Panel
            header="What benefits the 'username' is give me?"
            toggleable
            :collapsed="!!auth.user?.nik"
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui facilis quos asperiores
              perspiciatis quidem quibusdam sequi error consequatur minima minus necessitatibus, a
              quasi exercitationem ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
          <Panel
            header="The real power of combining 'username' and CV 'name'"
            toggleable
            :collapsed="!auth.user?.nik"
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui facilis quos asperiores
              perspiciatis quidem quibusdam sequi error consequatur minima minus necessitatibus, a
              quasi exercitationem ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
          <Panel header="The simple rules of 'username'" toggleable collapsed>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui facilis quos asperiores
              perspiciatis quidem quibusdam sequi error consequatur minima minus necessitatibus, a
              quasi exercitationem ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
          <Panel
            header="What I should to know before deleting or changing my username?"
            toggleable
            collapsed
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui facilis quos asperiores
              perspiciatis quidem quibusdam sequi error consequatur minima minus necessitatibus, a
              quasi exercitationem ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
        </TabPanel>
        <TabPanel value="cv-visibility-options">
          <t-h :n="5">Visibility options</t-h>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
