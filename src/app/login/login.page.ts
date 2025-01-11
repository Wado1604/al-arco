import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userEmail: string = '';

  users = [
    { email: 'admin@domain.com', password: 'admin123', role: 'admin' },
    { email: 'user@domain.com', password: 'user123', role: 'user' },
  ];

  email: any;
  reemberUser: boolean = false;
  isModalOpen = false;
  password: string | undefined;
  showPassword: boolean = false;

  constructor(public alertController: AlertController, public router: Router) { }

  ngOnInit() {
    this.getEmail();

    // Inicializar usuarios en localStorage si no existen
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(this.users));
      console.log('Usuarios inicializados en localStorage:', this.users);
    } else {
      console.log('Usuarios ya existen en localStorage:', JSON.parse(storedUsers));
    }
  }


  // Recuperar email desde localStorage
  getEmail() {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email') || '';
      this.reemberUser = true;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Recupoerar Contraseña',
      message: 'Introduce tu correo electronico para recuperar tu contraseña.',

      inputs: [{
        type: 'email',
        placeholder: 'Correo@gmail.com',
        name: 'user_email',
        value: this.userEmail,
      },
      ],
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          role: 'send',
          handler: (alertData) => {
            console.log('Valor de input:' + alertData.user_email);
          },
        },
      ]
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  logIn() {
    console.log('Email ingresado:', this.email);
    console.log('Password ingresado:', this.password);

    if (!this.email || !this.password) {
      console.log('Faltan datos para iniciar sesión');
      this.presentLoginError();
      return;
    }

    // Recuperar usuarios almacenados
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Usuarios almacenados:', storedUsers);

    const user = storedUsers.find(
      (u: any) => u.email === (this.email?.trim() || '') && u.password === (this.password?.trim() || '')
    );

    if (user) {
      console.log('Usuario encontrado:', user);

      // Guardar usuario logueado
      localStorage.setItem('loggedUser', JSON.stringify(user));

      if (this.reemberUser) {
        localStorage.setItem('email', this.email.trim());
      } else {
        localStorage.removeItem('email');
      }

      // Redirigir según rol
    if (user.typeAccount === 'admin') {
      console.log('Redirigiendo al área de Admin...');
      this.router.navigateByUrl('/admin');
    } else if (user.typeAccount === 'admin-posiciones') {
      console.log('Redirigiendo al área de Posiciones Admin...');
      this.router.navigateByUrl('/posiciones-admin');
    } else if (user.typeAccount === 'admin-equipos') {
      console.log('Redirigiendo al área de Equipos Admin...');
      this.router.navigateByUrl('/equipos-admin');
    } else if (user.typeAccount === 'admin-estadisticas') {
      console.log('Redirigiendo al área de Estadísticas Admin...');
      this.router.navigateByUrl('/estadisticas-admin');
    } else if (user.typeAccount === 'admin-jugadores') {
      console.log('Redirigiendo al área de Jugadores Admin...');
      this.router.navigateByUrl('/jugadores-admin');
    } else {
      console.log('Redirigiendo al área de Partidos...');
      this.router.navigateByUrl('/partidos');
    }
  } else {
    console.log('Credenciales inválidas');
    this.presentLoginError();
  }
}




  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  recoverPassword() {
    // Lógica para recuperar la contraseña
    console.log('Recuperar contraseña');
    this.closeModal();
  }

  resendCode() {
    // Lógica para reenviar el código
    console.log('Reenviar código');
  }

  goToEquiposAdmin() {
    this.router.navigate(['/equipos-admin']);
  }

  async presentLoginError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Correo o contraseña incorrectos.',
      buttons: ['OK']
    });
    await alert.present();
  }


}
