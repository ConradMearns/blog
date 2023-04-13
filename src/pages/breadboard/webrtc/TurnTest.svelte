<script>
  import { onMount } from "svelte";

  const checkTURNServer = (turnConfig, timeout = 5000) => {
    return new Promise(async (resolve, reject) => {
      const pc = new RTCPeerConnection({ iceServers: [turnConfig] });
      let promiseResolved = false;
      // Stop waiting after X milliseconds and display the result
      setTimeout(() => {
        if (promiseResolved) return;
        promiseResolved = true;
        resolve(false);
      }, timeout);
      // Create a bogus data channel
      pc.createDataChannel("");
      // Listen for candidates
      pc.onicecandidate = (ice) => {
        if (promiseResolved || ice === null || ice.candidate === null) return;
        console.log(ice.candidate.type);
        if (ice.candidate.type === "relay") {
          promiseResolved = true;
          resolve(true);
        }
      };
      // Create offer and set local description
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
    });
  };

  onMount(async () => {
    checkTURNServer({
      urls: [
        "turn:localhost:3478",
        "turns:localhost:5349",
      ],
      username: "username",
      credential: "password",
      credentialType: "password",
    })
      .then((active) =>
        console.log(
          "Is the TURN server active?",
          active ? "Yes :)" : "Not yet...keep trying ;)"
        )
      )
      .catch((e) => console.error(e));
  });
</script>
