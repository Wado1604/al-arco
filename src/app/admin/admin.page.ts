import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { Match } from '../models/match';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {

  alertCtrl: any;
  match: any[] = [];
  equipos: any[] = [];   // Ahora es un arreglo de partidos
  isAddMatchModalOpen: boolean | undefined;

  // Actualiza los detalles de un partido cuando se edita un campo
  updateMatchDetails(field: string, event: any, index: number) {
    const value = event.target.innerText.trim();
    this.saveMatchData();
    this.match[index][field] = value;  // Actualiza el campo correspondiente con el nuevo valor
  }

  // Agrega un nuevo partido
  addMatch(data: any) {
    // Crear un nuevo partido con datos seleccionados
    const newMatch = {
      team1: data.team1.nombre || 'Equipo 1',
      team2: data.team2.nombre || 'Equipo 2',
      team1Logo: data.team1.logo || '', // URL del logo del equipo 1
      team2Logo: data.team2.logo || '', // URL del logo del equipo 2
      fecha: data.date || '',
      hora: data.time || '',
      jornada: data.jornada || '-',
      score1: 0,
      score2: 0,
    };

    this.match.push(newMatch);
    this.saveMatchData();
  }

  ionViewWillEnter() {
    this.cargarEquipos();
    this.cargarPartidos();
  }

  cargarEquipos() {
    // Recuperar equipos desde localStorage
    const equiposStorage = localStorage.getItem('equipos');
    if (equiposStorage) {
      this.equipos = JSON.parse(equiposStorage);
    }
  }

  cargarPartidos() {
    // Recuperar partidos desde localStorage
    const partidosStorage = localStorage.getItem('partidos');
    if (partidosStorage) {
      this.match = JSON.parse(partidosStorage);
    }
  }

  // Guarda los partidos en el almacenamiento local
  saveMatchData() {
    // Guardar partidos en localStorage
    localStorage.setItem('partidos', JSON.stringify(this.match));
  }

  // Abre el formulario de agregar partido
  openAddMatchAlert() {
    // Opciones dinámicas para equipo 1
    const team1Options = this.equipos.map((equipo) => ({
      type: 'radio', // Tipo permitido por AlertInput
      label: equipo.nombre, // Nombre del equipo
      value: JSON.stringify({ nombre: equipo.nombre, logo: equipo.logo }), // Valor serializado
    }));
  
    // Opciones dinámicas para equipo 2
    const team2Options = this.equipos.map((equipo) => ({
      type: 'radio', // Tipo permitido por AlertInput
      label: equipo.nombre, // Nombre del equipo
      value: JSON.stringify({ nombre: equipo.nombre, logo: equipo.logo }), // Valor serializado
    }));
  
    // Crear el alert
    const alert = document.createElement('ion-alert');
    alert.header = 'Agregar Partido';
  
    // Inputs fijos para Jornada, Fecha y Hora
    alert.inputs = [
      { type: 'text', name: 'jornada', placeholder: 'Jornada' },
      { type: 'date', name: 'date', placeholder: 'Fecha' },
      { type: 'time', name: 'time', placeholder: 'Hora' },
      // Etiqueta para Equipo 1
      { type: 'radio', label: 'Selecciona el Equipo 1', value: '', disabled: true },
      ...team1Options.map((option, index) => ({
        ...option,
        name: 'team1', // Grupo de selección para equipo 1
        checked: index === 0, // Primer equipo seleccionado por defecto
      })),
      // Etiqueta para Equipo 2
      { type: 'radio', label: 'Selecciona el Equipo 2', value: '', disabled: true },
      ...team2Options.map((option, index) => ({
        ...option,
        name: 'team2', // Grupo de selección para equipo 2
        checked: index === 0, // Primer equipo seleccionado por defecto
      })),
    ] as AlertInput[]; // Forzar el tipo para cumplir con AlertInput
  
    // Botones del alert
    alert.buttons = [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Agregar',
        handler: (data) => {
          // Validar que se hayan seleccionado ambos equipos
          if (!data.team1 || !data.team2) {
            console.error('Por favor selecciona ambos equipos.');
            return false; // Cancela el submit del alert
          }
  
          // Deserializar datos seleccionados
          const team1 = JSON.parse(data.team1);
          const team2 = JSON.parse(data.team2);
  
          // Procesar los datos ingresados
          this.addMatch({
            team1: team1.nombre,
            team2: team2.nombre,
            date: data.date,
            time: data.time,
            jornada: data.jornada,
            team1Logo: team1.logo,
            team2Logo: team2.logo,
          });
          return true; // Retorno exitoso
        },
      },
    ];
  
    // Mostrar el alert
    document.body.appendChild(alert);
    return alert.present();
  }
  
  
  // Función para guardar los cambios de un partido
  saveMatch(index: number) {
    console.log('Guardando partido', this.match[index]);
    this.saveMatchData();  // Guarda los datos en el almacenamiento
  }

  // Función para eliminar un partido
  deleteMatch(index: number) {
    this.match.splice(index, 1);  // Elimina el partido del array
    this.saveMatchData();  // Guarda los cambios
  }

  ngOnInit() {
    const storedMatches = localStorage.getItem('matches');
    this.match = storedMatches ? JSON.parse(storedMatches) : [];
  }

  constructor(private alertController: AlertController, private router: Router) {}


  // Función para eliminar la tabla
  deleteTable() {
    console.log('Tabla eliminada');
    // Aquí puedes agregar la lógica para eliminar la tabla
  }

  // Función para guardar la tabla
  saveTable() {
    console.log('Tabla guardada');
    // Aquí puedes agregar la lógica para guardar los datos
  }

  openAddMatchModal() {
    this.isAddMatchModalOpen = true;
    alert('Se ha abierto el modal para agregar un nuevo partido.');
  }


  closeAddMatchModal() {
    this.isAddMatchModalOpen = false;
  }


  getMatch() {
    return this.match;
  }

  enableEdit(index: number) {
    this.match[index].isEditing = true;
  }

  goToEquiposAdmin() {
    this.router.navigate(['/equipos-admin']);
  }
  
  closeModal() {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      modalElement.removeAttribute('aria-hidden'); // Quita aria-hidden
    }
  }

  
  goToPosicionesAmin() {
    this.router.navigate(['/posiciones-admin']);
  }
  
  
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
