<script setup lang="ts">
import { post_add_nik } from "@/queries/post_add_nik.query";
import { use_auth } from "@/stores/use_auth.store";
import type { FormKitNode } from "@formkit/core";
import { FormKit, setErrors } from "@formkit/vue";
import Panel from "primevue/panel";
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";
import { useToast } from "primevue/usetoast";
import AddNikForm from "@/forms/AddNikForm.vue";

definePage({
  meta: {
    private: true,
  },
});
const { add } = useToast();
const auth = use_auth();
const handle_submit_visibility_options = async (
  value: unknown,
  node: FormKitNode,
) => {
  add({
    severity: "warn",
    summary: "Not implemented yet",
    detail: "This feature is not implemented yet",
    life: 2000,
  });
};
</script>
<template>
  <t-h>Settings</t-h>
  <div class="min-h-[250px] bg-emerald-50">
    <Tabs :value='!auth.user?.nik ? "username" : "cv-visibility-options"'>
      <TabList>
        <Tab value="username">Username</Tab>
        <Tab value="cv-visibility-options">CV visibility options</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="username">
          <t-h :n="5">Username</t-h>
          <AddNikForm />
          <Panel
            header="What benefits the 'username' is give me?"
            toggleable
            :collapsed="!!auth.user?.nik"
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              facilis quos asperiores perspiciatis quidem quibusdam sequi error
              consequatur minima minus necessitatibus, a quasi exercitationem
              ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
          <Panel
            header="The real power of combining 'username' and CV 'name'"
            toggleable
            :collapsed="!auth.user?.nik"
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              facilis quos asperiores perspiciatis quidem quibusdam sequi error
              consequatur minima minus necessitatibus, a quasi exercitationem
              ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
          <Panel header="The simple rules of 'username'" toggleable collapsed>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              facilis quos asperiores perspiciatis quidem quibusdam sequi error
              consequatur minima minus necessitatibus, a quasi exercitationem
              ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
          <Panel
            header="What I should to know before deleting or changing my username?"
            toggleable
            collapsed
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              facilis quos asperiores perspiciatis quidem quibusdam sequi error
              consequatur minima minus necessitatibus, a quasi exercitationem
              ducimus dignissimos hic? Id, consequuntur maxime.
            </p>
          </Panel>
        </TabPanel>
        <TabPanel value="cv-visibility-options">
          <t-h :n="5">Visibility options</t-h>
          <FormKit
            type="form"
            id="settings::visibility-options"
            #default="{ value }"
            @submit="handle_submit_visibility_options"
          >
            <FormKit
              type="checkbox"
              label="Make all my public CV visible"
              help="When you stop your job researches it is very simple to make your CV invisible to everyone in one click"
              name="public-are-public"
              :value="true"
            />
          </FormKit>
          <Panel header="What is this?" toggleable>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              amet perspiciatis at, placeat maiores saepe ipsam reiciendis
              aliquid nihil aut cumque totam sequi. Alias consequatur excepturi
              nostrum laudantium ipsum placeat.
            </p>
          </Panel>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
