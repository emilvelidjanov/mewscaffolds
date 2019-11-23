import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-generate-code-modal',
  templateUrl: './generate-code-modal.component.html',
  styleUrls: ['./generate-code-modal.component.scss']
})
export class GenerateCodeModalComponent implements OnInit {

  code: string;

  constructor(public textConfig: TextConfig, private mewDataService: MewDataService) { }

  ngOnInit() {
    this.code = "";
  }

  generateCode(): void {
    this.mewDataService.fetchGeneratedCode().subscribe(response => {
      this.code = response["code"];
    },
    error => {
      alert("Error: Could not generate code. Please make sure that no field is empty.");
      console.log(error);
    });
  }

  saveToFile(): void {
    let blob = new Blob([this.code], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "gcode.txt"); 
  }
}
