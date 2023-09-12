<script>
  import { onMount } from "svelte";
  export let slug;

  import { marked } from "marked";
  import { make_extension } from "./marked_wiki.js";

  const get_content = async (slug) => {
    const network = "127.0.0.1:5000";
    const response = await fetch(`http://${network}/get/${slug}`);
    const blob = await response.blob();
    return blob;
  };

  const wrapper = (slot) => {
    return `<div class="p-4 border border-slate-900">${slot}</div>`
  };

  marked.use(make_extension(get_content, marked, wrapper));

  let blob = null;
  onMount(async () => {
    blob = await get_content(slug);
  });
</script>

{#await blob}
  loading...
{:then data}
  <!-- {data} -->

  {#if data && data.type.match("image.*")}
    <img src={URL.createObjectURL(data)} />
  {/if}

  {#if data && data.type.match("text.*")}
    {#await data.text() then text}
      {#await marked.parse(text) then html}
        {@html html}
      {/await}
    {/await}
  {/if}
{/await}
