import { useEffect } from "react";
import styled from "styled-components";

import ExpandableRow from "./expandableRow";
import Loading from "../shared/components/loading";
import IUserData from "../shared/interfaces/IUserData";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listOfUsers, loadUserList, chosenUserId } from "../shared/usersSlice";

const UserList = () => {
  const dispatch = useAppDispatch();
  const userListData: Array<IUserData> = useAppSelector(listOfUsers);
  
  useEffect(() => {
    dispatch(loadUserList())
  }, []);

  return(
    <Wrap>
      { !userListData && <Loading /> }

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