document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const textareaElement = document.getElementById('descricao');
    const previewElement = document.getElementById('description-preview');
    const formatButtons = document.querySelectorAll('.format-btn');
    const attachmentBtn = document.querySelector('.attachment-btn');
    const attachmentInput = document.getElementById('attachment-input');
    const attachmentLabel = document.getElementById('attachment-label');
    const descriptionGroup = document.querySelector('.description-group');
    
    // Aplicar formatação ao texto
    formatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const format = this.dataset.format;
            const textarea = textareaElement;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const selectedText = textarea.value.substring(startPos, endPos);
            let formattedText = '';
            
            switch(format) {
                case 'bold':
                    formattedText = `**${selectedText}**`;
                    break;
                case 'italic':
                    formattedText = `_${selectedText}_`;
                    break;
                case 'list':
                    formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
                    break;
                default:
                    formattedText = selectedText;
            }
            
            // Substituir texto
            textarea.value = 
                textarea.value.substring(0, startPos) + 
                formattedText + 
                textarea.value.substring(endPos);
            
            // Animar botão
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 300);
            
            // Atualizar visualização
            updatePreview();
            
            // Manter foco no textarea
            textarea.focus();
        });
    });
    
    // Visualização da descrição formatada
    function updatePreview() {
        const text = textareaElement.value;
        if (text.trim() === '') {
            previewElement.classList.remove('active');
            return;
        }
        
        // Formatação simples
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/• (.*)/g, '<li>$1</li>')
            .replace(/\n/g, '<br>');
        
        previewElement.innerHTML = formatted;
        previewElement.classList.add('active');
    }
    
    // Anexo de arquivos
    attachmentBtn.addEventListener('click', function() {
        attachmentInput.click();
    });
    
    attachmentInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            attachmentLabel.textContent = fileName;
            descriptionGroup.classList.add('has-attachment');
            
            // Animar o ícone de anexo
            attachmentBtn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.2)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
        }
    });
    
    // Eventos da textarea
    textareaElement.addEventListener('input', function() {
        updatePreview();
    });
    
    textareaElement.addEventListener('focus', function() {
        this.animate([
            { boxShadow: '0 0 0 3px rgba(58, 123, 213, 0)' },
            { boxShadow: '0 0 0 3px rgba(58, 123, 213, 0.2)' },
            { boxShadow: '0 0 0 3px rgba(58, 123, 213, 0.1)' }
        ], {
            duration: 500,
            easing: 'ease-out'
        });
    });
    
    // Efeito de expansão quando começa a digitar
    let initialHeight = textareaElement.style.height;
    textareaElement.addEventListener('focus', function() {
        if (this.value.trim() === '') {
            setTimeout(() => {
                this.style.height = 'calc(120px + 30px)';
            }, 100);
        }
    });
    
    textareaElement.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.height = initialHeight;
        }
    });
    
    // Feedback visual ao digitar
    textareaElement.addEventListener('keydown', function(e) {
        if (e.key.length === 1) { // Se for um caractere digitável
            const ripple = document.createElement('span');
            ripple.className = 'key-ripple';
            ripple.style.position = 'absolute';
            ripple.style.width = '5px';
            ripple.style.height = '5px';
            ripple.style.backgroundColor = 'rgba(58, 123, 213, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            
            // Posicionar próximo ao cursor
            const rect = this.getBoundingClientRect();
            const selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            
            ripple.style.left = `${(selectionRect.x - rect.x) || 50}px`;
            ripple.style.top = `${(selectionRect.y - rect.y) || 50}px`;
            
            this.parentNode.appendChild(ripple);
            
            ripple.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(20)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        }
    });
}); 