import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/models/user';
import { ApiService } from 'src/app/users/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userToEdit: User | null = null;
  loading = false;
  addOrEditForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormGroup({
      zipcode: new FormControl('',Validators.required),
      street: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required)
    }),
    phone: new FormControl('', [Validators.required])
  });

  constructor(
    private apiService: ApiService,
    private ngxSmartModalService: NgxSmartModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.ngxSmartModalService.getModal('userModal').open();
  }

  openEditModal(event: any, user: User) {
    event.stopPropagation();
    this.userToEdit = user;
    this.addOrEditForm.patchValue({
       name: user.name,
       email: user.email,
      address:{zipcode:user.address.zipcode,
      street:user.address.street,
      city:user.address.city}
      ,phone:user.phone});
    this.ngxSmartModalService.getModal('userModal').open();
  }

  addOrEditUser() {
    const { value, valid, dirty } = this.addOrEditForm;

    if (!valid || !dirty) return;

    if (!this.userToEdit) {
      //add
      this.loading  = true;
      this.apiService
        .addUser({
          name: value.name,
          email: value.email,
          username: 'ahmed ahmed',
          address: {
            street: value.address.street,
            suite: 'Apt. 556',
            city: value.address.city,
            zipcode: value.address.zipcode,
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: value.phone,
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        })
        .subscribe({
          next: (user) => {
            this.users.push(user);
            this.addOrEditForm.reset();
            this.ngxSmartModalService.getModal('userModal').close();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.loading = false;
          }
        });
    } else {
      //edit
      this.apiService
        .editUser(this.userToEdit.id, {
          ...this.userToEdit,
          name: value.name,
          email: value.email,
          address:value.address,
          phone:value.phone,
        })
        .subscribe({
          next: (user) => {
            const indexToEdit = this.users.findIndex((u) => u.id === user.id);
            this.users.splice(indexToEdit, 1, user);
            this.userToEdit = null;
            this.addOrEditForm.reset();
            this.ngxSmartModalService.getModal('userModal').close();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  cancel() {
    this.addOrEditForm.reset();
    this.ngxSmartModalService.getModal('userModal').close();
  }
  deleteUser(event: any, id: number) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this user?!')) {
      this.apiService.deleteUserById(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
