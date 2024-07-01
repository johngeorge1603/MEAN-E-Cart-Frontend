import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username:['',[Validators.required, Validators.pattern(`[a-zA-Z]*`)]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.pattern(`[a-zA-Z,0-9]*`)]]
  })

  constructor(private fb: FormBuilder, private api:ApiService, private router:Router){}

  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password

      const user = {username, email, password}
      this.api.registerAPI(user).subscribe({
        next:(res:any)=>{
          alert(`${res.username} has successfully registered`)
          this.registerForm.reset()
          // navigate to login
          this.router.navigateByUrl("/login")
        },
        error:(reason: any) => {
          alert(reason.error)
        }
      })
    } else {
      alert('Invalid Credentials')
    }
  }
}
