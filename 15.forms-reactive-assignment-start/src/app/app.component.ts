import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  forbidddenProjects = 'Test';

  ngOnInit(){
    this.form = new FormGroup({
      'project': new FormControl(null, [Validators.required, this.projectNameValidator.bind(this)], [this.asyncProjectNameValidator.bind(this)]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.form)
  }

  projectNameValidator(control: FormControl): {[k: string]: boolean} {
    if(this.forbidddenProjects.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null
  }
  asyncProjectNameValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.forbidddenProjects) {
          resolve({'nameIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 2500);
    })
    return promise;
  }
}

// prject name (not empty)
// mail (not empty + valid email)
// project status select (stable, crtiical, finished)
// submit btn
//own validator donesn't allow "test" as project name
// implement same validator as async
// print form to console