<script lang="ts">
  import { onMount } from "svelte";

  let alice: RTCPeerConnection;
  let bob: RTCPeerConnection;

  let alice_dc: RTCDataChannel;
  let bob_dc: RTCDataChannel;

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

    // conn = new RTCPeerConnection();
    // channel = conn.createDataChannel("dc");
    // const offer = await conn.createOffer();
    // await conn.setLocalDescription(new RTCSessionDescription(offer));

    // conn.onicecandidate = function (ice) {
    //   if (!ice || !ice.candidate || !ice.candidate.candidate) return;
    //   candidate_display.push(ice.candidate);
    //   candidate_display = candidate_display;
    // };

    // console.log(conn.localDescription);
    // localDescription_text = JSON.stringify( conn.localDescription?.toJSON() );

    alice = new RTCPeerConnection();
    bob = new RTCPeerConnection();

    console.log(alice)
    console.log(bob)

    alice_dc = alice.createDataChannel("alice_dc");
    alice.onicecandidateerror = console.log;
    alice.onicegatheringstatechange = console.log;
    alice.oniceconnectionstatechange = console.log;
    alice.onicecandidate = console.log;

    alice
      .createOffer()
      .then((offer) =>
        alice.setLocalDescription(new RTCSessionDescription(offer))
      )
      .then(() => bob.setRemoteDescription(alice.localDescription))
      .then(() => bob.createAnswer())
      .then((answer) => {
        return bob.setLocalDescription(new RTCSessionDescription(answer));
      })
      .then(() => alice.setRemoteDescription(bob.localDescription))
  });
</script>
