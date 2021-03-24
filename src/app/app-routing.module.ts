import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { EditFriendComponent } from './edit-friend/edit-friend.component';
import { FriendComponent } from './friend/friend.component';

const routes: Routes = [
  {path:'addFriend', component:AddFriendComponent},
  {path:'editFriend/:id', component:EditFriendComponent},
  {path:'friends', component:FriendComponent},
  {path:'', component:FriendComponent, pathMatch:"full"},
  {path:'**', redirectTo:'friends'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
