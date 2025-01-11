import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // Variables para controlar la visibilidad de las contraseñas
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  email: string = '';
  name: string = '';
  number: string = '';
  password: string = '';
  repeatPassword: string = '';
  typeAccount: number = 0;

  // Enum de tipo de cuentas
  typeAccountsEnum: any = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'client' }
  ];

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() { }

  // Alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  // Validar que todos los campos estén completos
  validateFields(): boolean {
    if (this.name === '' || this.email === '' || this.number === '' || this.password === '' || this.typeAccount === 0) {
      this.presentAlert('Error', 'Por favor completa todos los campos.');
      return false;
    }
    return true;
  }

  // Validar la coincidencia de las contraseñas
  validatePassword(): boolean {
    console.log('Contraseña:', this.password);
    console.log('Repetir Contraseña:', this.repeatPassword);

    if (this.password !== this.repeatPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return false;
    }
    return true;
  }

  // Alerta para mostrar mensajes
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async signup() {
    if (!this.validateFields()) {
      console.log('Fallo en validateFields');
      return;
    }

    if (!this.validatePassword()) {
      console.log('Fallo en validatePassword');
      return;
    }

    // Obtener el tipo de cuenta como nombre (admin o client)
    const selectedAccountType = this.typeAccountsEnum.find(
      (type: any) => type.id === this.typeAccount
    )?.name;

    const userObject = {
      name: this.name,
      email: this.email,
      number: this.number,
      password: this.password,
      typeAccount: selectedAccountType, // Guardar como "admin" o "client"
    };

    console.log('Intentando guardar usuario:', userObject);

    let storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    storedUsers.push(userObject);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    console.log('Usuario registrado con éxito:', storedUsers);

    const successAlert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Tu cuenta ha sido creada correctamente.',
      buttons: ['OK'],
    });
    await successAlert.present();

    console.log('Redirigiendo al login...');
    this.router.navigateByUrl('/login');
  }
}
