import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  exports: [
      MatCardModule, MatFormFieldModule, MatTableModule, 
      MatSelectModule, MatInputModule, MatButtonModule,
    ],
})
export class MaterialModule {}
