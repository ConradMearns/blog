<script>
    const parsedUrl = new URL(window.location);
    // searchParams.get() will properly handle decoding the values.
    console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
    console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
    console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
    
    let params = Object.fromEntries(parsedUrl.searchParams.entries());
</script>

<pre>{parsedUrl.searchParams}</pre>

<hr />

<pre>{JSON.stringify(params, 2, 2)}</pre>