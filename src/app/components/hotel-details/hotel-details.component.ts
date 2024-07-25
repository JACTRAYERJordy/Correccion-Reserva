import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  hotel: any;
  currentImage: string = '';
  reservationForm: FormGroup;
  showPaymentForm = false;

  hotelServices = [
    { icon: 'icon-fitness-center', text: 'Centro de fitness 24 horas con equipo de cardio y pesas.' },
    { icon: 'icon-valet-parking', text: 'Valet parking $80/noche.' },
    { icon: 'icon-self-parking', text: 'Autoestacionamiento $52/noche.' },
    { icon: 'icon-rooms', text: '222 habitaciones.' },
    { icon: 'icon-elevator', text: 'Ascensor.' },
    { icon: 'icon-rooftop', text: 'Terraza.' },
    { icon: 'icon-bikes', text: 'Bicicletas de la casa.' }
  ];

  roomServices = [
    { icon: 'icon-air-conditioning', text: 'Aire acondicionado.' },
    { icon: 'icon-pets', text: 'Mascotas OK, tarifa fija de $150.' },
    { icon: 'icon-room-size', text: 'Habitación de aproximadamente 275 sq ft.' },
    { icon: 'icon-tv', text: 'Televisor de pantalla plana de 42".' },
    { icon: 'icon-minibar', text: 'Minibar.' },
    { icon: 'icon-hair-dryer', text: 'Secador de pelo.' },
    { icon: 'icon-iron', text: 'Plancha.' },
    { icon: 'icon-laptop', text: 'Espacio de trabajo amigable con laptops.' },
    { icon: 'icon-safe', text: 'Caja fuerte.' },
    { icon: 'icon-crib', text: 'Cuna.' },
    { icon: 'icon-extinguisher', text: 'Extintor de incendios.' },
    { icon: 'icon-smoke-detector', text: 'Detector de humo.' }
  ];

  foodServices = [
    { icon: 'icon-restaurant', text: 'Print - Grab & Go Food Items sirve cocina americana, platos principales $15-40.' },
    { icon: 'icon-breakfast', text: 'Desayuno continental disponible con costo adicional.' },
    { icon: 'icon-room-service', text: 'Servicio de habitaciones disponible.' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.hotel = navigation?.extras?.state?.['hotel'] || null;
    if (this.hotel && this.hotel.images && this.hotel.images.length > 0) {
      this.currentImage = this.hotel.images[0];
    }

    this.reservationForm = this.fb.group({
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      numRooms: ['', [Validators.required, Validators.min(1)]],
      roomType: ['', Validators.required],
      adults: ['', [Validators.required, Validators.min(1)]],
      children: [0, Validators.min(0)],
      terms: [false, Validators.requiredTrue],
      paymentMethod: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      cardName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Puedes agregar lógica adicional aquí si es necesario
  }

  closeModal(): void {
    this.router.navigate(['/manta']);
  }

  onBackdropClick(event: Event): void {
    this.closeModal();
  }

  makeReservation(): void {
    this.router.navigate(['/reservation-date'], { state: { images: this.hotel.images, currentImage: this.currentImage } });
  }

  changeImage(image: string): void {
    this.currentImage = image;
  }

  closePaymentModal(): void {
    this.showPaymentForm = false; // Cerrar el modal de pago
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      // Aquí puedes manejar el envío de datos o cualquier lógica adicional
      console.log('Datos de la reserva:', reservationData);

      // Restablecer el formulario o navegar a otra página si es necesario
      this.reservationForm.reset();
      this.showPaymentForm = false; // Opcional, según tu lógica
    }
  }
}

