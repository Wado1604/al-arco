import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FormsModule, // Asegúrate de que FormsModule está importado
  ],
  providers: [],
  bootstrap: [],
})

export class ModelsModule {
  match = {
    equipo1: { nombre: '', logo: '', puntaje: 0 },
    equipo2: { nombre: '', logo: '', puntaje: 0 },
    fecha: '',
    hora: '',
    jornada: 0,
  };
}


// src/app/models/match.ts
export interface Team {
  nombre: string;
  logo: string;
  puntaje: number;
}

export interface Match {
  equipo1: Team;
  equipo2: Team;
  fecha: string; // Fecha del partido
  hora: string;  // Hora del partido
  jornada: number; // Jornada del partido
}




