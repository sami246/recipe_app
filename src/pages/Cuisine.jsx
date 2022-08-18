import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Cuisine() {

    let params = useParams();

    // useEffect only runs once on mount so add params.type to array passed to allow for it to identify changing page
    useEffect(() => {
        // Pass through the params.type which is taken from the URL
        getCuisine(params.type);
    }, [params.type]);
  

    const [cuisine, setCuisine] = useState([]);

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=${name}`);
        console.log(data)
        const recipes = await data.json();
        console.log(recipes)
        setCuisine(recipes.results);
    }

  return (
    <Grid>
        {cuisine.map((item) => {
            return(
                <Card key={item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                </Card>
            )
        })}
    </Grid>
  )

}


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }

    `;
