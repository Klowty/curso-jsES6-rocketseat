/**
 * INSTALÇÃO DO BABEL
 * yarn init
 * yarn add @babel/cli
 * yarn add @babel/preset-env
 * criação do arquivo .babelrc 
    *{
    "presets": ["@babel/preset-env"]
    }
 * yarn add @babel/core
 * yarn add @
 * index.html -> <script src="./bundle.js"
 * 
 * 
 * 
 * --- OPERADORES REST/SPREAD ---
 * yarn add @babel/plugin-proposal-object-rest-spread
 * dentro do .babelrc -> "plugins": ["@babel/plugin-proposal-object-rest-spread"]
 * 
 * 
 * 
 * --- CONFIGURANDO O WEBPACK ---
 * no package.json: dependencies -> devDependencies
 * yarn add webpack webpack-cli -D
 * criar arquivo de configuração do webpack -> webpack.config.js
 * module.exports = {
    entry: './main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

        ],
    },
}
 * 
 * 
 * yarn add babel-loader@8.0.0-beta.0 -D
 * 
 * para executar o webpack -> webpack --mode=development -w || no package.json
 * 
 * 
 * 
 * SE FOR ORGANIZAR -> criar pasta public -> index.html e src -> main.js
 * alterar o webpack | entry: './src/main.js',  |   path: __dirname + '/public',
 * 
 * 
 * INSTALAÇÃO DO DEV SERVER
 * yarn add webpack-dev-server -D
 * dentro do webpack.config.js adicione
 * devServer: {
        contentBase: __dirname + '/public'
    },
 * 
 * mudar script do dev -> webpack-dev-server --mode=development
 * 
 * 
 * 
 * --- INSTALAR ASYNC AWAIT ---
 * yarn add @babel/plugin-transform-async-to-generator -D
 * no .babelrc adiciona 
 * yarn add @babel/polyfill -D
 * no webpack.config.js -> entry: ['@babel/polyfill', './src/main.js'],
 */

import api from './api';

class App {
    constructor() {
        this.repositorios = [];
        this.formEl = document.getElementById('formulario');
        this.input = document.querySelector('input[name=repositorio]');
        this.ulEl = document.getElementById('lista-reps');
        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRep(event);
    }


    carrega(loading = true){
        if(loading == true){
            let carregaSpan = document.createElement('span');
            carregaSpan.appendChild(document.createTextNode('Carregando...'));
            carregaSpan.setAttribute('id','loading');

            this.formEl.appendChild(carregaSpan);
        } else{
            document.getElementById('loading').remove();
        }
    }


    async addRep(event) {
        event.preventDefault();

        const repoInput = this.input.value;
        this.carrega();
        if (repoInput.lengh === 0)
            return;
        try {
            const response = await api.get(`/repos/${repoInput}`)

            const {
                name,
                description,
                html_url,
                owner: {
                    avatar_url
                }
            } = response.data; //pegando os dados da api


            this.repositorios.push({
                nome: name,
                desc: description,
                avatar_url,
                rep_url: html_url
            });

            this.input.value = '';
            this.render(); //apagar todo o conteudo da lista e renderizar do zero (adicionar tudo)
        
        } catch (err) {
            alert('Repositório não encontrado');
        }
        this.carrega(false);
    }
    render() {
        this.ulEl.innerHTML = '';

        this.repositorios.forEach(rep => { //PERCORRE O ARRAY
            let img = document.createElement('img');
            img.setAttribute('src', rep.avatar_url);

            let titulo = document.createElement('strong');
            titulo.appendChild(document.createTextNode(rep.nome));

            let descricao = document.createElement('p');
            descricao.appendChild(document.createTextNode(rep.desc));

            let link = document.createElement('a');
            link.setAttribute('target', '_blank'); //abrir em uma nova aba
            link.setAttribute('href', rep.rep_url);
            link.appendChild(document.createTextNode('Acessar'))

            let lista = document.createElement('li');
            lista.appendChild(img); // ADICIONANDO TUDO NA li
            lista.appendChild(titulo);
            lista.appendChild(descricao);
            lista.appendChild(link);
            
            this.ulEl.appendChild(lista); //CRIANDO A LISTA
            

        });

        //INSTALAR O AXIOS PARA FAZER REQUISIÇÕES HTTP COM A API -> yarn add axios
        /**
         * criar o api.js
         * import axios from 'axios';
            
            const api = axios.create({
                baseURL: 'https://api.github.com',
            });
            export default api;
         
         
         * no inicio da main.js -> immport api from './api';  
         */


    }
}
new App();