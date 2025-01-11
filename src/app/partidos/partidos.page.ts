import { Component, OnInit } from '@angular/core';
import { Match } from '../models/match';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {
  equipos: any[] = []; // Inicializar la propiedad como un arreglo vacío
  matches: Match[] = []; // Ahora matches tiene un tipo definido

  

  match: Match = {
    equipo1: { nombre: '', logo: '', puntaje: 0 },
    equipo2: { nombre: '', logo: '', puntaje: 0 },
    fecha: '',
    hora: '',
    jornada: 0
  };

  teams = [
    { nombre: 'Team 1', logo: 'logo1.png', puntaje: 0 },
    { nombre: 'Team 2', logo: 'logo2.png', puntaje: 0 },
    // Add more teams as needed
  ];
  

  constructor(private router: Router) {}

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // Carga los partidos almacenados desde localStorage cuando se inicializa la página
    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      this.matches = JSON.parse(storedMatches);
    }
  }

  loadMatches() {
    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      this.matches = JSON.parse(storedMatches);
    } else {
      this.matches = [];
    }
  }

 
  
  
  getTeamColorName(color: string): string {
    const colors: { [key: string]: string } = {
      '#ff0000': 'Rojo',
      '#00ff00': 'Verde',
      '#0000ff': 'Azul',
    };
    return colors[color] || 'Color Desconocido';
  }
}


  function loadMatches() {
    throw new Error('Function not implemented.');
  }

