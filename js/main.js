/* Ativa o modo restrito do Javascript, impedindo certos comportamentos
   como escrever código sem regras, variáveis globais fora de contexto */
'use strict';

// Definição do array para guardar as tarefas
let banco = [];

// Função anônima que lê o localStorage e converte o formato armazenado para um array
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];

// Função anônima que lê o objeto todoList (array) e grava no localStorage em JSON
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

// Módulo que cria os elementos HTML e insere na DOM
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

// Limpa todos os registros filhos criados, sempre pelo último
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

// Limpa os registros filhos e atualiza a lista de tarefas
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

// Função responsável por inserir o item, utilizando a tecla Enter
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

// Função que remove o item desejado através do índice
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

// Responsável por atualizar o item checado ou não
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

// Monitora qual o índice da tarefa escolhida para dar checked ou excluir
const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

// cria o monitor do evento keypress
document.getElementById('newItem').addEventListener('keypress', inserirItem);

// cria o monitor do evento click
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();