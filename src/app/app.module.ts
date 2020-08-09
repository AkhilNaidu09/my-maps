import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlacesComponent } from './google-places/google-places.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    AppComponent,
    GooglePlacesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCarouselModule.forRoot(),
    MatListModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
