import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewData } from 'src/app/model/abstract/mew-data';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';

// TODO: sanitize input and error messages
// TODO: add missing data
@Component({
  selector: 'app-mew-data-form',
  templateUrl: './mew-data-form.component.html',
  styleUrls: ['./mew-data-form.component.scss']
})
export class MewDataFormComponent implements OnInit {

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

  ngOnChanges() {
    let viewData: MewData = this.getViewData();
    if (viewData != null) {
      this.name = viewData.name;
      this.nameInputPlaceholder = this.textConfig.nameInputPlaceholder;
    }
    else {
      this.name = null;
      this.nameInputPlaceholder = this.textConfig.multiplePlaceholder;
    }
  }

  getViewData(): MewData {
    let selected: MewData[] = this.getSelectedData();
    let viewData: MewData = null;
    if (selected.length == 1) {
      viewData = selected.pop();
    }
    return viewData;
  }

  getSelectedData(): MewData[] {
    return this.data.filter(token => token.isSelected);
  }

  onInput(name: string, value: string) {
    this.getSelectedData().forEach(item => {
      if (name === this.textConfig.nameInputName) item.name = value;
    });
  }

  recalculatePaths() {
    this.getSelectedData().forEach(item => {
      this.mewDataService.recalculatePathsRecursive(item);
    });
  }
}
