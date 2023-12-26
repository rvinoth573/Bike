import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() emitSearchValue = new EventEmitter();
  public bikeForm = this.fb.group({
    location: ['chennai', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]],
    distance: [10],
  })
  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.search();
  }
  search() {
    if(this.bikeForm.valid){
    this.emitSearchValue.emit(this.bikeForm.getRawValue());
    }else{
      console.log('input error')
    }
  }

}
