import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/app/types/user';

@Component({
	selector: 'app-create-profile',
	templateUrl: './create-profile.component.html',
	styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
	form: FormGroup;
	user: UserProfile;
	constructor(
		private formBuilder: FormBuilder,
		private profileService: ProfileService
	) {
		this.form = this.formBuilder.group({
			age: ['', Validators.required],
			weight: ['', Validators.required],
			country: ['', Validators.required],
			avatar: ['', Validators.required],
			funFact: ['', Validators.required],
			covidVaccine: [false, Validators.required],
			smoker: [false, Validators.required],
			drinker: [false, Validators.required],
			optOut: [false, Validators.required],
		});
		this.user = {
			userId: 0,
			age: 0,
			weight: 0,
			country: '',
			avatar: '',
			status: '',
			reputation: 0,
			funFact: '',
			covidVaccine: false,
			smoker: false,
			drinker: false,
			twoFactor: false,
			optOutOfPublicStories: false,
			cameraPermission: false,
			microphonePermission: false,
			notificationPermission: false,
			filePermission: false,
			nightMode: false,
			highContrast: false,
			slowInternet: false,
			textSize: 16,
			screenReader: false,
		};
	}

	ngOnInit(): void {}

	submitProfile() {
		let val = this.form.value;

		this.user.age = parseInt(val.age);
		this.user.weight = parseInt(val.weight);
		this.user.country = val.country;
		this.user.avatar = val.avatar;
		this.user.status = val.status;
		this.user.funFact = val.funFact;
		this.user.covidVaccine = val.covidVaccine;
		this.user.smoker = val.smoker;
		this.user.drinker = val.drinker;
		this.user.optOutOfPublicStories = val.optOut;

		this.profileService.createProfile(this.user).subscribe((res) => {
			console.log(res);
			this.profileService.setProfile(res);
		});
	}
}
