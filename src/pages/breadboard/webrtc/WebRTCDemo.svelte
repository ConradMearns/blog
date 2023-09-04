<script lang="ts">
  import { onMount } from "svelte";

  let channel;

  let alice: RTCPeerConnection;
  let bob: RTCPeerConnection;

  let conn: RTCPeerConnection;
  let candidate_display: [RTCIceCandidate] = [];
  let localDescription_text: string = "";

  let remoteDescription_text:string = ""
  let remoteDescription = undefined
  $: try {
    remoteDescription = JSON.parse(remoteDescription_text)
  } catch (error) {
    remoteDescription = undefined
  }

  async function setRemote() {
    if (remoteDescription_text == localDescription_text) {
      console.log("Shouldn't use local description!")
      alert("Shouldn't use local description!")
      return
    }
    await conn.setRemoteDescription(remoteDescription)
    const answer = await conn.createAnswer()
    await conn.setLocalDescription(answer)

  }

  onMount(async () => {
    // alice = new RTCPeerConnection();
    // // channel = alice.createDataChannel("mydata");    //create a bogus data channel
    // // let offer = await alice.createOffer()
    // // await alice.setLocalDescription(new RTCSessionDescription(offer))
    // alice.onicecandidate = function (ice) {
    //   //listen for candidate events
    //   if (!ice || !ice.candidate || !ice.candidate.candidate) return;
    //   console.log("my data: ", ice.candidate.candidate);
    // };

    conn = new RTCPeerConnection();
    channel = conn.createDataChannel("dc");
    const offer = await conn.createOffer();
    await conn.setLocalDescription(new RTCSessionDescription(offer));

    conn.onicecandidate = function (ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      candidate_display.push(ice.candidate);
      candidate_display = candidate_display;
    };

    console.log(conn.localDescription);
    localDescription_text = JSON.stringify( conn.localDescription?.toJSON() );

    // alice = new RTCPeerConnection();
    // bob = new RTCPeerConnection();
    // alice
    //   .createOffer()
    //   .then((offer) =>
    //     alice.setLocalDescription(new RTCSessionDescription(offer))
    //   )
    //   .then(() => {
    //     channel = alice.createDataChannel("data");
    //     // channel.onopen = event => console.log('onopen', event)
    //     // channel.onmessage = event => console.log('onmessage', event)
    //     channel.onmessage = (event) => alert(event.data);
    //   })
    //   .then(() => {
    //     console.log("setting up callbacks");
    //     alice.onicecandidate = (ev) => {
    //       console.log("changing");
    //     };
    //     bob.onicecandidate = (ev) => {
    //       console.log("changing");
    //     };
    //   })
    //   .then(() => bob.setRemoteDescription(alice.localDescription))
    //   .then(() => bob.createAnswer())
    //   .then((answer) => {
    //     console.log(answer);
    //     return bob.setLocalDescription(new RTCSessionDescription(answer));
    //   })
    //   .then(() => alice.setRemoteDescription(bob.localDescription))
    //   .then(() => console.log(bob.localDescription));
  });
</script>

<table>
  {#each candidate_display as c}
    <tr>
      <pre>
      {c.candidate}
    </pre>
    </tr>
  {/each}
</table>

[Create offer] or [Use Remote Answer]

<br />

<button on:click={() => navigator.clipboard.writeText(localDescription_text)}>Copy</button>
<pre>{localDescription_text}</pre>

<br />

<input bind:value={remoteDescription_text}>
<pre>{JSON.stringify(remoteDescription)}</pre>

<button on:click={setRemote}>Set Remote Description</button>


<style>
  tr pre {
    margin: 0;
    line-height: 1;
  }
  table {
    border: 1px solid black;
  }
</style>
