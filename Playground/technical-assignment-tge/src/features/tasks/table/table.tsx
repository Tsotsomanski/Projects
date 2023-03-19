import styled from "styled-components";

import Pagination from "../table/pagination";
import IToDo from "../../shared/interfaces/IToDo";
import Filter from "../../shared/components/filter";
import { useAppDispatch } from "../../../app/hooks";
import ToggleButton from "../../shared/components/toggleButton";
import { updatePageNumber, updateToDoState } from "../tasksSlice";

interface ITableProps {
  filters: Array<string>;
  data: Array<IToDo>;
  pagesCount: number;
  filtersConfig: any;
  page: number;
}

interface IHeadingItem {
  title: string;
  hasFilter: boolean;
}

const Table = ({data, page, pagesCount, filters, filtersConfig}: ITableProps) => {
  const dispatch = useAppDispatch();

  const tableHeadings: Array<IHeadingItem> = Object.keys(data[0]).map((item: string) => {
    return {
      title: item,
      hasFilter: filters.includes(item)
    }
  });

  const updateToDoStatus = (isCompleted: boolean, taskId: number ) => {
    dispatch(updateToDoState({isCompleted, taskId}));
  }

  return (
    <TableWrap>
        <table>
          <thead>
            <tr>
              <th colSpan={4}><h2>List of tasks</h2></th>
            </tr>
            <tr>
              {tableHeadings.map((heading: IHeadingItem) => {
                const currentDropdown = filtersConfig[heading.title];

                return <th key={heading.title}>
                  <div className="heading-wrap">
                    {heading.hasFilter && currentDropdown?.options.length &&
                      <Filter
                        name={heading.title}
                        options={currentDropdown.options}
                        defaultValue={currentDropdown.default}
                      />
                    }
                    
                    <h4>{heading.title}</h4>
                  </div>
                </th>
              })}
            </tr>
          </thead>

          <tbody>
            {data.map((rowData: IToDo, todoIndex: number) => {
              return (
                <tr key={rowData.id}>
                  {Object.values(rowData).map((field: any, index) => {
                    return <th key={`${index}${rowData.id}`}>{ typeof field === "boolean" ? 
                      <ToggleButton
                        handleChange={updateToDoStatus}
                        taskId={rowData.id}
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
  padding-bottom: 50px;

  table, td, th {
    border: 1px solid;
    padding-top: 3px;
    padding-bottom: 3px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {

      h2, h4 {
        margin: 5px;
      }

      h4 {
        text-transform: capitalize;
      }
    }

    th {
      text-align: center;
      height: 30px;

      .heading-wrap {
        display: flex;
        align-items: baseline;

        img {
          height: 10px;
        }
      }

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
