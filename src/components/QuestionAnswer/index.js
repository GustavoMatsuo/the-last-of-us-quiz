import React from 'react'
import { Lottie } from '@crello/react-lottie'
import CorrectAnimation from './animations/correct-animation.json'
import WrongAnimation from './animations/wrong-animation.json' 
import styled from 'styled-components'
 
const Container = styled.div`
  display: flex; 
  align-items: center;
  padding-left: 40px;
`

const TextArea = styled.div`
  font-size: 22px;
  font-weight: bolder;
`

export default function QuestionAnswer({isCorrect}) {
  return(
    <Container>
      <Lottie
          style={{}}
          width="75px"
          height="75px"
          config={{ 
            animationData: isCorrect? CorrectAnimation:WrongAnimation, 
            loop: false, 
            autoplay: true 
          }}
        />
      <TextArea>{isCorrect? 'Acertou':'Errado'}</TextArea>
    </Container>
  )
}