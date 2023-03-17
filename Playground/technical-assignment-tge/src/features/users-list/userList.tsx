import { useEffect } from "react";
import styled from "styled-components";

import ExpandableRow from "./expandableRow";
import Error from "../shared/components/error";
import Loading from "../shared/components/loading";

import IUserData from "../shared/interfaces/IUserData";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listOfUsers, loadUserList, status } from "../shared/usersSlice";

const UserList = () => {
  const dispatch = useAppDispatch();
  const userListData: Array<IUserData> = useAppSelector(listOfUsers);
  const userDataStatus: string = useAppSelector(status);

  useEffect(() => {
    dispatch(loadUserList())
  }, []);

  return(
    <Wrap>
      <Title>Users:</Title>

      { userDataStatus === "loading" && <Loading /> }

      { userDataStatus === "failed" && <Error /> }

      {userListData && Object.keys(userListData).length > 0 && userListData.map((userData: IUserData) => (
        <div key={userData.id}>
           <ExpandableRow userInfo={userData} />
         </div>)
       )}
    </Wrap>
  )
}

export default UserList;

const Wrap = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
`