import requests
from bs4 import BeautifulSoup
import json
import pandas
import gzip


pagerefs = []
counter1 = 0
for i in range(1, 3):
    try:
        print(i)
        response = requests.get('https://www.smulweb.nl/recepten?page=' + str(i))
        soup = BeautifulSoup(response.content.decode('cp1252'), 'html.parser')
        # data = gzip.decompress(response.content)
        # data = str(data,'utf-8')
        # soup = BeautifulSoup(data.decode("utf-8"), 'html.parser')
        if (i == 1):
            soup = soup.find("div", {"class": "toMasonry"})

        articles = soup.find_all('article')
        for article in articles:
            refs = article.find_all('a', href=True)
            pagerefs.append(refs[0]['href'])
        print(len(pagerefs))

    except:
        counter1 += 1
        print("counter1 is ", counter1)

# print(pagerefs)
recipes = []
print(len(pagerefs))
recipesId = 1
counter2 = 0
# for ref in pagerefs[0:1]:

for ref in pagerefs:
    try: 
        currentRecipe = dict()
        currentRecipe["URL"] = ref

        response = requests.get(ref)
        soup = BeautifulSoup(response.content.decode("utf-8"), 'html.parser')
        mydivs = soup.find_all("div", {"class": "recipe-details-list"})

        ingredients = []
        if (len(mydivs) == 0):
                continue


        ingredientenLijst = mydivs[0].find("span").contents 
        for x in ingredientenLijst:
            if x == mydivs[0].find("span").contents[0]:
                ingredients.append(x)
            else:
                ingredientString = str()
                for y in x:
                    if(getattr(y, 'name', None) == 'br'):
                        ingredientString += 'br '
                    if(getattr(y, 'name', None) != 'br'):
                        if getattr(y, 'name', None) == "a":
                            ingredientString += y.contents[0]
                        else:
                            ingredientString += y
                ingredients.append(ingredientString)
                ingredientString = str()

        ingredients = [i for i in ingredients if i != "" or " "]
        currentRecipe["ingredients"] = str(ingredients)


        myTitle = soup.find_all("h1", {"class": "recipe__title"})
        currentRecipe["title"] = next(myTitle[0].stripped_strings)





        myDescription = soup.find_all("div", {"data-testid": "recipe-description"})
        descriptionText = ""
        for line in myDescription[0].stripped_strings:
            descriptionText += line
        currentRecipe["description"] = descriptionText


        mySteps = soup.find_all("p", {"data-testid": "recipe-instructions"})
        stepsText = ""
        for line in mySteps[0].stripped_strings:
            stepsText += line
        currentRecipe["steps"] = stepsText


        myImg = soup.find_all("img", {"data-testid": "recipe-image"})
        # stepsText = ""
        # for line in myImg[0].stripped_strings:
        #     stepsText += line
        # print(myImg[0]["data-splide-lazy"])
        currentRecipe["imgURL"] = myImg[0]["data-splide-lazy"]

        # print(currentRecipe)
        recipes.append(currentRecipe)

        recipesId += 1
    except:
        counter2 += 1
        print("counter2 is ", counter2)
 
shouldDelete = ["/", "'", "0","1", "2", "3", "4", "5", "6", "7", "8", "9", r"\n", r"\\n", "<br>", " g ", " gram ", " gr ", " el ", " ml ", " dl ", ".", " a " , " ml ", " kilo ", " kg ", " br "]
for recipe in recipes:
    for sym in shouldDelete:
        if (sym in recipe["ingredients"]):
            recipe["ingredients"] = recipe["ingredients"].replace( sym, "")
        if (recipe["ingredients"].endswith("br")): 
            recipe["ingredients"] = recipe["ingredients"][:-2]



# Serializing json 
json_object = json.dumps(recipes, indent=2)

with open("recipes.json", "w") as outfile:
    outfile.write(json_object)

pandas.read_json("recipes.json").to_excel("recipes.xlsx")

     
