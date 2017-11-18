import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Toast, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { FormArray } from '@angular/forms/src/model';


@Injectable()
export class InvestitionsrechnerProvider {



  // /* Getter für alle Values im Mapping ohne Parameter*/
  // getAllValues() {
  //   let alleValues = [];
  //   var iterator = this.data.keys();
  //   if (iterator.next()) {
  //     alleValues.push(iterator.next().value);
  //   }
  //   return alleValues;

  //   // if (this.data.length != 0) {
  //   //   this.data.forEach(element => {
  //   //     alleValues.push(element.value)
  //   //   });
  //   //   console.log("Getter: Alle ausgelesene Values ohne Paramer = " + alleValues.toString());
  //   //   return alleValues;
  //   // }
  //   // else {
  //   //   console.log("Getter: Keine Values vorhanden!")
  //   // }
  // }


  // /* Getter für alle keys und values, wo key mit "key" beginnt  
  // @paramter key
  // */
  // getKeyUndValueWhereKeyStartsWith(key) {
  //   let alleKeysUndValuesStartsWithKey = [];

  //   // if (this.data.length != 0) {
  //   //   this.data.forEach(element => {
  //   //     if (element.key.startsWith(key)) {
  //   //       alleKeysUndValuesStartsWithKey.push({ key: element.key, value: element.value });
  //   //     }
  //   //   });
  //   //   return alleKeysUndValuesStartsWithKey;
  //   // }
  // }


  // /* Getter für den Zinsfaktor, bedeutend für die Berechnungsgrundlage des 
  // Kapitalwerts und der Amortisationszeit
  // */
  // getZinsfaktor() {

  //   var zinsfaktor = 0.0;
  //   var kalkulatorischerZins = parseFloat(this.getValueByKey('kalkulatorischerZins')) / 100;
  //   zinsfaktor = 1 + kalkulatorischerZins;

  //   return zinsfaktor;
  // }

  // /* Getter für die Nutzungsdauer, bedeutend für die Berechnungsgrundlage des 
  // Kapitalwerts und der Amortisationszeit
  // */
  // getNutzungsdauer() {
  //   return parseFloat(this.getValueByKey('nutzungsdauer'));
  // }




  // /* ------ Methoden zur Berechnung ------*/

  // summiereAlleValuesStartsWith(key) {

  //   // Definierter Toast für den Bentuzer zum Fehlerabfang, wenn die Werte aus den vorigen Tabs leer sind.
  //   let toast = this.createToast(
  //     'Zur Berechnung werden Werte aus den vorherigen Tabs benötigt. Bitte ausfüllen.',
  //     'bottom',
  //     4000
  //   );

  //   var alleGefundenenValuesGesamt = 0.0;
  //   try {
  //     var alleGefundenenValues = this.getValueStartsWith(key);
  //     for (var i = 0; i < alleGefundenenValues.length; i++) {
  //       alleGefundenenValuesGesamt += parseFloat(alleGefundenenValues[i]);
  //     }



  //     console.log("Ergebnis Summe für die Values Parameter startWith '" + key + "' = " + alleGefundenenValuesGesamt.toString());
  //     return alleGefundenenValuesGesamt;
  //   }
  //   catch (e) {
  //     console.log('Fehler beim auslesen der Daten. Bitte sicherstellen, dass das Key-Value-Mapping des Investitionsproviders gültige Paare aufweist.')
  //     console.log('Details im Stacktrace: ', e);
  //     toast.present();
  //   }
  // }


  // // investitionVornutzung
  // berechneVerwertungskostenVorInvestition() {
  //   var ergVerwertungskostenVorInvestition = 0.0;

  //   // neu
  //   var beschaffungsUndInfrastrukturKosten = this.summiereAlleValuesStartsWith('betriebsInfraNeu');

  //   var rueckbauKosten = parseFloat(this.getValueByKey("verwertungsRueckbauKosten"));
  //   var restWert = parseFloat(this.getValueByKey("verwertungsRestwert"));
  //   var sonstigeKosten = parseFloat(this.getValueByKey("verwertungsSonstigeVerwertungKosten"));

  //   ergVerwertungskostenVorInvestition = beschaffungsUndInfrastrukturKosten + (rueckbauKosten - restWert);

  //   console.log("Ergebnis: Der jährlichen Kosten vor der Investition betragen : " + ergVerwertungskostenVorInvestition + " Euro.");
  //   return ergVerwertungskostenVorInvestition;
  // }

  // berechneVerwertungskostenNachInvestition() {
  //   var ergVerwertungskostenNachInvestition = 0.0;

  //   var neuRestwert = parseFloat(this.getValueByKey("verwertungNeuRestwert"));
  //   var neuRueckbauKosten = parseFloat(this.getValueByKey("verwertungNeuRueckbauKosten"));
  //   var sonstigeKosten = parseFloat(this.getValueByKey("verwertungSonstigeVerwertungKosten"));

  //   ergVerwertungskostenNachInvestition = neuRestwert - neuRueckbauKosten;

  //   console.log("Ergebnis: Der jährlichen Kosten nach der Investition betragen : " + ergVerwertungskostenNachInvestition + " Euro.");
  //   return ergVerwertungskostenNachInvestition;
  // }

  // berechneJaehrlicheEinsparung() {
  //   var jaerhlicheEinsparung = 0.0;
  //   let alleBetrieblichenKostenVorInvestition = this.summiereAlleValuesStartsWith('betriebsAlt');
  //   let alleBetrieblichenKostenNachInvestition = this.summiereAlleValuesStartsWith('betriebsNeu');
  //   jaerhlicheEinsparung = alleBetrieblichenKostenVorInvestition - alleBetrieblichenKostenNachInvestition;
  //   return jaerhlicheEinsparung;
  // }




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
    // let valueFound = "";

    // this.data.forEach((value: string, key: string) => {
    //   if (key == keyToSearch) {
    //     valueFound = value;
    //     console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = " , valueFound);
    //   }
    // });
    // this.ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound)

    // return valueFound;

    let valueFound = [];

    this.data.forEach((value: string, key: string) => {
      if (key == keyToSearch) {
        valueFound.push(value);
        console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
      }
    });
    // this.ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound)

    return valueFound;
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


  getAlternativen() {
    var alternativen  = this.getValueByKey('alternativen');
    return alternativen;

    // alternativen.forEach((value: any, key: number) => {
      
    // });

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

