import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Contact } from 'src/app/core/models/contact.model';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  contact: Contact = {
    "@id" : '',
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  };

  // Variables pour gérer l'état du modal
  showModal: boolean = false;

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  phoneNumberRegex = /^[0-9]{10}$/;
  fullNameRegex = /^[A-Za-zÀ-ÿ\s]+$/;

  constructor( private location: Location ) {}

  // Méthode pour envoyer le message
  logFormData() {
    if (this.isFormValid()) {
      const messageId = this.generateMessageId();
      this.contact['@id'] = messageId;

      // Affichage du modal de confirmation
      this.showModal = true;

      console.log('Message envoyé:', this.contact);

      setTimeout(() => {
        this.closeModal();
      }, 10000);

      // Réinitialiser le formulaire après envoi
      this.contact = {
        '@id': '',
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
      };
    } else {
      console.log('Veuillez remplir tous les champs correctement.');
    }
  }

  // Méthode pour générer un identifiant unique pour chaque message
  generateMessageId(): string {
    return 'msg-' + new Date().getTime();
  }

  // Vérification si tous les champs sont remplis et valides
  isFormValid() {
    return (
      this.isFullNameValid() &&
      this.isMessageValid() &&
      this.isEmailOrPhoneValid()
    );
  }

  // Vérifier si le nom complet est valide
  isFullNameValid() {
    return this.fullNameRegex.test(this.contact.fullName);
  }

  // Vérifier si l'email est valide
  isEmailValid() {
    return this.emailRegex.test(this.contact.email);
  }

  // Vérifier si le numéro de téléphone est valide
  isPhoneNumberValid() {
    return this.phoneNumberRegex.test(this.contact.phoneNumber);
  }

  // Vérifier si le message est valide
  isMessageValid() {
    return this.contact.message.trim() !== '';
  }

  // Vérifier si l'email ou le numéro de téléphone est rempli
  isEmailOrPhoneValid() {
    return this.contact.email.trim() !== '' || this.contact.phoneNumber.trim() !== '';
  }

  closeModal() {
    this.showModal = false;
    // Retourner à la page précédente
    this.location.back();
  }
}