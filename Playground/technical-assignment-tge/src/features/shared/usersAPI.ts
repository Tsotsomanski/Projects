import axios from "axios";

import IPost from "./interfaces/IPosts";
import IUserData from "./interfaces/IUserData";

export function getUsersList(): Promise<Array<IUserData>> {
  return axios.get("https://jsonplaceholder.typicode.com/users").then((payload) => payload.data);
}

export function getUser(userId: number): Promise<IUserData> {
  return axios.get("https://jsonplaceholder.typicode.com/users/" + userId).then((payload) => payload.data);
}

export function getUserPosts(userId: number): Promise<Array<any>> {
  return axios.get("https://jsonplaceholder.typicode.com/posts?userId=" + userId).then((payload) => payload.data);
}

export function editUserPosts(userId: number, posts: Array<IPost>): Promise<Array<IPost>> {
  return axios.post("https://jsonplaceholder.typicode.com/posts?userId=" + userId).then((payload) => payload.data);
}

export function editPost(postId: number): Promise<Array<IPost>> {
  return axios.post("https://jsonplaceholder.typicode.com/posts/" + postId).then((payload) => payload.data);
}
