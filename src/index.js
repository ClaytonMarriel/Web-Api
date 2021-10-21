// Criação da API
const http = require('http')
const Hero = require('./entities/hero')
const PORT = 3000
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }
const HeroFactory = require('./factories/heroFactory')
const heroService = HeroFactory.generateInstance()

//Criação das rotas
const routes = {

    '/heroes:get': async (request, response) => {
        const { id } = request.queryString
      
        const heroes = await heroService.find(id)
        response.write(JSON.stringify({ results: heroes }))
        return response.end()
    },

    '/heroes:post': async (request, response) => {
        // async iterator - serve para iterar dentro de funções assincronas, pra cada evento novo, cai dentro do for, cada request
       try{
           
        //await Promise.reject('/heroes:get')
        for await (const data of request) {
            const item = JSON.parse(data)
            const hero = new Hero(item)
            const { error, valid } = hero.isValid() 
            if (!valid) {
                response.writeHead(400, DEFAULT_HEADER)
                response.write(JSON.stringify({ error: error.join(',') }))
                return response.end()
            }
            // Se for válido:
            const id = await heroService.create(hero)
            response.writeHead(201, DEFAULT_HEADER)
            response.write(JSON.stringify({success: 'User Created with success', id}))

            // só jogamos o return aqui pois sabemos que é um objeto body por requisição
            // se fosse um arquivo, que sob demanda
            // ele poderia entrar mais vezes em um mesmo evento, aí removeríamos o return
            return response.end()
        }

       }catch(error) {
           return handleError(response)(error)
       }
       
    },

    default: (request, response) => {
        response.write('404 - Not Found')
        response.end()
    }
}

// clousure -> Uma função que irá retornar outra função
// Aqui eu preparo a função passando o response, pra quando o erro acontecer, já ter a resposta pro cliente
const handleError = response => {
    return error => {
        console.error('Deu ruim!', error)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({error: 'Internal Server Error !'}))

        return response.end()
    }
}

// Função pra manipular o servidor
const handler = (request, response) => {
    const { url, method } = request
    const [first, route, id] = url.split('/')
    request.queryString = { id: isNaN(id) ? id : Number(id) }

    const key = `/${route}:${method.toLowerCase()}`

    response.writeHead(200, DEFAULT_HEADER)

    const chosen = routes[key] || routes.default
    return chosen(request, response).catch(handleError(response))
}

http.createServer(handler)
    .listen(PORT, () => console.log('server is running at', PORT))