const { readFile, writeFile } = require('fs/promises')
class HeroRepository {
    constructor({ file }) {
        this.file = file
    }

    // Esse é um método privado que converte o arquivo em JSON para poder fazer a leitura do mesmo
    async _currentFileContent(){
        return JSON.parse(await readFile(this.file))
    } 

    // Esse método é pra realizar a busca por ID
    async find(itemId) {

        // Essa constante recebe o método que contém o arquivo convertido em JSON
        const all = await this._currentFileContent()
        if(!itemId) return all // Caso não seja inserido o ID que queira buscar, serão exibido todos

        return all.find(({id}) => itemId === id)
    }

    //Método create
    async create(data) {
        const currentFile = await this._currentFileContent() // Aqui ele pega o que está no arquivo atual
        currentFile.push(data) // Adicionando nesse arquivo uma nova informação/ Um novo usuário
        
        await writeFile(this.file, JSON.stringify(currentFile)) // Sobrescreve todo o arquivo, adicionando o item novo
        
        return data.id
    }


} 

module.exports = HeroRepository

// Aqui eu crio uma constante em que eu instancio a classe
// Pegando o arquivo
const heroRepository = new HeroRepository({
    file: './../../database/data.json'
})

/*
    heroRepository.create({id: 2, name:'Chapolin'})
        .then(console.log)
        .catch(error => console.log('error', error))
    heroRepository.find().then(console.log).catch(error => console.log('erro', error))
 */