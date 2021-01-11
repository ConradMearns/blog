+++ 
draft = false
date = "2020-10-07T12:10:50-00:00"
title = "Playing with Consensus"
slug = "" 
tags = []
categories = []
+++

This is largely an exercise in using LaTex, Pandoc, and p5js to try and describe a problem and potential solutions.

- Problem with election process for managing service knowledge in a cluster
- Explain SWIM, Serf, PAXOS
- Explain new purpose of adapting experiment projects into blog components
- HTML and PDF views?
  - I need to break the PDF apart so that graphs, LaTeX, and Tikz drawing can be added to the Hugo doc.

- Add reload buttons and number count sliders to the sims


<details>
<object data="../demos/post.pdf" type="application/pdf" width="100%" height="700px">
    <embed src="../demos/post.pdf">
        <!-- <p>This browser does not support PDFs. Please download the PDF to view it: <a href="../resume.pdf">Download PDF</a>.</p> -->
    </embed>
</object>
</details>


This may not be correct

<iframe name="discontinuity" width="100%" height="700px" srcdoc="
<html><body>
<script src=&quot;https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js&quot;></script>
<script src=&quot;../demos/discontinuity.js&quot;></script>
</body></html>">
</iframe>

Stable State - 3 Nodes Green
Needs sliders / reload button

<iframe name="localCooldown" width="100%" height="700px" srcdoc="
<html><body>
<script src=&quot;https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js&quot;></script>
<script src=&quot;../demos/localCooldown.js&quot;></script>
</body></html>">
</iframe>

This isn't at all correct, so it probably shouldn't be included (unless to show how models need to be adapted over time)

<iframe name="globalCooldown" width="100%" height="700px" srcdoc="
<html><body>
<script src=&quot;https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js&quot;></script>
<script src=&quot;../demos/globalCooldown.js&quot;></script>
</body></html>">
</iframe>




I can't remember what the goal of this was, but clearly I didn't finish it.

<iframe name="funCallGraph" width="100%" height="700px" srcdoc="
<html><body>
<script src=&quot;https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js&quot;></script>
<script src=&quot;../demos/funCallGraph.js&quot;></script>
</body></html>">
</iframe>