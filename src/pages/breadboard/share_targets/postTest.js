/* import("astro") */
export async function post(ctx) {
    const data = await ctx.request.formData();
    const text = data.get('text');
    console.log(text);
    return new Response(JSON.stringify(ctx.request), {
      status: 200,
    });
}