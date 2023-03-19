import styled from "styled-components";

import Pagination from "../table/pagination";
import IToDo from "../../shared/interfaces/IToDo";
import { useAppDispatch } from "../../../app/hooks";
import ToggleButton from "../../shared/components/toggleButton";
import { updatePageNumber, updateToDoState } from "../tasksSlice";

interface ITableProps {
  data: Array<IToDo>;
  pagesCount: number;
  page: number;
}

const Table = ({data, page, pagesCount}: ITableProps) => {
  const dispatch = useAppDispatch();
  const tableHeadings = Object.keys(data[0]);

  const updateToDoStatus = (isCompleted: boolean, todoIndex: number ) => {
    dispatch(updateToDoState({todoIndex, isCompleted}));
  }

  return (
    <TableWrap>
        <table>
          <thead>
            <tr>
              <th colSpan={4}><h2>List of tasks</h2></th>
            </tr>
            <tr>
              {tableHeadings.map(heading => <th key={heading}><h4>{heading}</h4></th>)}
            </tr>
          </thead>

          <tbody>
            {data.map((rowData: IToDo, todoIndex: number) => {
              return (
                <tr key={rowData.id}>
                  {Object.values(rowData).map((field: any, index) => {
                    const currentTaskIndex = (page * data.length) - data.length +  todoIndex;

                    return <th key={`${index}${rowData.id}`}>{ typeof field === "boolean" ? 
                      <ToggleButton
                        handleChange={updateToDoStatus}
                        taskIndex={currentTaskIndex}
                        isChecked={field}
                      /> :
                      <span>{field}</span>
                    }</th>
                  })}
                </tr>
              )
            })}
          </tbody>

        </table>
        <Pagination
            handleChangePage={(selectedPage: number) => dispatch(updatePageNumber(selectedPage))}
            pagesCount={pagesCount}
            currentPage={page}
          />
      </TableWrap>
  )
}

export default Table;


const TableWrap = styled.div`
  height: 80vh;
  border: 1px solid black;

  table, td, th {
    border: 1px solid;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      h4 {
        text-transform: capitalize;
      }
    }

    th {
      text-align: center;

      div {
        display: flex;
        justify-content: center;
      }

      span.todo, span.completed {
        display: flex;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .todo {
        background-color: red;
      }

      .completed {
        background-color: green;
      }
    }
  }
`;