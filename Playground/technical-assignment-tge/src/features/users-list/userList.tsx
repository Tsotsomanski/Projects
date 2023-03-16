import { useEffect } from "react";

import ExpandableRow from "./expandableRow";
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
    <div>
      {userListData && Object.keys(userListData).length > 0 && userListData.map((userData: IUserData) => (
        <div key={userData.id}>
           <ExpandableRow userInfo={userData} />
         </div>)
       )}
    </div>
  )
}

export default UserList;