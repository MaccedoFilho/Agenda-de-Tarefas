document.addEventListener('DOMContentLoaded', function() {
    // Interação para o seletor de prioridade
    const priorityOptions = document.querySelectorAll('.priority-option');
    const priorityInput = document.getElementById('prioridade');
    
    // Definir a opção inicial (média) como selecionada
    priorityOptions.forEach(option => {
        if(option.dataset.value === priorityInput.value) {
            option.classList.add('selected');
        }
        
        option.addEventListener('click', function() {
            // Remover seleção anterior
            priorityOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Selecionar a opção atual
            this.classList.add('selected');
            
            // Atualizar o input hidden
            priorityInput.value = this.dataset.value;
            
            // Efeito de feedback
            this.animate([
                { transform: 'scale(0.95)' },
                { transform: 'scale(1)' }
            ], {
                duration: 200,
                easing: 'ease-out'
            });
        });
    });
    
    // Efeito de foco nos inputs
    const inputs = document.querySelectorAll('.styled-input');
    
    inputs.forEach(input => {
        // Efeito ao focar
        input.addEventListener('focus', function() {
            this.parentNode.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
            
            // Encontrar o ícone associado
            const icon = this.parentNode.querySelector('.input-icon');
            if(icon) {
                icon.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            }
        });
    });
    
    // Efeito de submissão do formulário
    const formTarefa = document.getElementById('form-tarefa');
    const addButton = formTarefa.querySelector('.add-task-btn');
    
    formTarefa.addEventListener('submit', function(e) {
        // O efeito acontece antes da submissão real
        addButton.classList.add('submitting');
        
        // Feedback visual de "carregando"
        const originalText = addButton.innerHTML;
        addButton.innerHTML = '<span class="loading-spinner"></span> Adicionando...';
        
        // Removemos a classe e restauramos o texto após o efeito
        setTimeout(() => {
            addButton.classList.remove('submitting');
            addButton.innerHTML = originalText;
        }, 800);
        
        // O comportamento normal de submissão continua após o efeito
    });
    
    // Efeito de hover nos grupos de form
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        group.addEventListener('mouseenter', function() {
            const label = this.querySelector('.floating-label');
            if(label) {
                label.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(5px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            }
        });
    });
    
    // Estilos adicionais para o spinner de carregamento
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .submitting {
            position: relative;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}); 