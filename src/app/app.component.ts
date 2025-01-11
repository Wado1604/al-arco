import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  matches = [
    { 
      equipo1: { logo: 'assets/logo1.png', nombre: 'Equipo 1' },
      equipo2: { logo: 'assets/logo2.png', nombre: 'Equipo 2' },
      jornada: 1,
      hora: '12:00'
    },
  ];

  constructor(private router: Router) {}
  
  saveMatch(index: number) {
    console.log(`Guardando el partido: ${this.matches[index].equipo1.nombre} vs ${this.matches[index].equipo2.nombre}`);
    // Aquí puedes agregar el código para guardar en backend o localStorage
  }

  deleteMatch(index: number) {
    this.matches.splice(index, 1);
    console.log(`Partido eliminado en la posición: ${index}`);
    // Aquí puedes agregar el código para eliminar del backend o localStorage
  }

  openAddMatchModal() {
    console.log('Abrir modal para agregar partido');
    // Lógica para abrir el modal
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/login');  // Redirigir manualmente al login
    }, 100);  // Redirigir después de 100ms
  }
}

