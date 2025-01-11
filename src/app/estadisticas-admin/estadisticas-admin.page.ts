import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.page.html',
  styleUrls: ['./estadisticas-admin.page.scss'],
})
export class EstadisticasAdminPage {
  selectedCategory: string = 'goles'; // Categoría seleccionada

  playerStats = {
    goles: [
      {
        nombre: 'Robert Lewandowski',
        equipo: 'FC Barcelona',
        foto: 'assets/images/lewandowski.jpg',
        valor: 16,
      },
      {
        nombre: 'Raphinha',
        equipo: 'FC Barcelona',
        foto: 'assets/images/raphinha.jpg',
        valor: 11,
      },
    ],
    asistencias: [
      {
        nombre: 'Player 1',
        equipo: 'FC Barcelona',
        foto: 'assets/images/player1.jpg',
        valor: 10,
      },
    ],
    amarillas: [
      {
        nombre: 'Player 2',
        equipo: 'Real Madrid',
        foto: 'assets/images/player2.jpg',
        valor: 5,
      },
    ],
    rojas: [
      {
        nombre: 'Player 3',
        equipo: 'Atlético Madrid',
        foto: 'assets/images/player3.jpg',
        valor: 3,
      },
    ],
  };
}

