import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import styled from 'styled-components';


function Searched() {

    let params = useParams();

    // useEffect only runs once on mount so add params.type to array passed to allow for it to identify changing page
    useEffect(() => {
        // Pass through the params.type which is taken from the URL
        getSearched(params.search);
    }, [params.search]);

    const [searched, setSearched] = useState([]);

    const getSearched = async (search) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${search}`);
        const recipes = await data.json();
        setSearched(recipes.results);
    }


  return (
    <Grid>
        {searched.map((item) => {
                return(
                    <Card key={item.id}>
                        <Link to= {"/recipe/" + item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
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

export default Searched