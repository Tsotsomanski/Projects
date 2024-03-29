import axios from "axios";

import IPost from "./interfaces/IPosts";
import IUserData from "./interfaces/IUserData";

const customConfig = {
  headers: {
  'Content-type': 'application/json; charset=UTF-8'
  }
};

export async function getUsersList(): Promise<Array<IUserData>> {
  return axios.get("https://jsonplaceholder.typicode.com/users").then((payload) => payload.data);
}

export async function getUser(userId: number): Promise<IUserData> {
  return axios.get("https://jsonplaceholder.typicode.com/users/" + userId).then((payload) => payload.data);
}

// PLEASE READ: 
// I commented that function because I couldn't find any information how I can update the user information and what kind of params shall I provide.

export async function updateUser(updatedFields: Array<string>, formData: Record<string, string | number>, currentUserData: IUserData): Promise<IUserData> {
  const updatedPropertiesObject: any = {};

  updatedFields.forEach((editedField: string) => {
    const [objProperty, fieldName]: any = editedField.split("-");
    const fieldValue = formData[editedField];

    updatedPropertiesObject[objProperty] = {
      ...updatedPropertiesObject[objProperty],
      [fieldName]: fieldValue
    }
  });

  const updatedUserInfo: IUserData = {
    ...currentUserData,
    ...updatedPropertiesObject.general,
    address: {
      ...currentUserData.address,
      ...updatedPropertiesObject.address,
      geo: {
        ...currentUserData.address.geo,
        ...updatedPropertiesObject.address.geo
      }
    },
    company: {
      ...currentUserData.company,
      ...updatedPropertiesObject.company
    }
  };

  return updatedUserInfo; 
}

  // PLEASE READ: 
// I commented that function below because I couldn't find any information how I can update the user information and instead of it I mocked the response in the abbove one.

// export async function updateUser(userId: number, updatedUserData: IUserData): Promise<IUserData> {
//   return axios
//     .post("https://jsonplaceholder.typicode.com/users?userId=" + userId, updatedUserData)
//     .then((payload) => payload.data);
// }

export async function getUserPosts(userId: number): Promise<Array<any>> {
  return axios.get("https://jsonplaceholder.typicode.com/posts?userId=" + userId).then((payload) => payload.data);
}

export async function editUserPosts(userId: number, posts: Array<IPost>): Promise<Array<IPost>> {
  return axios
    .post("https://jsonplaceholder.typicode.com/posts?userId=" + userId, posts, customConfig)
    .then((payload) => {
      const {id, ...posts} = payload.data;
      return Object.values(posts);
    });
}

export async function editPost(postId: number): Promise<Array<IPost>> {
  return axios.post("https://jsonplaceholder.typicode.com/posts/" + postId).then((payload) => payload.data);
}
