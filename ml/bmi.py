

activites=['Little/no exercise', 'Light exercise', 'Moderate exercise (3-5 days/wk)', 'Very active (6-7 days/wk)', 'Extra active (very active & physical job)']

def weight_loss_plans(plan):
    plans=["Maintain weight","Mild weight loss","Weight loss","Extreme weight loss"]
    weights=[1,0.9,0.8,0.6]
    losses=['-0 kg/week','-0.25 kg/week','-0.5 kg/week','-1 kg/week']
    return weights[plans.index(plan)]

def meals_percentage(number_of_meals):
    if number_of_meals==3:
        meals_calories_perc={'breakfast':0.35,'lunch':0.40,'dinner':0.25}
    elif number_of_meals==4:
        meals_calories_perc={'breakfast':0.30,'morning snack':0.05,'lunch':0.40,'dinner':0.25}
    else:
        meals_calories_perc={'breakfast':0.30,'morning snack':0.05,'lunch':0.40,'afternoon snack':0.05,'dinner':0.20}
    
    return meals_calories_perc

from Generate_Recommendations import Generator 
from ImageFinder.ImageFinder import get_images_links as find_image
from random import uniform as rnd
class Person:

    def __init__(self,age,height,weight,gender,activity,meals_calories_perc,weight_loss):
        self.plans = ["Maintain weight","Mild weight loss","Weight loss","Extreme weight loss"]
        self.weights=[1,0.9,0.8,0.6]
        self.losses=['-0 kg/week','-0.25 kg/week','-0.5 kg/week','-1 kg/week']
        self.age=age
        self.height=height
        self.weight=weight
        self.gender=gender
        self.activity=activity
        self.meals_calories_perc=meals_calories_perc
        self.weight_loss=weight_loss
    def calculate_bmi(self,):
        bmi=round(self.weight/((self.height/100)**2),2)
        return bmi
    
    def display_calories(self):
        calories = []
        maintain_calories=self.calories_calculator()
     
        for plan,weight,loss in zip(self.plans,self.weights,self.losses):
            calories.append({
                'calories':round(weight*maintain_calories,2),
                'plan':plan,
                'weight_loss':loss
            })
        return calories

    def display_result(self,):
        bmi=self.calculate_bmi()
        if bmi<18.5:
            category='Underweight'
            color='Red'
        elif 18.5<=bmi<25:
            category='Normal'
            color='Green'
        elif 25<=bmi<30:
            category='Overweight'
            color='Yellow'
        else:
            category='Obesity'    
            color='Red'
        calories  = self.display_calories()
        d = {
            "bmi": bmi, 
            "category": category,
            "color": color,
            "calories": calories
        }
        return d

    def calculate_bmr(self):
        if self.gender=='Male':
            bmr=10*self.weight+6.25*self.height-5*self.age+5
        else:
            bmr=10*self.weight+6.25*self.height-5*self.age-161
        return bmr

    def calories_calculator(self):
        activites=['Little/no exercise', 'Light exercise', 'Moderate exercise (3-5 days/wk)', 'Very active (6-7 days/wk)', 'Extra active (very active & physical job)']
        weights=[1.2,1.375,1.55,1.725,1.9]
        weight = weights[activites.index(self.activity)]
        maintain_calories = self.calculate_bmr()*weight
        return maintain_calories

    def generate_recommendations(self, recommender):
        total_calories=self.weight_loss*self.calories_calculator()
        recommendations=[]
        for meal in self.meals_calories_perc:
            meal_calories=self.meals_calories_perc[meal]*total_calories
            if meal=='breakfast':        
                recommended_nutrition = [meal_calories,rnd(10,30),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,10),rnd(0,10),rnd(30,100)]
            elif meal=='launch':
                recommended_nutrition = [meal_calories,rnd(20,40),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,20),rnd(0,10),rnd(50,175)]
            elif meal=='dinner':
                recommended_nutrition = [meal_calories,rnd(20,40),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,20),rnd(0,10),rnd(50,175)] 
            else:
                recommended_nutrition = [meal_calories,rnd(10,30),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,10),rnd(0,10),rnd(30,100)]
            recommended_recipes=recommender(recommended_nutrition)
            recommendations.append(recommended_recipes)
        for recommendation in recommendations:
            for recipe in recommendation:
                recipe['image_link']=find_image(recipe['Name']) 
        return recommendations
    

