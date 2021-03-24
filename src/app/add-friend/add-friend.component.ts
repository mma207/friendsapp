import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Friend } from '../friend';
import {FriendService} from '../friend.service'

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  errorMessage = "";
  successMessage = ""; 
  friends:Friend[];

  friendAddForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*$")]),
    email: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(11)]),      
    birthday: new FormControl('', Validators.required),
    imageURL: new FormControl('')
  }); 
  
  constructor(private friendService:FriendService, private router:Router, private formBuilder:FormBuilder) { }
  
  addFriend(){
    this.friendService.addFriend(this.friendAddForm.value).subscribe(
      friendToAdd => {
        this.errorMessage = "";
        this.friends.push(friendToAdd); 
        this.successMessage = "Successfully Added Friend: " + friendToAdd.name;
        this.router.navigate(['friends']);
      },
      err => {
        this.successMessage = "";
        this.errorMessage = "Could not add friend. " + err.error.errorMessage; 
      }
    )
  }

  ngOnInit(): void {

    this.friendService.getAllFriends().subscribe(
      friendsArray => {
        this.friends = friendsArray; 
        this.errorMessage = "";
      },
      err => {
        this.successMessage = "";
        this.errorMessage = "Could not load friends. " + err.error.errorMessage;
      }
    )

    // this.friendAddForm = this.formBuilder.group({
    //   'name': ['', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*$")]],
    //   'email': ['', [Validators.pattern("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$")]],
    //   'phone': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    //   'birthday': ['', [Validators.required]],
    //   'imageURL': ['https://img.icons8.com/pastel-glyph/2x/person-male.png']
    // })
  }
}
