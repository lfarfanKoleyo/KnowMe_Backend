const fastify = require('fastify')({
    logger: true
})

fastify.get('/hello/:name', async (request, reply) => {
    return { hello: request.params.name}
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()