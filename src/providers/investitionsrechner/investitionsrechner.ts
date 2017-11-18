import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { FormArray } from '@angular/forms/src/model';


@Injectable()
export class InvestitionsrechnerProvider {

  // // private data: any = [];
  // private data = new Map<string, string>();

  // constructor(private toastCtrl: ToastController) {
  //   this.load();
  // }

  // load() {
  //   if (this.data) {
  //     // return bereits vorhandene Daten des providers
  //     return Promise.resolve(this.data);
  //   }

  //   // this.data.set = [
  //   //   // ### Alternative 1 ###
  //   //   // Testdaten  Tab1 
  //   //   { key: 'betriebsAltMaterialKosten', value: '10' },
  //   //   { key: 'betriebsAltBetriebundHilfstoffeKosten', value: '10' },
  //   //   { key: 'betriebsAltWartungKosten', value: '10' },
  //   //   { key: 'betriebsAltEntsorgungKosten', value: '10' },
  //   //   { key: 'betriebsAltEnergieKosten', value: '10' },
  //   //   { key: 'betriebsAltWerkzeugKosten', value: '10' },
  //   //   { key: 'betriebsAltPersonalKosten', value: '10' },
  //   //   { key: 'betriebsAltRaumKosten', value: '10' },
  //   //   { key: 'betriebsAltInstandsetzungKosten', value: '10' },
  //   //   { key: 'betriebsAltRuestKosten', value: '10' },
  //   //   { key: 'betriebsAltLagerKosten', value: '10' },
  //   //   { key: 'betriebsAltSonstigebetriebskosten', value: '10' },

  //   //   { key: 'verwertungsRueckbauKosten', value: '100' },
  //   //   { key: 'verwertungsRestwert', value: '10' },
  //   //   { key: 'verwertungsSonstigeVerwertungKosten', value: '5' },

  //   //   // Testdaten  Tab2 erterTeil
  //   //   { key: 'bezeichnungInvestition', value: 'Alternative A' },
  //   //   { key: 'betriebsInfraNeuBeschaffungsKosten', value: '10' },
  //   //   { key: 'betriebsInfraNeuInfrastrukturKosten', value: '10' },
  //   //   { key: 'betriebsInfraNeuSonstigeEntstehungsKosten', value: '10' },

  //   //   // Testdaten Tab2 zweiterTeil
  //   //   { key: 'betriebsNeuMaterialKosten', value: '5' },
  //   //   { key: 'betriebsNeuBetriebsundHilfsStoffeKosten', value: '5' },
  //   //   { key: 'betriebsNeuWartungsKosten', value: '5' },
  //   //   { key: 'betriebsNeuAbfallManagement', value: '5' },
  //   //   { key: 'betriebsNeuEnergieKosten', value: '5' },
  //   //   { key: 'betriebsNeuWerkzeugKosten', value: '5' },
  //   //   { key: 'betriebsNeuPersonalKosten', value: '5' },
  //   //   { key: 'betriebsNeuRaumKosten', value: '5' },
  //   //   { key: 'betriebsNeuInstandsetzungKosten', value: '5' },
  //   //   { key: 'betriebsNeuRuestKosten', value: '5' },
  //   //   { key: 'betriebsNeuLagerKosten', value: '5' },
  //   //   { key: 'betriebsNeuSonstigeBetriebsKosten', value: '15' },

  //   //   // Testdaten Tab2 dritterTeil
  //   //   { key: 'verwertungNeuRueckbauKosten', value: '2' },
  //   //   { key: 'verwertungNeuRestwert', value: '100' },


  //   //   // ### Alternative 2 ###
  //   //   // Testdaten  Tab2 erterTeil
  //   //   { key: 'bezeichnungInvestition', value: 'Alternative A' },
  //   //   { key: 'AlternativeBetriebsInfraNeuBeschaffungsKosten', value: '20' },
  //   //   { key: 'AlternativeBetriebsInfraNeuInfrastrukturKosten', value: '20' },
  //   //   { key: 'AlternativeBetriebsInfraNeuSonstigeEntstehungsKosten', value: '20' },

