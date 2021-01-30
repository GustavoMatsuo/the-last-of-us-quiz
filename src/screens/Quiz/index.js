/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Lottie } from '@crello/react-lottie'
import Widget from '../../components/Widget'
import QuizLogo from '../../components/QuizLogo'
import QuizBackground from '../../components/QuizBackground'
import QuizContainer from '../../components/QuizContainer'
import QuestionAnswer from '../../components/QuestionAnswer'
import AlternativesForm from '../../components/AlternativesForm'
import Button from '../../components/Button'
import BackLinkArrow from '../../components/BackLinkArrow'
import loadingAnimation from './animations/loading.json'
import Link from '../../components/Link';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          <h3>
            Tela de Resultado:
          </h3>
        </div>
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
              <img 
                src={result === true? "https://i.imgur.com/UoU8DPe.png":"https://i.imgur.com/PkkpjbB.png"}
                style={{borderRadius: '90px', marginRight: '10px'}}
                alt="result" 
                width="24" 
                height="24"
              />
              Pergunta
              {' '}
              {index + 1}
              {result === true
                ? ': Acertou'
                : ': Errou'}
            </li>
          ))}
        </ul>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '15px'}}>
          <h3>
            Obrigado por jogar o quiz ♡
          </h3>
        </div>
        <Link href="/">
          <Button>
            Voltar
          </Button>
        </Link>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          <h3>
            Carregando...
          </h3>
        </div>
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="250px"
          height="250px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <BackLinkArrow href="/" />
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
          <div style={{width: '24px'}}/>
        </div>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >

          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}__${questionIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={`${questionId}__${questionIndex}`}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && 
            <QuestionAnswer isCorrect={isCorrect}/>
          }
          {isQuestionSubmited && !isCorrect && 
            <QuestionAnswer isCorrect={isCorrect}/>
          }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
