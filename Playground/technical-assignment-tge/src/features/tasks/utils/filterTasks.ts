import IToDo from "../../shared/interfaces/IToDo";

export const filterTasks = (filterName: string, sortBy: string, data: Array<IToDo>): Array<IToDo> => {
  let filteredData: Array<IToDo> = [...data];

  switch(filterName) {
    case "completed": 
      filteredData = sortBy === "all" ?
        data :
        filteredData.filter(todo => (
          sortBy === "completed" ?
            todo.completed === true :
            todo.completed === false
        ));
    break;
    case "title":
      filteredData = filteredData.sort((a, b) => {
        if (a.title < b.title) {
          return sortBy === "accending" ? -1 : 1;
        }
        if (a.title > b.title) {
          return sortBy === "accending" ? 1 : -1;
        }
        return 0;
      })
    break;
    case "userId": 
        filteredData = sortBy === "all" ?
          data :
          filteredData.filter((todo: IToDo) => todo.userId === Number(sortBy));
    break;
    default:
      return data;
  }

  return filteredData;
}