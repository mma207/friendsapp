import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friends:Friend[];
  errorMessage = ""; 
  successMessage = ""; 

  deleteFriend(friendId:number){
    this.friendService.deleteFriend(friendId).subscribe(
      deletedFriend => {
        this.errorMessage = ""; 
        this.successMessage = "Successfully Deleted Friend " + deletedFriend.name; 
        this.friends = this.friends.filter(friend => friend.id != deletedFriend.id)
      },
      err => {
        this.successMessage = "";
        this.errorMessage = "Could not delete friend. " + err.error.errorMessage; 
      }
    )
  }

  constructor(private friendService:FriendService) { }

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
  }
}
