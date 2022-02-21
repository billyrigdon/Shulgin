import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrugService } from 'src/app/services/drug.service';
import { StorageService } from 'src/app/services/storage.service';
import { Drug } from 'src/app/types/drug';

@Component({
	selector: 'app-add-drug',
	templateUrl: './add-drug.component.html',
	styleUrls: ['./add-drug.component.scss'],
})
export class AddDrugComponent implements OnInit {
	drugs: Array<Drug>;
	form: FormGroup;

	constructor(
		private drugService: DrugService,
		private formBuilder: FormBuilder,
		private storageService: StorageService
	) {
		this.drugs = [];
		this.form = this.formBuilder.group({
			drugId: [0],
			dosage: ['', Validators.required],
		});
	}

	addDrug() {
		if (localStorage.getItem('user')) {
			let user = JSON.parse(localStorage.getItem('user') || '');
			const userId = user.userId;
			const val = this.form.value;

			this.drugService
				.addUserDrug(userId, parseInt(val.drugId), val.dosage)
				.subscribe((res) => {
					window.location.reload();
				});
		}
	}

	ngOnInit(): void {
		this.drugService.getDrugs().subscribe((res) => {
			this.drugs = JSON.parse(res);
		});
	}
}
