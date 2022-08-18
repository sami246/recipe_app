import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css'


function Popular() {

    const [popular, setPopular] = useState([]);


    // Makes it so getPopular is run as soon as page is loaded
    // Empty array is to be able to pass in a value
    useEffect(() => {
        getPopular();
    }, []);
  
    const getPopular = async () => {
        //Check if something is in local storage for cache purposes
        const check = localStorage.getItem('popular');


        // Use cache first if stored in local memory otherwise call API
        if(check){
            setPopular(JSON.parse(check));
        }
        else{
            // Use back ticks to use expressions
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes)
        }
    };


  return (
    <div>
        <Wrapper>
            <h3>Popular Picks</h3>
            <Splide options={{
                perPage: 4.5,
                arrows: false,
                pagination: false,
                drage: 'free',
                gap: '5rem'
            }}>

                {popular.map((recipe) => {
                    return(
                        <SplideSlide key = {recipe.id}>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Card>
                        </SplideSlide>
                    );
                })}

            </Splide>
        </Wrapper>
    </div>
  )
}


// I Don't endorse this type of CSS, better to just use seperate CSS File
const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position:absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 2px 2px #000000;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular