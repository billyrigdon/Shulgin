import { Component, OnInit } from '@angular/core';
import { DrugService } from 'src/app/services/drug.service';
import { Drug } from 'src/app/types/drug';

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.scss']
})
export class AddDrugComponent implements OnInit {

  drugs: Array<Drug>
  

  constructor(private drugService: DrugService) { 
    this.drugs = []
  }

  ngOnInit(): void {
    this.drugService.getDrug().subscribe((res) => {
      this.drugs = JSON.parse(res);
    })
  }

}
