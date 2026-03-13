const sql = new Bun.sql()
const server = Bun.serve({
    routes: {
        "/leaderboard": {
            GET: async () => {
                const rows =
                    await sql`SELECT score, initials FROM leaderboardv2 ORDER BY score DESC FETCH FIRST 10 ROWS ONLY`
                let res = Response.json(rows, {
                    headers: { "Access-Control-Allow-Origin": "*" },
                })
                res.headers.set("Access-Control-Allow-Origin", "*")
                res.headers.set(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS",
                )
                return res
            },
            POST: async (req) => {
                const body = await req.json()
                await sql`INSERT INTO leaderboardv2("score", "initials") VALUES(${body.score}, ${body.initials})`
                let res = Response.json(
                    {},
                    {
                        headers: { "Access-Control-Allow-Origin": "*" },
                    },
                )
                res.headers.set("Access-Control-Allow-Origin", "*")
                res.headers.set(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS",
                )
                return res
            },
        },
    },
    port: 9271,
})

console.log(`Server running at ${server.url}`)
