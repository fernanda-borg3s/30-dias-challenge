document.addEventListener('DOMContentLoaded', function() {
    // Variáveis de estado
    let currentDate = new Date();
    let selectedDate = new Date();
    
    // Elementos DOM
    const titulo = document.querySelector('.titulo-calendario');
    const calendarDays = document.getElementById('calendar-days');
    const mesAnterior = document.getElementById('anterior');
    const HojeBtn = document.getElementById('hoje');
    const proximoMes = document.getElementById('next');
    buildCalendar();
    mesAnterior.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        buildCalendar();
    });
    proximoMes.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        buildCalendar();
    });
    HojeBtn.addEventListener('click', () => {
        currentDate = new Date();
        selectedDate = new Date();
        buildCalendar();
    });

function buildCalendar() {
// Configurar título (Mês e Ano)
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    titulo.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Limpar dias do calendário
    calendarDays.innerHTML = '';
    
    // Obter primeiro dia do mês
    const firstDiaMes = new Date(
        currentDate.getFullYear(), 
        currentDate.getMonth(), 
        1
    );
    
    // Obter último dia do mês
    const lastDiaMes = new Date(
        currentDate.getFullYear(), 
        currentDate.getMonth() + 1, 
        0
    );
    // Obter dia da semana do primeiro dia (0-6)
    const firstDiaSemana = firstDiaMes.getDay();

    // Adicionar dias vazios para a primeira semana
    for (let i = 0; i < firstDiaSemana; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyDay);
    }  

    // Adicionar todos os dias do mês
    for (let i = 1; i <= lastDiaMes.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = i;
    
        // Verificar se é o dia atual
        const hoje = new Date();
        if (i === hoje.getDate() && 
            currentDate.getMonth() === hoje.getMonth() && 
            currentDate.getFullYear() === hoje.getFullYear()) {
            dayElement.classList.add('hoje');
        }
        // Verificar se é o dia selecionado
        if (i === selectedDate.getDate() && 
            currentDate.getMonth() === selectedDate.getMonth() && 
            currentDate.getFullYear() === selectedDate.getFullYear()) {
            dayElement.classList.add('selected');
        }
        //seleção de dia
        dayElement.addEventListener('click', () => {
            selectedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i
            );
        buildCalendar();
        });
        calendarDays.appendChild(dayElement);
    }
}
})