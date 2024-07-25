import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() hotelName: string = ''; // Recibe el nombre del hotel como input
  @Input() isReservationModalOpen: boolean = false; // Estado del modal de reserva
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  reservationForm: FormGroup; // Formulario de reserva
  paymentForm: FormGroup; // Formulario de pago
  isPaymentModalOpen: boolean = false; // Estado del modal de pago

  constructor(private fb: FormBuilder, private dataService: DataService) {
    // Inicializar el formulario de reserva con validaciones
    this.reservationForm = this.fb.group({
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      numRooms: [1, [Validators.required, Validators.min(1)]],
      roomType: ['', Validators.required],
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0, Validators.min(0)],
      terms: [false, Validators.requiredTrue]
    });

    // Inicializar el formulario de pago con validaciones
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      cardName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Método de inicialización del componente, si es necesario
    if (!this.hotelName) {
      console.warn('Hotel name is not provided.');
    }
  }

  openPaymentModal(): void {
    // Abrir el modal de pago si el formulario de reserva es válido y los términos están aceptados
    if (this.reservationForm.valid && this.reservationForm.get('terms')?.value) {
      this.isPaymentModalOpen = true;
    } else {
      this.highlightInvalidControls(this.reservationForm);
    }
  }

  closeReservationModal(): void {
    // Emitir el evento para cerrar el modal y cerrar el modal de pago si está abierto
    this.close.emit();
    this.closePaymentModal();
  }

  onSubmit(): void {
    // Manejar el envío del formulario de reserva
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      this.dataService.createReservation(reservationData).subscribe(response => {
        console.log('Reserva procesada:', response);
        // Cerrar el modal y resetear el formulario tras una reserva exitosa
        this.close.emit();
        this.reservationForm.reset();
        this.paymentForm.reset();
      }, error => {
        console.error('Error processing reservation:', error);
      });
    } else {
      this.highlightInvalidControls(this.reservationForm);
    }
  }

  closePaymentModal(): void {
    // Cerrar el modal de pago
    this.isPaymentModalOpen = false;
  }

  highlightInvalidControls(form: FormGroup): void {
    // Marcar todos los controles del formulario como tocados para mostrar errores
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }
}
