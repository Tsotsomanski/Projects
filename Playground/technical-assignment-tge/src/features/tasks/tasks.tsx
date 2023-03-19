import Table from "./table/table";
import useTableData from "./useTableData";
import Loader from "../shared/components/loader";

const Tasks = () => {
  const {currentPageData, pagesCount, page} = useTableData();

  return(<div>
      {currentPageData?.length > 0 ?
        <Table
            data={currentPageData}
            pagesCount={pagesCount}
            page={page}
          /> :
         <Loader />
      }
  </div>)
}

export default Tasks;
