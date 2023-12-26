import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,
    MatGridListModule,MatInputModule, FormsModule,ReactiveFormsModule,
      ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() emitFilterValue = new EventEmitter();
  public bikeForm = this.fb.group({
    title: [''],
    startDate: [],
    endDate: [],
  })
  constructor(private fb: FormBuilder){}

  filter(){
    this.emitFilterValue.emit(this.bikeForm.getRawValue());
  }
}
