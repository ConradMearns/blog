<script>
    import {XMLParser} from 'fast-xml-parser'

    let parser = new XMLParser()

    async function get_xml() {
        const xml_res =  await fetch("http://localhost:3000/rss.xml")
        const xml = await xml_res.text()
        const feed = parser.parse(xml);
        
        console.log(feed)
        return feed.rss
    }

    let feed = get_xml()
</script>

{#await feed}
    <h1>loading feed</h1>
{:then feed_data} 
<pre>
    {JSON.stringify(feed_data, null, 2)}
</pre>
{/await}

<hr />

<p>
    This JSON object is brought to you by `fast-xml-parser`, Svelte, and Astro :)
</p>