  //   //   // Testdaten Tab2 zweiterTeil
  //   //   { key: 'AlternativeBetriebsNeuMaterialKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuBetriebsundHilfsStoffeKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuWartungsKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuAbfallManagement', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuEnergieKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuWerkzeugKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuPersonalKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuRaumKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuInstandsetzungKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuRuestKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuLagerKosten', value: '10' },
  //   //   { key: 'AlternativeBetriebsNeuSonstigeBetriebsKosten', value: '30' },

  //   //   // Testdaten Tab2 dritterTeil
  //   //   { key: 'AlternativeVerwertungNeuRueckbauKosten', value: '4' },
  //   //   { key: 'AlternativeVerwertungNeuRestwert', value: '100' },

  //   //   //   // Testdaten Tab3
  //   //   { key: 'kalkulatorischerZins', value: '5' },
  //   //   { key: 'nutzungsdauer', value: '20' }
  //   // ];
  // }

  // /* ------ Setter und Getter Methoden ------*/

  // /* Setter für Key Value Mapping im Provider */
  // setKeyValueMappingToProvider(key, value) {
  //   if (value == undefined) {
  //     value = 0;
  //   }

  //   this.data.set(key, value);

  //   // this.data.push({ key: key, value: value });

  //   // if (this.data.length != 0) {
  //   //   var len = this.data.length,
  //   //     i;
  //   //   for (i = 0; i < len; i++) {
  //   //     if (this.data[i].key === key) {
  //   //       this.data[i].value = value;
  //   //     }
  //   //   }
  //   // }
  //   console.log("InvestitionsProvider Mapping Key: " + key + ", value: " + value + ".");
  //   return this.data;
  // }

  // /*
  // Getter für einen Value
  // @Param key
  // */
  // getValueByKey(key) {
  //   this.data.forEach((key: string, value: string) => {
  //     if (key == key) {
  //       return value;
  //     }
  //   });
  // }



  // // if (this.data.size != 0) {
  // //     if (DataCue..key == key) {
  // //       console.log("Getter: Ausgelesener Value für den Key '" + key + "' = " + data.value);
  // //       return data.value;
  // //     }
  // //   }
  // // }
  // // else {
  // //   console.log("Getter: Kein Value für den Key '" + key + "' gefunden.");
  // // }
  // // }

  // /*
  // Getter für Values die mit "key" beginnen
  // @Param key
  // */
  // getValueStartsWith(keys: string) {
  //   let alleValuesStartsWith = [];


  //   this.data.forEach((key: string, value: string) => {
  //     if (key.startsWith(keys)) {
  //       alleValuesStartsWith.push(key, value);
  //     }
  //   });
  //   return alleValuesStartsWith;

  //   // if (this.data.length != 0) {
  //   //   for (let data of this.data) {
  //   //     if (data.key.startsWith(key)) {
  //   //       alleValuesStartsWith.push(data.value);
  //   //     }
  //   //   }
  //   //   console.log("Getter: Ausgelesene/r Value/s für den Key '" + key + "' = " + alleValuesStartsWith.toString());
  //   //   return alleValuesStartsWith;
  //   // }
  //   // else {
  //   //   console.log("Getter: Keine Values für den Key '" + key + "' gefunden.")
  //   // }
  // }


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



  // /* ----- Methoden zum Umgang mit Fehlern -----*/
  // private createToast(message: string, position: string, duration: number) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     position: position,
  //     duration: duration
  //   });
  //   return toast;
  // }





  // Neuer Versuch Array Daten über die Tabs zu peristieren

  private data = new Map<string, string>();
  // private data = [];

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

  /* Set Data to Provider */
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


  // /*
  // Getter für einen Value
  // @Param keyToSearch
  // */
  getValueByKey(keyToSearch) {
    let valueFound = "";

    this.data.forEach((value: string, key: string) => {
      if (key == keyToSearch) {
        valueFound = value;
        console.log("Getter: Ausgelesener Value für den Key '" + keyToSearch + "' = " + valueFound);
      }
    });
    this.ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound)

    return valueFound;
  }


  private ifValueFoundisEmptyShowGetterError(keyToSearch, valueFound) {
    if (valueFound == "") {
      console.log("Getter: Für den Key '" + keyToSearch + "' konnte kein Value gefunden werden.");
    }
  }
}

