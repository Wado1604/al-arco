import { Component, OnInit } from '@angular/core';
import { Team } from '../models/match';

@Component({
  selector: 'app-posiciones-admin',
  templateUrl: './posiciones-admin.page.html',
  styleUrls: ['./posiciones-admin.page.scss'],
})
export class PosicionesAdminPage implements OnInit {

  teams: {
    name: string;
    logo: string;
    points: number;
    played: number;
    won: number;
    lost: number;
    draw: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
  }[] = [];
 

  ngOnInit() {
    // Cargar equipos desde localStorage
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      const basicTeams = JSON.parse(storedTeams);
      this.teams = basicTeams.map((team: { name: string; logo: string }) => ({
        name: team.name,
        logo: team.logo,
        points: 0,
        played: 0,
        won: 0,
        lost: 0,
        draw: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
      }));
    }
  }

  updateStats() {
    this.teams.forEach(team => {
      // Calcular puntos y diferencia de goles
      team.points = team.won * 3 + team.draw;
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    });
  
    // Guardar los equipos actualizados en localStorage (opcional)
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }
  
  constructor() { }
  
}
