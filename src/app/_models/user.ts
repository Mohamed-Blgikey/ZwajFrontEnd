import { Photo } from "./photo";

export interface User {
  id:string;
  name:string;
  email:string;
  dateOfBirth:Date;
  gender:string;
  created:Date;
  lastActive:Date;
  photoUrl:string;
  city:string;
  country:string;
  interests?:string;
  introduction?:string;
  lookingFor?:string;
  photos?:Photo[];
}
