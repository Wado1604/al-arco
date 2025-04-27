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

  teams: { name: string; logo: string }[] = [];
  alertCtrl: any;
  match: any[] = [];
  equipos = [
    { nombre: 'Equipo 1', logo: 'assets/logo1.png' },
    { nombre: 'Equipo 2', logo: 'assets/logo2.png' },
    { nombre: 'Equipo 3', logo: 'assets/logo3.png' },
  ];
  // Ahora es un arreglo de partidos
  isAddMatchModalOpen: boolean | undefined;

  jornada: string = '';
  fecha: string = '';
  hora: string = '';
  equipo1: any = null;
  equipo2: any = null;

  ngOnInit() {
    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      this.match = JSON.parse(storedMatches); // Recupera los partidos guardados
    } else {
      this.match = []; // Si no hay partidos guardados, inicializa un array vacío
    }
  
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      this.teams = JSON.parse(storedTeams); // Recupera los equipos guardados
    } else {
      this.teams = []; // Si no hay equipos guardados, inicializa un array vacío
    }
    this.cargarPartidos();
    this.cargarEquipos();
    this.loadTeams();
  }
  loadTeams() {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      this.teams = JSON.parse(storedTeams);
    }
  }

  // Cargar partidos desde localStorage
  cargarPartidos() {
    const partidosStorage = localStorage.getItem('partidos');
    this.match = partidosStorage ? JSON.parse(partidosStorage) : [];
  }
  
// Cargar equipos desde localStorage
cargarEquipos() {
  const equiposStorage = localStorage.getItem('equipos');
  if (equiposStorage) {
    this.equipos = JSON.parse(equiposStorage);
  }
}

   // Método para eliminar un partido
   deleteMatch(index: number) {
    this.match.splice(index, 1); // Elimina el partido seleccionado
    this.saveMatchData();
    console.log('Partido eliminado');
    // Opcional: Actualizar localStorage
    localStorage.setItem('matches', JSON.stringify(this.match));
  }

  // Función para guardar los cambios de un partido
  saveMatch(index: number) {
    console.log('Partido guardado:', this.match[index]);
    this.saveMatchData();
    // Opcional: Guardar en localStorage si deseas persistencia
    localStorage.setItem('matches', JSON.stringify(this.match));
  }
  
   // Actualizar detalles de un partido
   updateMatchDetails(field: string, event: any, index: number) {
    const value = event.target.innerText.trim();
    this.match[index][field] = value;
    this.saveMatchData();
  }

  // Función para agregar un nuevo partido
  addMatch(match: any) {
    const newMatch = {
      fecha: match.date,
      jornada: match.jornada,
      hora: match.time,
      team1: match.team1.name,  // Asegúrate de tener el nombre del equipo
      team1Logo: match.team1.logo,  // Asegúrate de tener el logo del equipo
      team2: match.team2.name,  // Asegúrate de tener el nombre del equipo
      team2Logo: match.team2.logo,  // Asegúrate de tener el logo del equipo
      score1: 0,  // Puntaje inicial
      score2: 0   // Puntaje inicial
    };

    if (!this.match) {
      this.match = [];  // Si no existe el array, inicialízalo
    }

    this.match.push(newMatch);  // Agregar el nuevo partido al array
    localStorage.setItem('partidos', JSON.stringify(this.match));  // Guardar el array de partidos en localStorage
    console.log('Nuevo partido agregado:', newMatch);
  }

  ionViewWillEnter() {
    this.cargarEquipos();
    this.cargarPartidos();
  }

  // Guarda los partidos en el almacenamiento local
  saveMatchData() {
    // Guardar partidos en localStorage
    localStorage.setItem('partidos', JSON.stringify(this.match));
  }

   // Método para abrir la alerta para agregar un nuevo partido
   openAddMatchAlert() {
    if (!this.teams || this.teams.length === 0) {
      console.error('No hay equipos disponibles.');
      return; // Salir si no hay equipos disponibles
    }
  
    const alert = document.createElement('ion-alert');
    alert.header = 'Agregar Partido';
  
    alert.inputs = [
      { type: 'text', name: 'jornada', placeholder: 'Jornada' },
      { type: 'date', name: 'date', placeholder: 'Fecha' },
      { type: 'time', name: 'time', placeholder: 'Hora' },
      {
        name: 'team1',
        type: 'text',
        placeholder: 'Seleccionar Equipo 1',
        value: this.teams[0]?.name || '', // Valor por defecto si hay equipos
        label: 'Equipo 1',
      },
      {
        name: 'team2',
        type: 'text',
        placeholder: 'Seleccionar Equipo 2',
        value: this.teams[1]?.name || '', // Valor por defecto si hay equipos
        label: 'Equipo 2',
      },
    ];
  
    alert.buttons = [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Agregar',
        handler: (data) => {
          const team1 = this.teams.find((e: { name: string }) => e.name === data.team1);
          const team2 = this.teams.find((e: { name: string }) => e.name === data.team2);
  
          if (!team1 || !team2) {
            console.error('Por favor selecciona equipos válidos.');
            return false; // Cancela la acción si no se seleccionan equipos válidos
          }
  
          if (!data.date || !data.time || !data.jornada) {
            console.error('Por favor completa todos los campos.');
            return false;
          }
  
          // Agregar el partido
          this.addMatch({
            team1,
            team2,
            date: data.date,
            time: data.time,
            jornada: data.jornada,
          });
  
          // Cerrar la alerta después de agregar el partido
          alert.dismiss();
  
          return true;
        },
      },
    ];
  
    document.body.appendChild(alert);
    alert.present();
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
