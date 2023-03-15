import axios from "axios";

import { UserListData } from "./interfaces.ts/common";

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

export function getUsersList(): Promise<Array<UserListData>> {
  return axios.get("https://jsonplaceholder.typicode.com/users").then((payload) => payload.data)
}

export function getUser(userId: number): Promise<Array<UserListData>> {
  return axios.get("https://jsonplaceholder.typicode.com/users:" + userId)
}
