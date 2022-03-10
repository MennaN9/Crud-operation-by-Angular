import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    // hobbies: new FormArray([
    //   new FormControl('')
    // ]),
    address: new FormGroup({
      street: new FormControl('',Validators.required),
      building: new FormControl('',Validators.required)
    }),
    // gender: new FormControl('male')
    phone:new FormControl('',Validators.required)
  });

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // getHobbiesControls(){
  //   return (this.registerForm.get('hobbies') as FormArray)?.controls;
  // }

  // addHobby(){
  //   (this.registerForm.get('hobbies') as FormArray).push(new FormControl(''))
  // }

  register(){
    console.log(this.registerForm);
     this.router.navigate(['/users'])
  }

}
