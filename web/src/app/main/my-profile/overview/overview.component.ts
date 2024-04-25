// ==========================================================>> Core Library
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ==========================================================>> Custom Library
import { Animations } from 'helpers/animations';
import { environment as env } from 'environments/environment';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { MyProfileService } from '../my-profile.service';
import { LoadingService } from 'helpers/services/loading';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: Animations
})

export class OverviewComponent implements OnInit {

  @ViewChild('myProfileNgForm') myProfileNgForm: NgForm;

  public form: UntypedFormGroup;

  public url = env.API_BASE_URL;
  public FILE_PUBLIC_BASE_URL: string = env.FILE_PUBLIC_BASE_URL;
  public mode: any;
  public contact: any = [];
  public saving: boolean = false;
  public src: string = 'assets/images/avatars/profile.jpg';
  public data: any;
  public phone: any;
  public title: string = 'Pick your profile picture'
  user: any = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    phone: null,
  };

  constructor(
    private _serviceMyProfile: MyProfileService,
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: SnackbarService,
    private _router: Router,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.data = localStorage.getItem('user');
    if (this.data) {
      this.data = JSON.parse(this.data);
      if (!this.data) {
        localStorage.clear();
        this._router.navigateByUrl('/auth/login');
      }
    }
    if (this.data) {
      //this.src = this.url + this.data.avatar; //if this image is public from api
      this.src = this.FILE_PUBLIC_BASE_URL + this.data.avatar;
    }
    this._buildForm();
  }

  submit(): void {
    // Do nothing if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Disable the form
    this.form.disable();

    this.saving = true;

    // Update
    this._serviceMyProfile.updateProfile(this.form.value).subscribe((res: any) => {
      // Navigate to the confirmation required page
      this.saving = false;
      console.log(res.data);
      this.form.enable();
      if (res.data) {
        console.log(res.data);
        this.user.id = res.data.id;
        this.user.email = res.data.email;
        this.user.name = res.data.name;
        this.user.avatar = res.data.avatar;
        if (res.data.avatar == '') {
          this.user.avatar = 'assets/images/avatars/default.jpg';
        } else {
          this.data.avatar = this.FILE_PUBLIC_BASE_URL + res.data.avatar;
        }
        this.user.phone = res.data.phone;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      this._snackBar.openSnackBar(res.message, '');
    }, () => {
      // Re-enable the form
      this.form.enable();

      // Reset the form
      this.myProfileNgForm.resetForm();

      this.saving = false;
    }
    );
  }

  srcChange(src: any): any {
    this.form.get('avatar').setValue(src);
  }

  private _buildForm(): any {
    this.form = this._formBuilder.group({
      name: [this.data.name, [Validators.required]],
      phone: [this.data.phone, [Validators.required, Validators.pattern('(^[0][0-9].{7}$)|(^[0][0-9].{8}$)|(^[855][0-9].{9}$)|(^[855][0-9].{10}$)|(.+@.+..+)')]],
      email: [this.data.email, [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      avatar: [this.data.avatar],
    });
  }
}
