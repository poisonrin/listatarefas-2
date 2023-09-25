// Declarar um array que armazena as tarefas
let banco = [];

// Configurar os dados para o localStorage
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice ) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
            <input type="checkbox" ${status} data-indice=${indice}>
            <section>${tarefa}</section>
            <input type="button" value="X" data-indice=${indice}
        `;
        console.log(item);
    //document.getElementById('todoList').appendChild();
}

const AtualizarTela = () => {
    LimparTarefas();
    const banco = getBanco();
    banco.foreach ( (item, indice) => (item.tarefa, item.status, indice));
} 

const LimparTarefas = () => {
    const lista = document.getElementById('todoList');
    while(lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
} 

const InserirItem = (evento) => {
    const tecla = evento.key;   
    const texto = evento.target.value;
    
    if(texto === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status':''});
        setBanco(banco);
        AtualizarTela();
        evento.target.value = '';
    }
}

document.getElementById('todo_item').addEventListener('keypress', InserirItem);
//document.getElementById('todoList').addEventListener('click', );

AtualizarTela();