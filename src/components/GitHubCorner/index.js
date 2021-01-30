import React from 'react'
import styled from 'styled-components'
//import { Lottie } from '@crello/react-lottie'
//import gitHubIcon from  './animations/Octocat.png'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
  z-index: 20;
  &:hover .github-letter{
    font-size: 16px;
    font-weight: bolder;
    margin-left: 5px;
    animation: fadein 2s;
    opacity: 1;
  }
  &:hover .octocat{
    width: 115px;
    transition-duration: 450ms;
  }
  @keyframes fadein {
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
`;

const Octocat = styled.div`
  width: 55px;
  height: 55px;
  margin: 20px 20px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: rgb(36 41 46);
  transition-duration: 450ms;
`

const Letter = styled.p`
  color: #fff;
  opacity: 0;
  font-size: 0px;
`

// eslint-disable-next-line react/prop-types
export default function GitHubCorner({ projectUrl }) {
  return (
    <Wrapper>
      <a href={projectUrl} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
        <Octocat className="octocat">
          <img src='https://i.imgur.com/UqKK5iz.png' style={{width:"35px", height:"35px"}}></img>
          {/*<Lottie config={{animationData: gitHubIcon, loop: true, autoplay: true}} width="35px" height="35px"/>*/}
          <Letter className="github-letter">GitHub</Letter>
        </Octocat>
      </a>
    </Wrapper>
  );
}
