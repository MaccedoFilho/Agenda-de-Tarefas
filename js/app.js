document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o gerenciador de tarefas
    TaskManager.init();
    
    // Referências aos elementos DOM
    const formTarefa = document.getElementById('form-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');
    const filtroStatus = document.getElementById('filtro-status');
    
    // Adicionar tarefa
    formTarefa.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tarefa = {
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            data: document.getElementById('data').value,
            prioridade: document.getElementById('prioridade').value
        };
        
        TaskManager.adicionarTarefa(tarefa);
        formTarefa.reset();
    });
    
    // Gerenciar ações nas tarefas (concluir, editar, remover)
    listaTarefas.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-status')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            TaskManager.alternarStatus(id);
        } 
        else if (e.target.classList.contains('btn-remover')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Tem certeza que deseja remover esta tarefa?')) {
                TaskManager.removerTarefa(id);
            }
        }
        else if (e.target.classList.contains('btn-editar')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            const tarefa = TaskManager.tarefas.find(t => t.id === id);
            
            if (tarefa) {
                // Preencher formulário com dados da tarefa
                document.getElementById('titulo').value = tarefa.titulo;
                document.getElementById('descricao').value = tarefa.descricao || '';
                document.getElementById('data').value = tarefa.data || '';
                document.getElementById('prioridade').value = tarefa.prioridade;
                
                // Mudar botão para modo edição
                const btnSubmit = formTarefa.querySelector('button[type="submit"]');
                const btnOriginalText = btnSubmit.textContent;
                btnSubmit.textContent = 'Atualizar Tarefa';
                
                // Função para cancelar edição
                const cancelarEdicao = () => {
                    formTarefa.reset();
                    btnSubmit.textContent = btnOriginalText;
                    formTarefa.removeEventListener('reset', cancelarEdicao);
                    formTarefa.onsubmit = null;
                };
                
                // Adicionar botão de cancelar
                let btnCancelar = formTarefa.querySelector('.btn-cancelar');
                if (!btnCancelar) {
                    btnCancelar = document.createElement('button');
                    btnCancelar.type = 'button';
                    btnCancelar.className = 'btn-cancelar';
                    btnCancelar.textContent = 'Cancelar';
                    btnCancelar.style.marginLeft = '10px';
                    btnCancelar.style.backgroundColor = '#ccc';
                    btnSubmit.parentNode.insertBefore(btnCancelar, btnSubmit.nextSibling);
                }
                
                btnCancelar.onclick = cancelarEdicao;
                
                // Salvar ao enviar formulário
                const originalSubmit = formTarefa.onsubmit;
                formTarefa.onsubmit = function(e) {
                    e.preventDefault();
                    
                    const dadosAtualizados = {
                        titulo: document.getElementById('titulo').value,
                        descricao: document.getElementById('descricao').value,
                        data: document.getElementById('data').value,
                        prioridade: document.getElementById('prioridade').value
                    };
                    
                    TaskManager.editarTarefa(id, dadosAtualizados);
                    
                    // Restaurar formulário
                    cancelarEdicao();
                    if (btnCancelar) btnCancelar.remove();
                };
            }
        }
    });
    
    // Filtrar tarefas
    filtroStatus.addEventListener('change', function() {
        TaskManager.renderizarTarefas();
    });
}); 