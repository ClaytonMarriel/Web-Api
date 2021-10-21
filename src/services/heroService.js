// Responsável pelas regras de negócio
// Nessa ocasião, ela só irá fazer a rota dos dados
// Receber a informação e chamar a Repositories

class HeroService {
    constructor({heroRepository}) {
       this.heroRepository = heroRepository 
    }

    async find(itemId) {
        return this.heroRepository.find(itemId)
    }

    async create(data){
        return  this.heroRepository.create(data)
    }
}

module.exports = HeroService