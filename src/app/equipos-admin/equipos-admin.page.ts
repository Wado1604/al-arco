import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Match } from '../models/match';
import { Team } from '../models/match';

@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.page.html',
  styleUrls: ['./equipos-admin.page.scss'],
})
export class EquiposAdminPage {
  teams: { name: string; logo: string }[] = []; // Lista de equipos
  isAddTeamModalOpen = false; // Estado del modal
  newTeamName = ''; // Nombre del nuevo equipo
  newLogo: string | ArrayBuffer | null = null; // Logo del nuevo equipo

  currentMatch: Match = {
    equipo1: { nombre: '', logo: '', puntaje: 0 },
    equipo2: { nombre: '', logo: '', puntaje: 0 },
    fecha: '',
    jornada: 0,
    hora: '',
  };
  constructor() {
    // Recuperar equipos guardados
    const storedTeams = localStorage.getItem('teams');
    this.teams = storedTeams ? JSON.parse(storedTeams) : [];
  }

  loadTeams() {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      this.teams = JSON.parse(storedTeams);
    }
  }

  ngOnInit() {
    // Cargar equipos desde localStorage al iniciar
    const storedTeams = localStorage.getItem('teams');
    this.teams = storedTeams ? JSON.parse(storedTeams) : [];
  }

  saveTeams() {
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }


  // Abrir modal para agregar equipo
  openAddTeamModal() {
    this.isAddTeamModalOpen = true;
  }

  // Cerrar modal
  closeAddTeamModal() {
    this.isAddTeamModalOpen = false; // Cierra el modal
    this.newTeamName = ''; // Limpia los datos
    this.newLogo = null;
  }

  // Añadir equipo
  addTeam() {
    if (this.newTeamName && this.newLogo) {
      const logoString = typeof this.newLogo === 'string' ? this.newLogo : ''; // Asegurarse de que sea string
      this.teams.push({ name: this.newTeamName, logo: logoString }); // Agregar a la lista de equipos
      localStorage.setItem('teams', JSON.stringify(this.teams)); // Guardar en localStorage
      this.closeAddTeamModal(); // Cerrar modal
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
  

  // Seleccionar logo
  onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newLogo = reader.result; // Convertir imagen a base64
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar equipo
  deleteTeam(team: { name: string; logo: string }) {
    this.teams = this.teams.filter(t => t !== team);
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }
  
}

