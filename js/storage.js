const Storage = {
    /**
     * Salva as tarefas no LocalStorage
     * @param {Array} tarefas - Array de tarefas
     */
    salvarTarefas: function(tarefas) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    },
    
    /**
     * Recupera as tarefas do LocalStorage
     * @returns {Array} Array de tarefas ou array vazio se não houver tarefas
     */
    recuperarTarefas: function() {
        const tarefas = localStorage.getItem('tarefas');
        return tarefas ? JSON.parse(tarefas) : [];
    }
}; 