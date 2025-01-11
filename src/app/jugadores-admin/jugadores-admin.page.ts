import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jugadores-admin',
  templateUrl: './jugadores-admin.page.html',
  styleUrls: ['./jugadores-admin.page.scss'],
})
export class JugadoresAdminPage implements OnInit {
  alertController: any;
 
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this.addPlayer(); 
  }

  constructor(private router: Router,alertController: AlertController) {}
  
  players = [
    {
      image: 'assets/players/player1.jpg',
      name: 'Kylian Mbappé',
      position: 'Delantero',
      team: 'Real Madrid',
    },
    {
      image: 'assets/players/player2.jpg',
      name: 'Lamine Yamal',
      position: 'Delantero',
      team: 'Barcelona',
    },
  ];

  async openAddPlayerAlert() {
    const alert = await this.alertController.create({
      header: 'Agregar Jugador',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del jugador'
        },
        {
          name: 'position',
          type: 'text',
          placeholder: 'Posición'
        },
        {
          name: 'team',
          type: 'text',
          placeholder: 'Equipo'
        },
        {
          name: 'photo',
          type: 'url',
          placeholder: 'URL de la foto'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Guardar',
          handler: (data: any) => {
            console.log('Datos del jugador:', data);
            // Aquí puedes manejar el guardado de los datos del jugador
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  addPlayer() {
    // Lógica para agregar un nuevo jugador
    console.log('Agregar jugador');
  }
}
