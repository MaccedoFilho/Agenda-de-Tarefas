document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.animated-header');
    const taskIcons = document.querySelectorAll('.task-icon');
    
    // Efeito de hover com partículas
    header.addEventListener('mousemove', function(e) {
        createParticle(e.clientX, e.clientY);
    });
    
    // Animação ao clicar nos ícones
    taskIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Mensagens quando clicar em cada ícone
            const messages = [
                "Crie novas tarefas facilmente!",
                "Organize seu tempo com eficiência!",
                "Complete suas tarefas e celebre!"
            ];
            
            // Determinar qual ícone foi clicado
            const iconIndex = Array.from(taskIcons).indexOf(this);
            showTooltip(this, messages[iconIndex]);
        });
    });
    
    // Função para criar partículas
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Ajustar a posição para referência do header
        const headerRect = header.getBoundingClientRect();
        const posX = x - headerRect.left;
        const posY = y - headerRect.top;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        
        // Tamanho aleatório
        const size = Math.floor(Math.random() * 10 + 3);
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        header.appendChild(particle);
        
        // Animar partícula
        const destinationX = posX + (Math.random() - 0.5) * 100;
        const destinationY = posY + (Math.random() - 0.5) * 100;
        
        const animation = particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${destinationX - posX}px, ${destinationY - posY}px)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    // Função para mostrar tooltip quando clicar nos ícones
    function showTooltip(element, message) {
        // Remover tooltips existentes
        const existingTooltip = document.querySelector('.icon-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Criar tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'icon-tooltip';
        tooltip.textContent = message;
        
        // Estilizar tooltip
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'white';
        tooltip.style.color = 'var(--primary-color)';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        tooltip.style.zIndex = '10';
        tooltip.style.top = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.marginTop = '10px';
        tooltip.style.fontSize = '0.9rem';
        tooltip.style.fontWeight = '500';
        tooltip.style.whiteSpace = 'nowrap';
        
        // Adicionar ao DOM
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        // Animar entrada
        tooltip.animate([
            { opacity: 0, transform: 'translate(-50%, -10px)' },
            { opacity: 1, transform: 'translate(-50%, 0)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
        
        // Remover após 3 segundos
        setTimeout(() => {
            if (tooltip.parentNode === element) {
                tooltip.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                }).onfinish = () => tooltip.remove();
            }
        }, 3000);
    }
}); 