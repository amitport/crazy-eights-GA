import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { GamePageComponent } from './game-page/game-page.component';
import { CardComponent } from './game-page/card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StockpileComponent } from './game-page/stockpile/stockpile.component';
import { HandComponent } from './game-page/hand/hand.component';
import { HiddenHandComponent } from './game-page/hidden-hand/hidden-hand.component';
import { DiscardPileComponent } from './game-page/discard-pile/discard-pile.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    CardComponent,
    StockpileComponent,
    HandComponent,
    HiddenHandComponent,
    DiscardPileComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,

    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
