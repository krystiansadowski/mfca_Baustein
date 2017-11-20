import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Toast, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { FormArray } from '@angular/forms/src/model';


@Injectable()
export class InvestitionsrechnerProvider {
  private data = new Map<string, string>();

  constructor(private toastCtrl: ToastController,
    private fb: FormBuilder) {
    this.load();
  }

  load() {
    if (this.data) {
      // return bereits vorhandene Daten des providers
      return Promise.resolve(this.data);
    }
  }

  // ### Setter für Provider ###

  setData(values) {
    for (var formProperties in values) {
      if (values[formProperties] == "") {
        values[formProperties] = '0';
      }
      this.data.set(formProperties, values[formProperties]);
      //   console.log("Key: ", formProperties, ",  Value: ", values[formProperties]);
    }
    console.log("Mapping der Formulardaten.", this.data);
    return this.data;
  }


  // ### Getter Methoden ###

  // /*
  // Getter für einen Value
  // @Param key
  // */
  getValueByKey(keyToSearch) {
    let valueFound = "";

    this.data.forEach((value: string, key: string) => {
      if (key == keyToSearch) {
        valueFound = value;
        console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
      }
    });
    this.ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound)

    return valueFound;

    // let valueFound = [];

    // this.data.forEach((value: string, key: string) => {
    //   if (key == keyToSearch) {
    //     valueFound.push(value);
    //     console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
    //   }
    // });
    // // this.ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound)

    // return valueFound;
  }


  // /*
  // Getter für Values die mit "key" beginnen
  // @Param key
  // */
  getValueStartsWith(keyToSearch: string) {
    var alleValuesStartsWith = [];

    if (this.data != null) {
      this.data.forEach((value: string, key: string) => {
        if (key.startsWith(keyToSearch)) {
          alleValuesStartsWith.push(value);
        }

      });
      if (alleValuesStartsWith.toString.length != 0) {
        console.log("Getter: Ausgelesene/r Value/s für den Key '" + keyToSearch + "' = " + alleValuesStartsWith.toString());
      }
      // else {
      //   this.ifValueFoundisEmptyShowGetterError(keyToSearch, alleValuesStartsWith);
      // }
    }
    return alleValuesStartsWith;
  }


  getAlternativenValue(keyToSearch) {
    var valueFound = [];

    this.data.forEach((value: string, key: string) => {
      if (key == keyToSearch) {
        valueFound.push(value);
        console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
      }
    });
    // this.ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound)

    return valueFound;



    // var alternativen = this.getValueByKey('alternativen');
    // return alternativen;

    // alternativen.forEach((value: any, key: number) => {

    // });
  }


  /* Getter für den Zinsfaktor, bedeutend für die Berechnungsgrundlage des 
  Kapitalwerts und der Amortisationszeit
  */
  zinsFaktor() {
    var zinsfaktor = 0.0;
    var kalkulatorischerZins = parseFloat(this.getValueByKey('kalkulatorischerZins')) / 100;
    zinsfaktor = 1 + kalkulatorischerZins;

    return zinsfaktor;
  }


/* Getter für die Nutzungsdauer, bedeutend für die Berechnungsgrundlage des 
Kapitalwerts und der Amortisationszeit
*/
  getNutzungsdauer() {
    return parseFloat(this.getValueByKey('nutzungsdauer'));
  }


  private ifValueFoundisEmptyShowGetterError(keyToSearch, values) {
    if (values == "") {
      console.log("Getter: Für den Key '" + keyToSearch + "' konnte kein Value gefunden werden.");
    }
  }



  // ### Methoden zur Berechnungen ###

  summiereAlleValuesStartsWith(key) {
    // Definierter Toast für den Bentuzer zum Fehlerabfang, wenn die Werte aus den vorigen Tabs leer sind.
    let toast = this.createToast(
      'Zur Berechnung werden Werte aus den vorherigen Tabs benötigt. Bitte ausfüllen.',
      'bottom',
      4000
    );

    var alleGefundenenValuesGesamt = 0.0;
    try {
      var alleGefundenenValues = this.getValueStartsWith(key);
      for (var i = 0; i < alleGefundenenValues.length; i++) {
        alleGefundenenValuesGesamt += parseFloat(alleGefundenenValues[i]);
      }
      console.log("Berechnung: Ergebnis Summe für die Values Parameter startWith '" + key + "' = " + alleGefundenenValuesGesamt.toString());
      return alleGefundenenValuesGesamt;
    }
    catch (e) {
      console.log("Berechnung: Fehler beim auslesen der Daten. Bitte sicherstellen, dass das Key-Value-Mapping des Investitionsproviders gültige Paare aufweist.");
      console.log('Details im Stacktrace: ', e);
      toast.present();
    }
  }


  // investitionVornutzung
  berechneVerwertungskostenVorInvestition() {
    var ergVerwertungskostenVorInvestition = 0.0;

    // neu
    var beschaffungsUndInfrastrukturKosten = this.summiereAlleValuesStartsWith('betriebsInfraNeu');

    var rueckbauKosten = parseFloat(this.getValueByKey("verwertungAltRueckbauKosten"));
    var restWert = parseFloat(this.getValueByKey("verwertungAltRestwert"));
    var sonstigeKosten = parseFloat(this.getValueByKey("verwertungAltSonstigeVerwertungKosten"));

    ergVerwertungskostenVorInvestition = beschaffungsUndInfrastrukturKosten + (rueckbauKosten - restWert);

    console.log("Ergebnis: Der jährlichen Kosten vor der Investition betragen : " + ergVerwertungskostenVorInvestition + " Euro.");
    return ergVerwertungskostenVorInvestition;
  }


  berechneJaehrlicheEinsparung() {
    var jaerhlicheEinsparung = 0.0;
    let alleBetrieblichenKostenVorInvestition = this.summiereAlleValuesStartsWith('betriebsAlt');
    let alleBetrieblichenKostenNachInvestition = this.summiereAlleValuesStartsWith('betriebsNeu');
    jaerhlicheEinsparung = alleBetrieblichenKostenVorInvestition - alleBetrieblichenKostenNachInvestition;
    return jaerhlicheEinsparung;
  }


  berechneVerwertungskostenNachInvestition() {
    var ergVerwertungskostenNachInvestition = 0.0;

    var neuRestwert = parseFloat(this.getValueByKey("verwertungNeuRestwert"));
    var neuRueckbauKosten = parseFloat(this.getValueByKey("verwertungNeuRueckbauKosten"));
    // var sonstigeKosten = parseFloat(this.getValueByKey("verwertungSonstigeVerwertungKosten"));

    ergVerwertungskostenNachInvestition = neuRestwert - neuRueckbauKosten;

    console.log("Ergebnis: Der jährlichen Kosten nach der Investition betragen : " + ergVerwertungskostenNachInvestition + " Euro.");
    return ergVerwertungskostenNachInvestition;
  }



  // ### Methoden zum Umgang mit Fehlern ###

  private createToast(message: string, position: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    return toast;
  }
}