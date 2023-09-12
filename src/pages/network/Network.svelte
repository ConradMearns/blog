<script>
//   import { marked } from "marked";

//   const marked_wiki_2 = {
//     extensions: [
//       {
//         name: "marked_wiki_2",
//         level: "block",
//         start(src) {
//           return src.match(/\!\[\[/)?.index;
//         },
//         tokenizer(src) {
//           const rule = /^!\[\[([^[\]]*)\]\]/;
//           const match = rule.exec(src);
//           if (match) {
//             return {
//               type: "marked_wiki_2",
//               raw: match[0],
//               text: this.lexer.inlineTokens(match[1].trim()),
//             };
//           }
//         },
//         renderer(token) {
//           return `${this.parser.parseInline(token.text)}`;
//         //   return `${this.parser.parseInline(token.text)}`;
//         },
//       },
//     ],
//     async: true, // needed to tell marked to return a promise
//     async walkTokens(token) {
//       if (token.type === "marked_wiki_2") {
//         console.log("text", token.text);
//         // const res = await fetch(token.url);
//         // token.text = await res.text();
//       }
//     },
//   };


//   marked.use(marked_wiki_2);

//   marked.parse("Hello ![[Example]] ?").then((data) => {
//     console.log(data);
//   });

//   let example =
//     "A Description List:\n" +
//     ":   Topic 1   :  Description 1\n" +
//     ": **Topic 2** : *Description 2*";

//   const urlParams = new URLSearchParams(window.location.search);
//   const myParam = urlParams.get("myParam");

//   const keys = Array.from(urlParams.keys());

//   import { Input, Label, Button } from "flowbite-svelte";
//   import {Markdown} from "@components/ResolveMD.svelte";

//   const data = (async () => {
//     const response = await fetch(
//       "https://raw.githubusercontent.com/ConradMearns/blog/main/src/pages/blog/notes/2022-12-31%20New%20Year.md"
//     );
//     const text = await response.text();
//     return await marked.parse(text);
//   })();

//   let network = "127.0.0.1:5000";

//   let list = null;
//   let handle_click = async () => {
//     const response = await fetch(`http://${network}/list/Daily`);
//     const text = await response.text();
//     list = text;
//     // return await marked.parse(text)
//   };

//   const resolve_md = (markdown) => {
//     const regex = /!\[\[([^[\]]+)\]\]/g;
//     console.log(markdown.replace(regex, "$1"));
//     let nd = markdown.replace(
//       regex,
//       fetch(`http://${network}/get/$1`).then((data) => {
//         markdown = data;
//       })
//     );
//     return markdown;
//   };

//   let get_data = "";
//   let recv = null;
//   let handle_data = async () => {
//     const response = await fetch(`http://${network}/get/${get_data}`);
//     const text = await response.blob();
//     console.log(text);
//     recv = text;
//   };
</script>


<!-- <Markdown slug={'2023-09-10'} /> -->


<br />
<br />
<br />
<br />
<br />

<!-- {@html example}

<br />

<Label class="space-y-2">
  <span>Network Address</span>
  <Input type="ip" placeholder="" size="sm" bind:value={network} />
</Label>
<Button class="bg-slate-500" on:click={handle_click}>Try</Button>

{network}

<br />

{list}

<br />

<Label class="space-y-2">
  <span>Fetch</span>
  <Input type="ip" placeholder="" size="sm" bind:value={get_data} />
</Label>
<Button class="bg-slate-500" on:click={handle_data}>Try</Button>

<br />

{#if recv && recv.type.match("image.*")}
  <img src={URL.createObjectURL(recv)} />
{/if}

{#if recv && recv.type.match("text.*")}
  {#await recv.text()}
    ...
  {:then t}
    <article class="pb-64 p-4 mt-10 prose">
      {@html marked.parse(resolve_md(t))}
    </article>
  {/await}
{/if} -->

<!-- {#await data}
  Loading...
{:then x}
  <article class="pb-64 p-4 mt-10 prose" >
    {@html x}
  </article>
{/await} -->

<!-- {keys} -->
