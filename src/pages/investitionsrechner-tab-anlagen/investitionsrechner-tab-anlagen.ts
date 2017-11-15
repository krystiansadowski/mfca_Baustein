import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { InvestitionsrechnerTabInvestitionPage } from '../../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-anlagen',
  templateUrl: 'investitionsrechner-tab-anlagen.html',
})
export class InvestitionsrechnerTabAnlagenPage implements OnInit {

  private investitionen: FormGroup;
  
  constructor(private fb: FormBuilder) {  }

  ngOnInit() {
    this.investitionen = this.fb.group({
      alternativen: this.fb.array([
        this.fb.group({
          city:[''],
          country: ['']
        })
      ])
    });
  }
  
  private submit(value) {
    console.log(value);
  }
  
  addAlternative() {
    let alternativen = <FormArray>this.investitionen.get('alternativen');
    alternativen.push(this.fb.group({
      city: [''],
      country: ['']
    }))
  }
}
