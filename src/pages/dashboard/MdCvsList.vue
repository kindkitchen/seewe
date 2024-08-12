<script setup lang="ts">
import { my_fetch } from "@/my_fetch"
import { get_my_mdcvs_query } from "@/queries/get_my_mdcvs.query"
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"

const auth = use_auth()
const md_store = use_md()
const data = await get_my_mdcvs_query()
const mdcvs = data.map((d) => {
  let to!: string
  if (d.as_regulary_by_name_username) {
    to = `${import.meta.env.VITE_API_URL}/${d.as_regulary_by_name_username[0]}/${d.as_regulary_by_name_username[1]}`
  } else if (d.as_default_by_username) {
    to = `${import.meta.env.VITE_API_URL}/${d.as_default_by_username}`
  } else if (d.as_default_by_user_id) {
    to = `${import.meta.env.VITE_API_URL}/id/${auth.user?._id}`
  }

  return {
    ...d,
    to,
  }
})
</script>
<template>
  <ol>
    <li v-for="cv of mdcvs" :key="cv._id">
      <h4>{{ cv.md.substring(0, 20) }}</h4>
      <t-a v-show="cv.to" :to="cv.to">{{ cv.to }}</t-a>
      <div class="flex flex-row gap-2">
        <t-a
          to="/md-cv"
          @click="
            () => {
              md_store.edited_mdcv_id = cv._id
              md_store.edited_str = cv.md
            }
          "
          >Select</t-a
        >
        <t-btn
          @click="
            ;async () => {
              my_fetch({
                method: 'delete',
                path: '/v1/mdcv/:mdcv_id',
                params: { mdcv_id: cv._id },
                res_as: 'none',
              })
            }
            md_store.edited_mdcv_id === cv._id && (md_store.edited_str = '')
            md_store.edited_mdcv_id = undefined
          "
          >Delete</t-btn
        >
      </div>
    </li>
  </ol>
</template>
