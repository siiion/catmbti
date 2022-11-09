import React from 'react';
import styled from 'styled-components';
import { ProgressBar, Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';

import { QuestionData } from '../assets/data/questiondata';

const Question = () => {
    const [questionNo, setQuestionNo] = React.useState(0);
    const [totalScore, setTotalScore] = React.useState([
        { id: "EI", score: 0},
        { id: "SN", score: 0},
        { id: "TF", score: 0},
        { id: "JP", score: 0},
    ])
    const navigate = useNavigate();

    console.log('totalScore', totalScore);

    const handleClickButton = (no, type) => {
        const newScore = totalScore.map((s) =>
        s.id === type ? { id: s.id, score: s.score + no } : s
        );

        setTotalScore(newScore);
        // 다음 문제로 문제 수 증가
        if (QuestionData.length !== questionNo + 1) {
            setQuestionNo(questionNo + 1);
        } else {
            // 결과 페이지 이동
            navigate("/result");
        }

    }

    return(
        <Wrapper>
            <ProgressBar striped variant="danger" now={(questionNo / QuestionData.length) * 100} style={{marginTop: '20px' }}/>
            <Title>{QuestionData[questionNo].title}</Title>
            <ButtonGroup>
            <Button onClick={()=>handleClickButton(1, QuestionData[questionNo].type)}style={{width:"40%", minHeight:"200px", fontSize: "15pt" }}>{QuestionData[questionNo].answera}</Button>
            <Button onClick={()=>handleClickButton(0, QuestionData[questionNo].type)}style={{width:"40%", minHeight:"200px", fontSize: "15pt", marginLeft: "20px" }}>{QuestionData[questionNo].answerb}</Button>
            </ButtonGroup>
        </Wrapper>
    )
}

export default Question;

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`

const Title = styled.div`
font-size: 30pt;
text-align: center;
font-family: "HSGooltokki";
`

const ButtonGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-family: "HSGooltokki";
`