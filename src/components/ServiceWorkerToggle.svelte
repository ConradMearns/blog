<script>
  import Switch from "./Switch.svelte";
  import { onMount } from "svelte";

  let switchValue;
  $: isEnabled = switchValue === "on";

  onMount(() => {
    isEnabled = localStorage.getItem("swEnabled") === "true";
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  });

  $: {
    localStorage.setItem("swEnabled", isEnabled);
    if (isEnabled) {
      console.log("Registering Service Worker");
      navigator.serviceWorker.register("/service-worker.js");
    } else {
      console.log("Unegistering Service Worker");
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }
  }

</script>

<!-- on:change={toggleSW} -->
<div class="sw-toggle" style="position: fixed; bottom: 20px; right: 20px;">
  <Switch
    bind:value={switchValue}
    label="Service Worker is {switchValue}"
    fontSize={16}
    design="slider"
    {...$$restProps}
  />
</div>

<style>
  /* Add any additional styles here */
  .sw-toggle {
    z-index: 1000;
  }
</style>
