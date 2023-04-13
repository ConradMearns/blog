<script>
  import { onMount } from "svelte";

  const config = {
    iceServers: [
      {
        urls: "stun:localhost:3478",
        username: "username",
        password: "password",
      },
      //   { urls: "stun:stun.l.google.com:19302" },
      //   { urls: "stun:stun1.l.google.com:19302" },
      //   { urls: "stun:stun2.l.google.com:19302" },
    ],
  };

  let channel = null;
  let connection = null;

  // Used to be ID elements
  let connectionState = "unknown";
  let iceConnectionState = "unknown";

  onMount(async () => {
    console.log("mounted");
    connection = new RTCPeerConnection();

    console.log(connection);

    connection.ondatachannel = (event) => {
      console.log("ondatachannel");
      channel = event.channel;
      channel.onmessage = (event) => alert(event.data);
    };

    connection.onconnectionstatechange = (event) => {
      console.log("onconnectionstatechange");
      console.log(event);
      connectionState = JSON.stringify(connection.connectionState);
    };

    connection.oniceconnectionstatechange = (event) => {
      console.log(event);
      iceConnectionState = JSON.stringify(connection.iceConnectionState);
    };
  });

  async function step_1_initiator_create_offer() {
    channel = connection.createDataChannel("data");
    // channel.onopen = event => console.log('onopen', event)
    // channel.onmessage = event => console.log('onmessage', event)
    channel.onmessage = (event) => alert(event.data);

    connection.onicecandidate = (event) => {
      // console.log('onicecandidate', event)
      if (!event.candidate) {
        document.getElementById("createdOffer").value = JSON.stringify(
          connection.localDescription
        );
        document.getElementById("createdOffer").hidden = false;
      }
    };

    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
  }

  async function step_2_accept_remote_offer() {
    console.log('trying to accept')
    const offer = JSON.parse(document.getElementById("remoteOffer").value);
    await connection.setRemoteDescription(offer);
  }

  async function step_3_create_answer() {
    connection.onicecandidate = (event) => {
      // console.log('onicecandidate', event)
      if (!event.candidate) {
        document.getElementById("createdAnswer").value = JSON.stringify(
          connection.localDescription
        );
        document.getElementById("createdAnswer").hidden = false;
      }
    };

    const answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);
  }

  async function step_4_accept_answer() {
    const answer = JSON.parse(document.getElementById("remoteAnswer").value);
    await connection.setRemoteDescription(answer);
  }

  async function send_text() {
    const text = document.getElementById("text").value;

    channel.send(text);
  }
</script>

<table width="100%" border="1">
  <tr>
    <th>#</th>
    <th>initiator</th>
    <th>peer</th>
  </tr>
  <tr>
    <td>step 1</td>
    <td>
      <button on:click={step_1_initiator_create_offer}>create offer</button>
      <input id="createdOffer" type="text" hidden />
    </td>
    <td />
  </tr>
  <tr>
    <td>step 2</td>
    <td />
    <td>
      <input id="remoteOffer" type="text" placeholder="offer from initiator" />
      <button on:click={step_2_accept_remote_offer}>accept offer</button>
    </td>
  </tr>
  <tr>
    <td>step 3</td>
    <td />
    <td>
      <button on:click={step_3_create_answer}>create answer</button>
      <input id="createdAnswer" type="text" hidden />
    </td>
  </tr>
  <tr>
    <td>step 4</td>
    <td>
      <input id="remoteAnswer" type="text" placeholder="answer from peer" />
      <button on:click={step_4_accept_answer}>accept answer</button>
    </td>
    <td />
  </tr>
</table>
<hr />
<input id="text" type="text" />
<button on:click={send_text}>send</button>
<hr />
<table border="1">
  <tr>
    <th colspan="2">connection</th>
  </tr>
  <tr>
    <th>connectionState</th>
    <td>{connectionState}</td>
  </tr>
  <tr>
    <th>iceConnectionState</th>
    <td>{iceConnectionState}</td>
  </tr>
</table>
