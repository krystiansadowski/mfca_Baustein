import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';

// Komponenten für Konstenstrukturrechner
import { KostenstrukturrechnerPage } from '../pages/kostenstrukturrechner/kostenstrukturrechner';
import { ModalKostenstrukturrechnerPage } from '../pages/modal-kostenstrukturrechner/modal-kostenstrukturrechner';

// Komponenten für Investitionsrechner 
import { InvestitionsrechnerPage} from '../pages/investitionsrechner/investitionsrechner';
import { InvestitionsrechnerTabAnlagenPage } from '../pages/investitionsrechner-tab-anlagen/investitionsrechner-tab-anlagen';
import { InvestitionsrechnerTabInvestitionPage } from '../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerTabErgebnisPage } from '../pages/investitionsrechner-tab-ergebnis/investitionsrechner-tab-ergebnis';
import { InvestitionsrechnerProvider} from '../providers/investitionsrechner/investitionsrechner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// ng2 Chart Modules Komponenten
import { ChartsModule }from 'ng2-charts/ng2-charts';
import Chart from 'chart.js';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KostenstrukturrechnerPage,
    ModalKostenstrukturrechnerPage,
    InvestitionsrechnerPage, 
    InvestitionsrechnerTabAnlagenPage,
    InvestitionsrechnerTabInvestitionPage,
    InvestitionsrechnerTabErgebnisPage
  ],
  imports: [
    BrowserModule,    
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    KostenstrukturrechnerPage,
    ModalKostenstrukturrechnerPage,
    InvestitionsrechnerPage, 
    InvestitionsrechnerTabAnlagenPage,
    InvestitionsrechnerTabInvestitionPage,
    InvestitionsrechnerTabErgebnisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InvestitionsrechnerProvider
  ]
})
export class AppModule {}
