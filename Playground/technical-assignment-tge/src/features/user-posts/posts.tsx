import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import IPost from "../shared/interfaces/IPosts";
import Loader from "../shared/components/loader";
import ExpandableRow from "../users-list/expandableRow";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
  loadUserPosts,
  chosenUserId,
  chosenUser,
  usersPosts,
  // loadUser
   } from "../shared/usersSlice";
import Post from "./post";

const Posts = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(chosenUserId);
  const userData = useAppSelector(chosenUser);
  console.log('userData: ', userData);
  const postsData = useAppSelector(usersPosts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    // dispatch(loadUser(userId));
    dispatch(loadUserPosts(userId));
  }, [dispatch, navigate]);

  return(<div>
    {!userData && !postsData && <Loader />}

    {userData && Object.keys(userData).length ? <ExpandableRow userInfo={userData} defaultExpanded={true} disableCollapse/> : null}

    {userId && postsData?.length && (
      <>
        <PostsSection>
          <h2>{userData?.name} posts</h2>
      
          <div>
            {!postsData?.length && <p>No posts available...</p>}

            {postsData?.length > 0 &&
              postsData.map((post: IPost, index: number) => (
                <Post key={`${userId}${index}`} data={post} userId={userId} index={index} postsData={postsData}/>
              ))}
          </div>
        </PostsSection>
      </>
    )}
  </div>)
}

export default Posts;

const PostsSection = styled.section`
  display: flex;
  flex-flow: column;
  
  h2 {
    text-align: center;
    font-family: sans-serif;
  }

  >div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
  }
`