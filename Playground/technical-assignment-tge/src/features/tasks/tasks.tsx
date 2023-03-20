import Table from "./table/table";
import { tasks } from "./tasksSlice";
import useTableData from "./useTableData";
import Loader from "../shared/components/loader";
import { useAppSelector } from "../../app/hooks";

const Tasks = () => {
  const {currentPageData, pagesCount, page} = useTableData();
  const allTasks = useAppSelector(tasks);
  const filters: Array<string> = ["userId", "title", "completed"];

  const userIds = Array.from(new Set(allTasks.map(item => item.userId)));

  const tableFiltersConfig: any = {
    userId: {
      options: [...userIds, "all"],
      default: "all"
    },
    title: {
      options: ["accending", "deccending"],
      default: ""
    },
    completed: {
      options: ["completed", "not completed", "all"],
      default: "all"
    }
  }

  return(<>
      {currentPageData?.length > 0 ?
        <Table
          filtersConfig={tableFiltersConfig}
          pagesCount={pagesCount}
          data={currentPageData}
          filters={filters}
          page={page}
        /> :
         <Loader />
      }
  </>)
}

export default Tasks;
