const sql = new Bun.sql()
const server = Bun.serve({
    routes: {
        "/leaderboard": {
            GET: async () => {
                const rows =
                    await sql`SELECT score, initials FROM leaderboard ORDER BY score DESC FETCH FIRST 10 ROWS ONLY`
                return Response.json(rows, {
                    headers: { "Access-Control-Allow-Origin": "*" },
                })
            },
            POST: async (req) => {
                const body = await req.json()
                await sql`INSERT INTO leaderboard("score", "initials") VALUES(${body.score}, ${body.initials})`
                return Response.json(
                    {},
                    {
                        headers: { "Access-Control-Allow-Origin": "*" },
                    },
                )
            },
        },
    },
    port: 9271,
})

console.log(`Server running at ${server.url}`)
