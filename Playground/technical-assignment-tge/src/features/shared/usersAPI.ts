import axios from "axios";

import IUserData from "./interfaces/IUserData";

interface AddressGeo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: AddressGeo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export function getUsersList(): Promise<Array<IUserData>> {
  return axios.get("https://jsonplaceholder.typicode.com/users").then((payload) => payload.data);
}

export function getUser(userId: number): Promise<IUserData> {
  return axios.get("https://jsonplaceholder.typicode.com/users/" + userId).then((payload) => payload.data);
}

export function getUserPosts(userId: number): Promise<Array<any>> {
  return axios.get("https://jsonplaceholder.typicode.com/posts?userId=" + userId).then((payload) => payload.data);
}
