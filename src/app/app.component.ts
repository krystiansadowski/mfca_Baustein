import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import{ HomePage } from '../pages/home/home';

import { KostenstrukturrechnerPage } from '../pages/kostenstrukturrechner/kostenstrukturrechner';
import { ModalKostenstrukturrechnerPage } from '../pages/modal-kostenstrukturrechner/modal-kostenstrukturrechner';

import { InvestitionsrechnerPage } from '../pages/investitionsrechner/investitionsrechner';
import { InvestitionsrechnerTabAnlagenPage } from '../pages/investitionsrechner-tab-anlagen/investitionsrechner-tab-anlagen';
import { InvestitionsrechnerTabInvestitionPage } from '../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerTabErgebnisPage } from '../pages/investitionsrechner-tab-ergebnis/investitionsrechner-tab-ergebnis';
import { ModalInvestitionsrechnerPage } from '../pages/modal-investitionsrechner/modal-investitionsrechner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
