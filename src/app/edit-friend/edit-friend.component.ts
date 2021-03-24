import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from '../friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-edit-friend',
  templateUrl: './edit-friend.component.html',
  styleUrls: ['./edit-friend.component.css']
})
export class EditFriendComponent implements OnInit {
  friends:Friend[];
  // friendEditForm:FormGroup;
  errorMessage="";
  successMessage="";

  friendEditForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*$")]),
    email: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),      
    birthday: new FormControl('', Validators.required),
    imageURL: new FormControl('')
  }); 

  constructor(private friendService:FriendService, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute) { }

  updateFriend(){
    this.friendService.updateFriend(this.friendEditForm.value).subscribe(
      updatedFriend => {
        this.errorMessage = "";
        this.friends.map(friend=> friend.id == updatedFriend.id ? friend=updatedFriend : friend=friend);
        this.successMessage = "Successfully Updated Friend: " + updatedFriend.name;
        this.router.navigate(['friends']);
      },
      err => {
        this.successMessage = "";
        this.errorMessage = "Could not update friend. " + err.error.errorMessage; 
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

    // this.friendEditForm = this.formBuilder.group({
    //   'name': ['', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*$")]],
    //   'email': ['', [Validators.pattern("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$")]],
    //   'phone': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    //   'birthday': ['', [Validators.required]],
    //   'imageURL': ['https://img.icons8.com/pastel-glyph/2x/person-male.png']
    // })
  }
}
