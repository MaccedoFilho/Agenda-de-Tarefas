const TaskManager = {
    tarefas: [],
    
    /**
     * Inicializa o gerenciador de tarefas
     */
    init: function() {
        this.tarefas = Storage.recuperarTarefas();
        this.renderizarTarefas();
    },
    
    /**
     * Adiciona uma nova tarefa
     * @param {Object} tarefa - Objeto com dados da tarefa
     */
    adicionarTarefa: function(tarefa) {
        tarefa.id = Date.now();
        tarefa.status = 'pendente';
        this.tarefas.push(tarefa);
        Storage.salvarTarefas(this.tarefas);
        this.renderizarTarefas();
    },
    
    /**
     * Edita uma tarefa existente
     * @param {number} id - ID da tarefa
     * @param {Object} dadosAtualizados - Novos dados da tarefa
     */
    editarTarefa: function(id, dadosAtualizados) {
        const index = this.tarefas.findIndex(tarefa => tarefa.id === id);
        if (index !== -1) {
            this.tarefas[index] = { ...this.tarefas[index], ...dadosAtualizados };
            Storage.salvarTarefas(this.tarefas);
            this.renderizarTarefas();
        }
    },
    
    /**
     * Remove uma tarefa
     * @param {number} id - ID da tarefa
     */
    removerTarefa: function(id) {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
        Storage.salvarTarefas(this.tarefas);
        this.renderizarTarefas();
    },
    
    /**
     * Alterna o status de uma tarefa entre pendente e concluída
     * @param {number} id - ID da tarefa
     */
    alternarStatus: function(id) {
        const index = this.tarefas.findIndex(tarefa => tarefa.id === id);
        if (index !== -1) {
            this.tarefas[index].status = this.tarefas[index].status === 'pendente' ? 'concluida' : 'pendente';
            Storage.salvarTarefas(this.tarefas);
            this.renderizarTarefas();
        }
    },
    
    /**
     * Filtra as tarefas por status
     * @param {string} status - Status para filtrar ('todas', 'pendente', 'concluida')
     * @returns {Array} Tarefas filtradas
     */
    filtrarPorStatus: function(status) {
        if (status === 'todas') {
            return this.tarefas;
        }
        return this.tarefas.filter(tarefa => tarefa.status === status);
    },
    
    /**
     * Renderiza as tarefas na interface
     */
    renderizarTarefas: function() {
        const listaTarefas = document.getElementById('lista-tarefas');
        const filtroStatus = document.getElementById('filtro-status').value;
        const tarefasFiltradas = this.filtrarPorStatus(filtroStatus);
        
        listaTarefas.innerHTML = '';
        
        if (tarefasFiltradas.length === 0) {
            listaTarefas.innerHTML = '<li class="sem-tarefas">Nenhuma tarefa encontrada. Adicione uma nova tarefa para começar!</li>';
            return;
        }
        
        tarefasFiltradas.forEach(tarefa => {
            const li = document.createElement('li');
            li.className = `tarefa ${tarefa.status} ${tarefa.prioridade}`;
            
            // Formatando a data para exibição
            let dataFormatada = 'Sem data definida';
            if (tarefa.data) {
                const data = new Date(tarefa.data);
                dataFormatada = data.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
            
            // Ícones para os botões de ação
            const statusIcon = tarefa.status === 'pendente' ? '✓' : '↩';
            const statusTitle = tarefa.status === 'pendente' ? 'Marcar como concluída' : 'Marcar como pendente';
            
            // Formatando a prioridade para exibição
            let prioridadeText = 'Baixa';
            if (tarefa.prioridade === 'media') prioridadeText = 'Média';
            if (tarefa.prioridade === 'alta') prioridadeText = 'Alta';
            
            li.innerHTML = `
                <div class="tarefa-header">
                    <span class="tarefa-titulo">${tarefa.titulo}</span>
                    <div class="tarefa-acoes">
                        <button class="btn-status" data-id="${tarefa.id}" title="${statusTitle}">
                            ${statusIcon}
                        </button>
                        <button class="btn-editar" data-id="${tarefa.id}" title="Editar tarefa">✎</button>
                        <button class="btn-remover" data-id="${tarefa.id}" title="Remover tarefa">✕</button>
                    </div>
                </div>
                <div class="tarefa-descricao">${tarefa.descricao || 'Sem descrição'}</div>
                <div class="tarefa-info">
                    <span class="tarefa-data">${dataFormatada}</span>
                    <span class="tarefa-prioridade">Prioridade: ${prioridadeText}</span>
                </div>
            `;
            listaTarefas.appendChild(li);
        });
    }
}; 