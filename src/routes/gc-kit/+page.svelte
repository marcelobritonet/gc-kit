<script>
  import { page } from '$app/stores';
  import { onMount } from "svelte";
  import { retrieveStorageDataByHash } from "./+layout.js";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const hash = $page.url.searchParams.get('gc');
    const { type } = retrieveStorageDataByHash(hash)
    await goto(`/gc-kit/${ type }?gc=${ hash }`)
  });

</script>
