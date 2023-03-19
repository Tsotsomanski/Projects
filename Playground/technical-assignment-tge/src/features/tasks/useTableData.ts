import { useEffect, useState } from "react";

import IToDo from "../shared/interfaces/IToDo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filteredTasks, loadTasks, page } from "./tasksSlice";

const NUMBER_OF_PAGES = 10;

const useTableData = () => {
  const dispatch = useAppDispatch();
  const tasksData: Array<IToDo> = useAppSelector(filteredTasks);
  const currentPage: number = useAppSelector(page);
  const [currentPageData, setCurrentPageData]: any = useState();

  useEffect(() => {
    if (tasksData?.length) {
      const itemsPerPage: number = tasksData.length / NUMBER_OF_PAGES;
      const startIndex: number = (currentPage * itemsPerPage) - itemsPerPage; 
      const endIndex: number = startIndex + itemsPerPage; 
      const currentPageData: Array<IToDo> = tasksData.slice(startIndex, endIndex);
  
      setCurrentPageData(currentPageData);
    }
  }, [currentPage, tasksData]);
  
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return {
    currentPageData,
    page: currentPage,
    pagesCount: NUMBER_OF_PAGES
  }
}

export default useTableData;