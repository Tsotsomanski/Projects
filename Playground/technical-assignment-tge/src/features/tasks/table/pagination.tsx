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
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 30px;
`;

const PageNumberBox = styled.span`
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 28px;
  border-radius: 50%;
  margin-right: 5px;

  &:last-child {
    border-right: none;
    margin-right: 0;
  }

  &:hover {
    background-color: #46c8f0;
    cursor: pointer;
  }

  &.active {
    background-color: #46c8f0;
  }
`;
