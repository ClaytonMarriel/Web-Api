// Irá mapear os dados e irei fazer a validação dos dados
class Hero {
    constructor({ id, name, age, power }) {
        // Adicionando esses atributos a minha classe
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.power = power
    }

    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this) // Aqui eu pego todas as propriedades da classe
        const amountInvalid = propertyNames // Fazendo a verificação dos campos vazios
            .map(property => (!!this[property]) ? null : `${property} is missing`) // Verificação se tem alguma propriedade está vazia
            .filter(item => !!item)

        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = Hero

/*
const hero = new Hero({name: "Goku", age: 27, power: "Saiyajin Blue"})
console.log('valid', hero.isValid())
console.log('valid', hero) 
 */