import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listOfUsers, loadUserList } from "./userListSlice";
import ExpandableRow from "./expandableRow";
import styled from "styled-components";

const UserList = () => {
  const dispatch = useAppDispatch();
  const userListData = useAppSelector(listOfUsers);

  useEffect(() => {
    dispatch(loadUserList())
  }, []);

  return(
    <Wrap>
      {userListData.length && userListData.map(userData => (
        <div key={userData.id}>
           <ExpandableRow userInfo={userData} />
         </div>)
       )}
    </Wrap>
  )
}

export default UserList;

const Wrap = styled.div`
`;
