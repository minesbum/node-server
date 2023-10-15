const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaTareas = [];

function añadirTarea(indicador, descripcion, estado) {
    listaTareas.push({ indicador, descripcion, estado });
}

function eliminarTarea(indicador) {
    listaTareas = listaTareas.filter(tarea => tarea.indicador !== indicador);
}

function completarTarea(indicador) {
    listaTareas = listaTareas.map(tarea => {
        if (tarea.indicador === indicador) {
            tarea.estado = 'completada';
        }
        return tarea;
    });
}

rl.question(chalk.yellow('Escribe "añadir", "eliminar" o "completar" para gestionar tareas: '), (respuesta) => {
    if (respuesta === 'añadir') {
        rl.question(chalk.cyan('Escribe el indicador de la tarea: '), (indicador) => {
            rl.question(chalk.cyan('Escribe la descripción de la tarea: '), (descripcion) => {
                añadirTarea(indicador, descripcion, 'pendiente');
                console.log(chalk.green('Tarea añadida con éxito.'));
                console.log(chalk.blue('Lista de tareas:'));
                console.log(listaTareas);
                rl.close();
            });
        });
    } else if (respuesta === 'eliminar') {
        rl.question(chalk.cyan('Escribe el indicador de la tarea que deseas eliminar: '), (indicador) => {
            eliminarTarea(indicador);
            console.log(chalk.green('Tarea eliminada con éxito.'));
            console.log(chalk.blue('Lista de tareas:'));
            console.log(listaTareas);
            rl.close();
        });
    } else if (respuesta === 'completar') {
        rl.question(chalk.cyan('Escribe el indicador de la tarea que deseas marcar como completada: '), (indicador) => {
            completarTarea(indicador);
            console.log(chalk.green('Tarea marcada como completada con éxito.'));
            console.log(chalk.blue('Lista de tareas:'));
            console.log(listaTareas);
            rl.close();
        });
    } else {
        console.log(chalk.red('Opción no válida'));
        rl.close();
    }
});