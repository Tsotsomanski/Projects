import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import IPost from "../shared/interfaces/IPosts";
import ExpandableRow from "../users-list/expandableRow";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
  loadUserPosts,
  chosenUserId,
  chosenUser,
  usersPosts,
  loadUser
   } from "../shared/usersSlice";
import Post from "./post";

const Posts = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(chosenUserId);
  const userData = useAppSelector(chosenUser);
  const postsData = useAppSelector(usersPosts);
  console.log('postsData: ', postsData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    dispatch(loadUser(userId));
    dispatch(loadUserPosts(userId));
  }, []);

  return(<div>
    {userData && Object.keys(userData).length ? <ExpandableRow userInfo={userData} defaultExpanded={true} disableCollapse/> : null}

    {userId && postsData?.length && (
      <>
        <PostsSection>
          <h2>{userData?.name} posts</h2>
      
          <div>
          {!postsData?.length && <div className="dot-stretching"></div>}
            {/* {!postsData?.length && <p>No posts available...</p>} */}

            {postsData?.length > 0 &&
              postsData.map((post: IPost, index: number) => (
                <Post data={post} userId={userId} index={index} postsData={postsData}/>
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

  @keyframes dot-stretching {
    0% {
      transform: scale(1.25, 1.25);
    }
    50%, 60% {
      transform: scale(0.8, 0.8);
    }
    100% {
      transform: scale(1.25, 1.25);
    }
  }

  @keyframes dot-stretching-before {
    0% {
      transform: translate(0) scale(0.7, 0.7);
    }
    50%, 60% {
      transform: translate(-20px) scale(1, 1);
    }
    100% {
      transform: translate(0) scale(0.7, 0.7);
    }
  }

  @keyframes dot-stretching-after {
    0% {
      transform: translate(0) scale(0.7, 0.7);
    }
    50%, 60% {
      transform: translate(20px) scale(1, 1);
    }
    100% {
      transform: translate(0) scale(0.7, 0.7);
    }
  }

  .dot-stretching {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    transform: scale(1.25, 1.25);
    animation: dot-stretching 2s infinite ease-in;

    &:before, :after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
    }

    &:before {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      animation: dot-stretching-before 2s infinite ease-in;
    }

    &:after {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      animation: dot-stretching-after 2s infinite ease-in;
    }
  }
`