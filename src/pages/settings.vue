<script setup lang="ts">
import AddNikForm from "@/forms/AddNikForm.vue";
import { use_auth } from "@/stores/use_auth.store";
import Panel from "primevue/panel";
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";

definePage({
  meta: {
    private: true,
  },
});
const auth = use_auth();
</script>
<template>
  <t-h>Settings</t-h>
  <div class="min-h-[250px]">
    <Tabs :value='!auth.user?.nik ? "username" : "cv-visibility-options"'>
      <TabList>
        <Tab value="username">Username</Tab>
        <Tab value="cv-visibility-options">CV visibility</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="username">
          <t-h :n="5">Username</t-h>
          <p v-if="auth.user?.nik" class="mb-2">
            Your current username is
            <strong>{{ auth.user.nik }}</strong>. Change it below — your
            existing public links will be updated to the new username
            automatically.
          </p>
          <p v-else class="mb-2">
            You don't have a username yet. Set one to unlock named CVs and clean
            public links.
          </p>
          <AddNikForm />

          <Panel header="What does a username give me?" toggleable class="mt-3">
            <ul class="list-disc pl-5">
              <li>Clean public links like <code>/your-name</code>.</li>
              <li>
                Multiple named CVs under one account (<code
                >/your-name/backend</code>, <code>/your-name/design</code>).
              </li>
              <li>One CV can be marked as your default profile page.</li>
            </ul>
          </Panel>
          <Panel
            header="Username + CV name"
            toggleable
            :collapsed="!auth.user?.nik"
            class="mt-2"
          >
            <p>
              Without a username you may keep a single default CV reachable by
              an auto-generated id. With a username, each CV can have its own
              name, and the pair (username, name) forms its unique public link.
            </p>
          </Panel>
          <Panel header="Rules" toggleable collapsed class="mt-2">
            <p>
              3–32 characters; letters, numbers, <code>_</code> and <code
              >-</code>
              only. Usernames are unique across all accounts.
            </p>
          </Panel>
          <Panel
            header="Changing your username"
            toggleable
            collapsed
            class="mt-2"
          >
            <p>
              Renaming updates the links of all your CVs to the new username.
              Anyone holding an old link will no longer reach your CV, so share
              the updated links.
            </p>
          </Panel>
        </TabPanel>

        <TabPanel value="cv-visibility-options">
          <t-h :n="5">CV visibility</t-h>
          <p>
            Visibility is controlled per CV. Open your
            <t-a to="/dashboard">Dashboard</t-a> and use the
            <strong>Published</strong> toggle on each CV to make its public link
            available or hidden, and the <strong>Default</strong> toggle to pick
            the CV shown at <code>/{{ auth.user?.nik || "your-name" }}</code>.
          </p>
          <Panel header="What does 'Published' mean?" toggleable class="mt-3">
            <p>
              A published CV is reachable through its public link and listed on
              your profile page. Unpublishing hides it without deleting it.
            </p>
          </Panel>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
