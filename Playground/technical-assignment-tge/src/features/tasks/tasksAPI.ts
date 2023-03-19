import axios from "axios"

import IToDo from "../shared/interfaces/IToDo";

export const getTasks = async (): Promise<Array<IToDo>> => {
  return axios.get('https://jsonplaceholder.typicode.com/todos')
  .then(payload => payload.data);
}