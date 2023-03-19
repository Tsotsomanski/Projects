import styled from "styled-components";

interface IPaginationProps {
  pagesCount: number;
  currentPage: number;
  handleChangePage: any;
}

const Pagination = ({pagesCount, currentPage, handleChangePage}: IPaginationProps) => {
  const pagesNumbers = Array.from(Array(pagesCount)).map((el, index) => index + 1);

  return (
    <Container>
      {pagesNumbers.map(page => (
        <PageNumberBox
          key={page}
          onClick={() => handleChangePage(page)}
          className={currentPage === page ? "active": ""}
        >
          {page}
        </PageNumberBox>
      ))}
    </Container>)
}

export default Pagination;

const Container = styled.div`
display: flex;
  width: max-content;
  height: 30px;
  border: 1px solid black;
`;

const PageNumberBox = styled.span`
  width: 30px;
  height: 30px;
  border-right: 1px solid black;
  text-align: center;
  line-height: 28px;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: #46c8f0;
    cursor: pointer;
  }

  &.active {
    background-color: #46c8f0;
  }
`;
