const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaTareas = [];

function cargarTareas() {
    try {
        const data = fs.readFileSync('tareas.json');
        listaTareas = JSON.parse(data);
    } catch (error) {
        listaTareas = [];
    }
}

function guardarTareas() {
    fs.writeFileSync('tareas.json', JSON.stringify(listaTareas));
}

function añadirTarea(indicador, descripcion, estado) {
    return new Promise((resolve, reject) => {
        listaTareas.push({ indicador, descripcion, estado });
        guardarTareas();
        resolve('Tarea añadida con éxito.');
    });
}

function eliminarTarea(indicador) {
    return new Promise((resolve, reject) => {
        listaTareas = listaTareas.filter(tarea => tarea.indicador !== indicador);
        guardarTareas();
        resolve('Tarea eliminada con éxito.');
    });
}

function completarTarea(indicador) {
    return new Promise((resolve, reject) => {
        listaTareas = listaTareas.map(tarea => {
            if (tarea.indicador === indicador) {
                tarea.estado = 'completada';
            }
            return tarea;
        });
        guardarTareas();
        resolve('Tarea marcada como completada con éxito.');
    });
}

function mostrarTareasPendientes() {
    const tareasPendientes = listaTareas.filter(tarea => tarea.estado === 'pendiente');
    console.log(chalk.blue('Tareas pendientes:'));
    console.log(tareasPendientes);
}

function preguntarOpcion() {
    rl.question(chalk.yellow('Escribe "añadir", "eliminar" o "completar" para gestionar tareas / "salir" para cerrar el programa: '), async (respuesta) => {
        if (respuesta === 'añadir') {
            rl.question(chalk.cyan('Escribe el indicador de la tarea: '), async (indicador) => {
                rl.question(chalk.cyan('Escribe la descripción de la tarea: '), async (descripcion) => {
                    try {
                        await añadirTarea(indicador, descripcion, 'pendiente');
                        console.log(chalk.green('Tarea añadida con éxito.'));
                        mostrarTareasPendientes();
                        preguntarOpcion();
                    } catch (error) {
                        console.error(chalk.red('Error al añadir tarea:'), error);
                        preguntarOpcion();
                    }
                });
            });
        } else if (respuesta === 'eliminar') {
            rl.question(chalk.cyan('Escribe el indicador de la tarea que deseas eliminar: '), async (indicador) => {
                try {
                    await eliminarTarea(indicador);
                    console.log(chalk.green('Tarea eliminada con éxito.'));
                    mostrarTareasPendientes();
                    preguntarOpcion();
                } catch (error) {
                    console.error(chalk.red('Error al eliminar tarea:'), error);
                    preguntarOpcion();
                }
            });
        } else if (respuesta === 'completar') {
            rl.question(chalk.cyan('Escribe el indicador de la tarea que deseas marcar como completada: '), async (indicador) => {
                try {
                    await completarTarea(indicador);
                    console.log(chalk.green('Tarea marcada como completada con éxito.'));
                    mostrarTareasPendientes();
                    preguntarOpcion();
                } catch (error) {
                    console.error(chalk.red('Error al completar tarea:'), error);
                    preguntarOpcion();
                }
            });
        } else if (respuesta === 'salir') {
            rl.close();
        } else {
            console.log(chalk.red('Opción no válida'));
            preguntarOpcion();
        }
    });
}

cargarTareas();
mostrarTareasPendientes();
preguntarOpcion();

process.on('exit', () => {
    console.log('Cerrando la aplicación. ¡Hasta luego!');
});

