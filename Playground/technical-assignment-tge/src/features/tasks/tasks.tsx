import Table from "./table/table";
import useTableData from "./useTableData";
import Loading from "../shared/components/loading";
import UserMenu from "../shared/components/userMenu";

const Tasks = () => {
  const {currentPageData, pagesCount, page} = useTableData();

  return(<div>
      <UserMenu />
      {currentPageData?.length > 0 ?
        <Table
            data={currentPageData}
            pagesCount={pagesCount}
            page={page}
          /> :
         <Loading />
      }
  </div>)
}

export default Tasks;
