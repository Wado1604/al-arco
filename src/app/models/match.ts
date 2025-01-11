import { Match as MatchInterface } from '../models/match';


// src/app/models/match.ts
export interface Team {
  nombre: string;
  logo: string;
  puntaje: number;
}

export interface Match {
  equipo1: Team;  // { nombre, logo, puntaje }
  equipo2: Team;  
  fecha: string;  
  hora: string;   
  jornada: number;
}



// Implementaciones no definidas
function addMatch() {
  throw new Error('Función no implementada.');
}

function editMatch(match: any, Match: any) {
  throw new Error('Función no implementada.');
}

