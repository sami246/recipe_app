import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import styled from 'styled-components';

function Recipe() {

    let params = useParams();

    useEffect(() => {
        getRecipe();
    }, [params.id]);
 

    const [details, setRecipe] = useState([]);
    // Set active tab to default be instructions
    const [activeTab, setActiveTab] = useState("instructions");

    const getRecipe = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);

        const detailData = await data.json();

        setRecipe(detailData);
    }

  return (
    <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} />
            </div>
            <Info >
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}> Instructions </Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}> Ingredients </Button>
                {activeTab === 'instructions' && (
                    <div>
                    <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
                    <br></br>
                    <h2>Instructions:</h2>
                    <br></br>
                    <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
                </div>
                )}
                {activeTab === 'ingredients' && (
                        <ul>
                            {details.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                )}

            </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top:10rem;
    margin-bottom:5rem;
    display:flex;
     .active{
        background:linear-gradient(35deg,#494949,#313131);
        color:white;
    }
    p{
        margin-top: 1rem;
        margin-bottom:2rem;
        line-height:1.4rem;
    }
    li{
        font-size:0.8rem;
        line-height:1.6rem;
    }
    ul {
        margin-top: 2rem;
    }
`
const Button=styled.button`
    padding:1rem 2rem;
    color:#313131;
    background:white;
    border:2px solid black;
    margin-right:2rem;
    font-weight:600;
`
const Info=styled.div`
    margin-left:3rem;

`


    



export default Recipe