export function createProgressBar() {
    // Modelo de progreso en JavaScript nativo
    const ProgressModel = {
        progress: 0, // Estado inicial del progreso

        // Método para obtener el progreso actual
        getProgress() {
            return this.progress;
        },

        // Método para actualizar el progreso
        setProgress(newProgress) {
            if (newProgress >= 0 && newProgress <= 100) {
                this.progress = newProgress;
                this.notifyProgressChange();
            } else {
                console.error('El progreso debe estar entre 0 y 100.');
            }
        },

        // Método para notificar cambios al frontend
        notifyProgressChange() {
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.width = this.progress + '%';
                progressBar.textContent = this.progress + '%';
            } else {
                console.error('Elemento con id "progressBar" no encontrado.');
            }
        }
    };

    return ProgressModel;
}