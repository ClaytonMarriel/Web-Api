// Irá gerar nossas instâncias
const HeroRepository = require('./../repositories/heroRepository')
const HeroService = require('../services/heroService')

const {join} = require('path') // normalização do arquivo
const filename = join(__dirname, '../../database', 'data.json')
const generateInstance = () => {
    const heroRepository = new HeroRepository({
        file: filename
    })
    const heroService = new HeroService({
        heroRepository
    })

    return heroService
}

module.exports = { generateInstance}

//generateInstance().find().then(console.log)