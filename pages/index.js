import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          {db.title}
        </title>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%2300754b%22></rect><path fill=%22%23fff%22 d=%22M76.37 64.94L76.37 64.94Q80.51 67.73 82.31 68.99L82.31 68.99Q85.55 71.42 85.55 73.63Q85.55 75.83 82.85 79.79Q80.15 83.75 77.36 83.75L77.36 83.75Q75.65 83.75 72.14 81.32L72.14 81.32Q71.69 81.05 69.62 79.61Q67.55 78.17 66.38 77.45L66.38 77.45Q58.01 83.93 47.57 83.93L47.57 83.93Q33.62 83.93 24.04 74.03Q14.45 64.13 14.45 50.45L14.45 50.45Q14.45 42.98 17.15 36.46Q19.85 29.93 24.35 25.52Q28.85 21.11 34.70 18.59Q40.55 16.07 46.76 16.07L46.76 16.07Q60.08 16.07 69.89 25.70Q79.70 35.33 79.70 50.09L79.70 50.09Q79.70 57.56 76.37 64.94ZM30.38 50.00Q30.38 58.01 35.56 63.01Q40.73 68.00 47.12 68.00Q53.51 68.00 58.64 63.14Q63.77 58.28 63.77 50.09Q63.77 41.90 58.59 36.95Q53.42 32.00 47.03 32.00Q40.64 32.00 35.51 37.00Q30.38 41.99 30.38 50.00Z%22></path></svg>" />
        </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);

            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Bora jogar ${name}`}
              </Button>
             
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/GustavoMatsuo" />
    </QuizBackground>
  );
}
