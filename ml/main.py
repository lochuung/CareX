from fastapi import FastAPI
from pydantic import BaseModel,conlist
from typing import List,Optional
import pandas as pd
from model import recommend,output_recommended_recipes
from bmi import Person, meals_percentage, weight_loss_plans
from fastapi.middleware.cors import CORSMiddleware

dataset=pd.read_csv('./Data/dataset.csv',compression='gzip')

app = FastAPI()
# Allow all
# CORS(app)


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://carex.huuloc.id.vn"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class params(BaseModel):
    n_neighbors:int=5
    return_distance:bool=False

class PredictionIn(BaseModel):
    nutrition_input:conlist(float, min_items=9, max_items=9)
    ingredients:list[str]=[]
    params:Optional[params]


class Recipe(BaseModel):
    Name:str
    CookTime:str
    PrepTime:str
    TotalTime:str
    RecipeIngredientParts:list[str]
    Calories:float
    FatContent:float
    SaturatedFatContent:float
    CholesterolContent:float
    SodiumContent:float
    CarbohydrateContent:float
    FiberContent:float
    SugarContent:float
    ProteinContent:float
    RecipeInstructions:list[str]

class PredictionOut(BaseModel):
    output: Optional[List[Recipe]] = None


class PersonIn(BaseModel):
    weight:float
    height:float
    age:int
    gender: str
    activity:str
    meals_calories_perc:int
    weight_loss:str

class BMIOut(BaseModel):
    bmi:float
    category:str
    color:str
    calories:Optional[List[dict]] = None

@app.get("/")
def home():
    return {"health_check": "OK"}



@app.post("/predict/",response_model=PredictionOut)
def update_item(prediction_input:PredictionIn):
    recommendation_dataframe=recommend(dataset,prediction_input.nutrition_input,prediction_input.ingredients,prediction_input.params.dict())
    output=output_recommended_recipes(recommendation_dataframe)
    if output is None:
        return {"output":None}
    else:
        return {"output":output}
    
    
@app.post('/bmi/calories', response_model=BMIOut)
def calculate_calories(person:PersonIn):
    person = Person(person.age, person.height, person.weight, person.gender,  person.activity, meals_percentage(person.meals_calories_perc), weight_loss_plans(person.weight_loss))
    
    
    res = person.display_result()
    return res


@app.post('/bmi/recommend', response_model=dict)
def calculate_calories(person:PersonIn):
    person = Person(person.age, person.height, person.weight, person.gender,  person.activity, meals_percentage(person.meals_calories_perc), weight_loss_plans(person.weight_loss))
    
    def recommender (recommended_nutrition):
        recommendation_dataframe=recommend(dataset,recommended_nutrition,[],params={'n_neighbors':5,'return_distance':False})
        output=output_recommended_recipes(recommendation_dataframe)
        return output

    recommendations = person.generate_recommendations(recommender)
    return {"output":recommendations}
    
