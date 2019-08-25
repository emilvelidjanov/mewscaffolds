import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewData } from 'src/app/model/abstract/mew-data';
import { MewDataService } from 'src/app/service/mewdata/mewdata.service';

@Component({
  selector: 'app-token-form',
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.scss']
})
export class TokenFormComponent implements OnInit {

  @Input() data: MewData[];
  @Input() label: string;
  @Input() dataLabel: string;

  name: string;
  nameInputPlaceholder: string;

  constructor(private textConfig: TextConfig, private mewDataService: MewDataService) {
    this.data = [];
    this.label = "";
    this.dataLabel = "";
    this.name = "";
    this.nameInputPlaceholder = "";
  }

  ngOnInit() {
  }

  // TODO: fix scaffolds not showing
  ngOnChanges() {
    let viewData: MewData = this.getViewData();
    if (viewData != null) {
      this.name = viewData.name;
      this.nameInputPlaceholder = this.textConfig.nameInputPlaceholder;
    }
    else {
      this.name = "";
      this.nameInputPlaceholder = this.textConfig.multiplePlaceholder;
    }
  }

  getViewData(): MewData {
    let selected: MewData[] = this.getSelectedData();
    let viewData: MewData = null;
    if (selected.length == 1) {
      viewData = selected[0];
    }
    return viewData;
  }

  getSelectedData(): MewData[] {
    return this.data.filter(token => token.isSelected);
  }

}
