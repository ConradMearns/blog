<script>
  import { onMount } from "svelte";

  onMount(async () => {
    console.log("howdy");

    const iceServers = [

    ];

    const pc = new RTCPeerConnection();

    pc.onicecandidateerror = (e) => {
      console.error(e);
    };

    pc.onicecandidate = (e) => {
      //   console.log(e);
      if (!e.candidate) return;

      // Display candidate string e.g
      // candidate:842163049 1 udp 1677729535 XXX.XXX.XX.XXXX 58481 typ srflx raddr 0.0.0.0 rport 0 generation 0 ufrag sXP5 network-cost 999
      console.log(e.candidate.candidate);

      // If a srflx candidate was found, notify that the STUN server works!
      if (e.candidate.type == "srflx") {
        console.log("The STUN server is reachable!");
        console.log(`   Your Public IP Address is: ${e.candidate.address}`);
      }

      // If a relay candidate was found, notify that the TURN server works!
      if (e.candidate.type == "relay") {
        console.log("The TURN server is reachable !");
      }
    };

    let sendChannel = pc.createDataChannel("ourcodeworld-rocks");

    function handleSendChannelStatusChange(event) {
      if (sendChannel) {
        const state = sendChannel.readyState;

        if (state === "open") {
          messageInputBox.disabled = false;
          messageInputBox.focus();
          sendButton.disabled = false;
          disconnectButton.disabled = false;
          connectButton.disabled = true;
        } else {
          messageInputBox.disabled = true;
          sendButton.disabled = true;
          connectButton.disabled = false;
          disconnectButton.disabled = true;
        }
      }
    }

    sendChannel.onopen = handleSendChannelStatusChange;
    sendChannel.onclose = handleSendChannelStatusChange;

    pc.createOffer()
      .then((offer) => 
        pc.setLocalDescription(offer)
      )
      .catch((err) => console.log(err));
  });
</script>
