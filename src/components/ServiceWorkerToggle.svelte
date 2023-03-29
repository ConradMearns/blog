<script>
  import Switch from "./Switch.svelte";
  import { onMount } from "svelte";
  import ParseGet from "src/pages/breadboard/share_targets/ParseGet.svelte";

  let mounted = false;

  let switchValue = localStorage.getItem("swEnabled") === "true" ? "on" : "off";
  $: isEnabled = switchValue === "on";

  onMount(() => {
    isEnabled = localStorage.getItem("swEnabled") === "true";
    console.log('isEnabled', isEnabled)
    if (isEnabled) {
      // switchValue = "on"
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js");
      }
    } else {
      // switchValue = "off"
    }
    mounted = true;
  });

  $: {
    if (mounted) {
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
