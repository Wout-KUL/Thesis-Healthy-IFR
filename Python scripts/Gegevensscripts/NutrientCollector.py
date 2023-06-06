import pandas as pd
import requests
from bs4 import BeautifulSoup
import json
import gzip

# df = pd.read_excel(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\RecipeCollector\IngredientTags.xlsm")
df = pd.read_excel(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\App\FoodApp\FoodApp\FinalNutrientList.xlsx")
# print(df)

df.loc[:,"Tags"]

# print(df.loc[:,"Tags"].values.tolist())

gaveUpTags = []
noInfoTags = []
newTags = []
linkStarts =["https://www.ahealthylife.nl/de-voedingswaarde-van-", 
              "https://www.ahealthylife.nl/voedingswaarde-", 
              "https://www.ahealthylife.nl/voedingswaarde-van-"]
notFount = "Oeps! Deze pagina kon niet worden gevonden."

handmatigeRefs =[
                    "https://www.ahealthylife.nl/de-voedingswaarde-ui/",
                    "https://www.ahealthylife.nl/voedingswaarde-tomaten/",
                    "https://www.ahealthylife.nl/voedingswaarde-bacon/",
                    "https://www.ahealthylife.nl/de-voedingswaarde-van-sesamzaad/",
                    "https://www.ahealthylife.nl/voedingswaarde-van-gehakt/",
                    "https://www.ahealthylife.nl/de-voedingswaarde-van-verse-munt/",
                    "https://www.ahealthylife.nl/de-voedingswaarde-van-kokoswater/",
                    "https://www.ahealthylife.nl/de-voedingswaarde-van-gebakken-ei/",
                    "https://www.ahealthylife.nl/de-voedingswaarde-van-gekookte-eieren/",
                    "https://www.ahealthylife.nl/de-voedingswaarde-van-appel/",
                ]

def get(tag, isNew):
    for start in linkStarts:
        url = start + tag
        response = requests.get(url)
        soup = BeautifulSoup(response.content.decode("utf-8"), 'html.parser')
        if (soup.find('h1', {"class": "entry-title"}).contents[0] == notFount):
            continue
        else:
            if (isNew):
                newTags.append(tag)
            return soup
    print("noInfoTags is ",noInfoTags)
    print("newTags is ",newTags)
    print("gaveUpTags is ",gaveUpTags)
    newTag = input('What is right tag instead of ' + tag + '\n')
    noInfoTags.append(tag)

    if(newTag == "skip"):
            gaveUpTags.append(tag)
            return False
    return get(newTag, True)

def findAllTitles(row0):
    titles = []
    columns = row0.findAll("td")
    for columnIndex in range(0, len(columns)):
        column = columns[columnIndex]
        titles.append(column.getText())


    return titles

def findBron(soup):
    bronnen = []
    div = soup.find("div", {"class": "entry-content"})
    p = div.find("p")
    for bron in p.find_all('a', href=True):
        bronnen.append(bron["href"])

    return bronnen


counter = 0
allTagsNutrients = []
# for tag in df.loc[:,"Tags"].values.tolist():
# for tag in ["Aardappelen", "lala"]:
# for tag in ["dadels"]:
for ref in handmatigeRefs:
        
        response = requests.get(ref)
        soup = BeautifulSoup(response.content.decode("utf-8"), 'html.parser')
        # soup =get(tag, False)
        if(soup == False):
            nutrients = {}
            allTagsNutrients.append(nutrients)       
            continue

        counter +=1
        print("currently at tag nmb ", counter)
        table = soup.find('table')
        bronnen = findBron(soup)
        rows = table.findAll('tr')

        nmbOfCol = len(rows[0].findAll("td"))
        titles = findAllTitles(rows[0])
        nmbOfTagKinds = int((nmbOfCol-1)/2)
        for kindIndex in range(0, nmbOfTagKinds):
            neededColumns = [0]
            neededColumns.append(1 + 2*kindIndex)
            neededColumns.append(2 + 2*kindIndex)

            nutrients = {}
            nutrients["Tag"] = titles[1 + 2*kindIndex]
            nutrients["Per"] = titles[0]
            titles[1 + 2*kindIndex] = ""

            for rowIndex in range(0, len(rows)):
                if rowIndex == 0:
                    continue
                row = rows[rowIndex]
                columns = row.findAll("td")
                nutrientName = ""
                for columnIndex in neededColumns:
                # for columnIndex in range(0, len(columns)):
                    column = columns[columnIndex]
                    if (columnIndex == 0):
                        nutrientName = column.getText()
                    # elif (columnIndex == 2 or columnIndex == 4):
                    #     nutrients[nutrientName + " " +titles[columnIndex] +" " ] = column.getText()
                    else:
                        nutrients[nutrientName + " " + titles[columnIndex] + " "] = column.getText()

            nutrients["Bronnen"] = bronnen
            allTagsNutrients.append(nutrients)       

# Serializing json
json_object = json.dumps(allTagsNutrients, indent=2)

# Writing to sample.json
with open("TagNutrientsHandmatig.json", "w") as outfile:
    outfile.write(json_object)

pd.read_json("TagNutrientsHandmatig.json").to_excel("TagNutrientsHandmatig.xlsx")


        # if(counter == 10):
        #     print(noInfoTags)
        #     print(newTags)
        #     print(gaveUpTags)


