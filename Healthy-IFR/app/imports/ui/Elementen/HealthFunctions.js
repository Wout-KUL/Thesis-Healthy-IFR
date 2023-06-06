import { refactoringValues } from "./RecommendedAndLimitIntakes"

export function  calcZScoresToMuchOfRecipe(nutrienten, genderRecommended,  genderUpper){
    const maxScore = refactoringValues["maxScoreDoughnut"]
    const refactorToDiner = refactoringValues["refactorToDiner"]

    // const avgMealWeigth_g = 400
    // const avgMealWeigth_per100g = 400/100
    // const refactorToIngredientSize = {"Big": 1/3, "Medium":1/4, "Small": 1/6, "Tiny":1/10}
    let zScores = {}

    // recommendedMen["Vet_kcal_ADH"] = 0.275* recommendedMen["kcal_ADH"]
    // upperMen["Vet_kcal_ADH"] = 0.35* recommendedMen["kcal_ADH"]

    for (const [key, value_perDay] of Object.entries(genderRecommended)) {
        // if(key == "Vet_kcal_ADH"){
        //     if(!ingredient.nutrienten["Vet_g"]  || ingredient.nutrienten["Vet_g"] == "–"){
        //         zScores["Vet_kcal_ADH"] = 0
        //     }else{
        //     const aandeelVetPer100g = ingredient.nutrienten["Vet_g"]/100 
        //     const kcalAfkomstigVanVet = aandeelVetPer100g*ingredient.nutrienten["kcal"]
        //     zScores["Vet_kcal_ADH"] = (kcalAfkomstigVanVet    - (recommendedMen["Vet_kcal_ADH"] * refactorToDiner))
        //                                 / ((upperMen["Vet_kcal_ADH"] * refactorToDiner) - (recommendedMen["Vet_kcal_ADH"] * refactorToDiner))
        //     }
        // }
        if (genderUpper[key]){
            let max = genderUpper[key]
            // if(!ingredient.nutrienten[key.slice(0, -4)] || ingredient.nutrienten[key.slice(0, -4)] == "–"){
            //     zScores[key] = 0
            // }
            // else {
                zScores[key] = ((nutrienten[key.slice(0, -4)] ) - (value_perDay * refactorToDiner))
                                    / ((max * refactorToDiner) - (value_perDay * refactorToDiner))
                // if (zScores[key] > maxScore){
                //     zScores[key] = maxScore
                // }
            // }
        }
        else {
            zScores[key] = 0

        }



    }
    // console.log("Zscore is ", zScores)
    return zScores
}

export function  calcZScoresSufficientOfRecipe(nutrienten, genderRecommended){
    const maxScore = refactoringValues["maxScoreDoughnut"]
    const refactorToDiner = refactoringValues["refactorToDiner"]
    // console.log("kc is ", ingredient.kcal)
    // https://web-s-ebscohost-com.kuleuven.e-bronnen.be/ehost/pdfviewer/pdfviewer?vid=0&sid=5d233075-4889-43b2-a5ad-d591b0c3d157%40redis 1/3
    // https://onlinelibrary.wiley.com/doi/epdf/10.1111/ecin.12069?saml_referrer 0-400 green 400-800 yellow
    // https://www.healthxchange.sg/food-nutrition/weight-management/eating-right-recommended-calorie-intake-healthier-alternatives#:~:text=Here%27s%20the%20recommended%20amount%20of,dinner%3A%20400%2D500%20calories%20each 400-500
    // https://globalnews.ca/news/3615212/this-is-what-your-breakfast-lunch-and-dinner-calories-actually-look-like/#:~:text=Although%20every%20person%27s%20daily%20caloric,each%20for%20lunch%20and%20dinner. 500-700

    //average meal 400g
    // const maxScore = 0.99
    // const avgMealWeigth_g = 400
    // const avgMealWeigth_per100g = 400/100

    // const refactorToIngredientSize = {"Big": 1/3, "Medium":1/4, "Small": 1/6, "Tiny":1/10}
    let zScores = {}
    // https://newsinhealth.nih.gov/2011/12/weighing-dietary-fats#:~:text=Experts%20say%20that%20the%20total,calories%20from%20saturated%20fatty%20acids.
    // 20-35 % cal per dag moeten v vetten komen


    // recommendedMen["Vet_kcal_ADH"] = 0.275* recommendedMen["kcal_ADH"]



    for (const [key, value_perDay] of Object.entries(genderRecommended)) {
        // zScores[key] = ingredient.nutrienten[key.slice(0, -4)] / (value * refactorToDiner *refactorToIngredientSize[ingredient.Amount] )

        //Influence of ingredient on diner -zegt weinig over hoe goed ingredienten zijn die in kleine hoeveelheid voorkomen
        // zScores[key] = (ingredient.nutrienten[key.slice(0, -4)]  * avgMealWeigth_per100g *refactorToIngredientSize[ingredient.Amount] ) 
        //                     / (value_perDay * refactorToDiner)
        // if(key == "Vet_kcal_ADH"){
        //     console.log("#vet is", ingredient.nutrienten["Vet_g"]);
        //     const aandeelVetPer100g = ingredient.nutrienten["Vet_g"]/100 
        //     const kcalAfkomstigVanVet = aandeelVetPer100g*ingredient.nutrienten["kcal"]
        //     zScores["Vet_kcal_ADH"] = kcalAfkomstigVanVet   * avgMealWeigth_per100g*refactorToIngredientSize[ingredient.Amount]
        //                                 / (recommendedMen["Vet_kcal_ADH"] * refactorToDiner)
        //     console.log("wel vet info", zScores["Vet_kcal_ADH"]);
        // }
        // else{
            // console.log("#vet is", nutrienten["Vet_g"]);

            zScores[key] = (nutrienten[key.slice(0, -4)]) / (value_perDay * refactorToDiner)
            

        // }

    }
    return zScores
}

function  sumIngredientNutritions(ingredients){
    // console.log("HF ingredients is " , ingredients)
    const avgMealWeigth_g = 400
    const avgMealWeigth_per100g = avgMealWeigth_g/100
    const refactorToIngredientSize = refactoringValues["refactorToIngredientSize"]
    let totalNutritions = {}
    let mealSize = 0
    ingredients.forEach(ingredient =>{
        mealSize = mealSize + refactorToIngredientSize[ingredient.Amount]
    })
    ingredients.forEach(ingredient =>{
        for (const [key, value] of Object.entries(ingredient.nutrienten)) {
            if (!totalNutritions[key]) {
                totalNutritions[key] = 0
            }
            let scaledValueToMeal = (typeof value == "number"?value:0) * avgMealWeigth_per100g * refactorToIngredientSize[ingredient.Amount]
            totalNutritions[key] = totalNutritions[key] + scaledValueToMeal / mealSize
        }
    })
    return totalNutritions
}

export function  sumTagNutritions(recept, alleIngredienten){
    const subtags = recept.SubTags.split(',');
    // console.log(subtags)
    let ingredients = []
    subtags.forEach(ingredientTag =>{
        // console.log(recept)
        // console.log(ingredientTag.replaceAll(/\s/g, ''))
        // console.log(alleIngredienten)
        if (!ingredientTag.replaceAll(/\s/g, '') == "") {
            // alleIngredienten.forEach(ingredient =>{
            //     console.log("1 ", ingredient.naam.replaceAll(" ", "").toUpperCase());
            // })
            // console.log("1 ", ingredientTag.replaceAll(" ", "").toUpperCase());

            const taggedIngredient = alleIngredienten.find((ingredient) => 
            // ingredient.naam==ingredientTag.replaceAll(/\s/g, '')
            ingredient.naam.replaceAll(" ", "").toUpperCase() == (ingredientTag.replaceAll(" ", "").toUpperCase())
            )
            ingredients.push(taggedIngredient)
            // console.log(taggedIngredient)
        }


        // const taggedIngredientZScore = this.calcZScoresSufficientOfIngredient(taggedIngredient)
        // for (const [key, score] of Object.entries(taggedIngredientZScore)) {
        //     if (!totalZScore[key]) {
        //         totalZScore[key] = 0
        //     }
        //     totalZScore[key] = totalZScore[key] + (score?score:0)

        // }
    })
    // console.log(ingredients);
    let summedNutritions = sumIngredientNutritions(ingredients)
    // console.log(summedNutritions);
    return summedNutritions
}

export function calcHeuristics(zScores){

    let heuristics = {}
    heuristics["Caloriën"] = zScores["kcal_ADH"]?zScores["kcal_ADH"]:0
    let VitaminsAndMineralsLength = 0
    let VitaminsAndMineralsSum = 0
    const exclude  = ["kcal_ADH", "Koolhydraten_g_ADH", "Eiwit_g_ADH", "Kj_ADH", "Water_g_ADH", "Vet_kcal_ADH", "Vezels_g_ADH", "Vet_g_ADH"]
    for (let [key, value] of Object.entries(zScores)) {
        // console.log(!(key in exclude))
        // console.log(!exclude.includes(key))

        if (!exclude.includes(key)){
            // console.log(`${key}: ${value}`);
            if (value){
                VitaminsAndMineralsLength = VitaminsAndMineralsLength +1
                VitaminsAndMineralsSum = VitaminsAndMineralsSum + value
            }
        }
    }
    // console.log("VitaminsAndMineralsLength is ", VitaminsAndMineralsLength)
    // console.log("VitaminsAndMineralsSum is ", VitaminsAndMineralsSum)
    // console.log("div is ",  VitaminsAndMineralsSum / VitaminsAndMineralsLength)


    // heuristics["Vet"] = zScores["Vet_kcal_ADH"]?zScores["Vet_kcal_ADH"]:0
    heuristics["Vet"] = zScores["Vet_g_ADH"]?zScores["Vet_g_ADH"]:0


    heuristics["Vitamines_&_Mineralen"] = (VitaminsAndMineralsSum / VitaminsAndMineralsLength) ? VitaminsAndMineralsSum / VitaminsAndMineralsLength:0
    heuristics["Eiwitten"] = zScores["Eiwit_g_ADH"]?zScores["Eiwit_g_ADH"]:0
    heuristics["Vezels"] = zScores["Vezels_g_ADH"]?zScores["Vezels_g_ADH"]:0
    heuristics["Koolhydraten"] = zScores["Koolhydraten_g_ADH"]?zScores["Koolhydraten_g_ADH"]:0

    return heuristics
}

export function giveHeuristicsMax(heuristics){
    const maxScore = refactoringValues["maxScoreDoughnut"]
    for (let [key, value] of Object.entries(heuristics)) {
        if (value> maxScore) {
            heuristics[key]=maxScore
        }
    }
    return heuristics
}

export function giveHeuristicsMaxHexagon(heuristics){
    for (let [key, value] of Object.entries(heuristics)) {
        if (value> refactoringValues["maxScoreHexagon"]) {
            heuristics[key]=refactoringValues["maxScoreHexagon"]
        }
    }
    return heuristics
}



// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8746448/

export function  calcZScoresSufficientOfRecipeVitMin(nutrienten, genderRecommended){
    const refactorToDiner = refactoringValues["refactorToDiner"]
    let zScores = {}
    let categories = ["B12_ug_ADH", "D_ug_ADH", "E_mg_ADH", "Calcium_mg_ADH", "IJzer_mg_ADH", "Magnesium_mg_ADH", "Zink_mg_ADH"]
    for (const key of categories) {
        let value_perDay = genderRecommended[key]
        // console.log("value_perDay " + key + " is ", value_perDay);
        // console.log(nutrienten[key.slice(0, -4)])
        // console.log(nutrienten)


        zScores[key] = (nutrienten[key.slice(0, -4)]) / (value_perDay * refactorToDiner)
    }
    return zScores
}


export function  calcZScoresToMuchOfRecipeVitMin(nutrienten, genderRecommended, genderUpper){
    const refactorToDiner = refactoringValues["refactorToDiner"]
    let zScores = {}
    let categories = ["B12_ug_ADH", "D_ug_ADH", "E_mg_ADH", "Calcium_mg_ADH", "IJzer_mg_ADH", "Magnesium_mg_ADH", "Zink_mg_ADH"]

    for (const key of categories) {
        let value_perDay = genderRecommended[key]
        if (genderUpper[key]){
            let max = genderUpper[key]

            zScores[key] = ((nutrienten[key.slice(0, -4)] ) - (value_perDay * refactorToDiner))
                                / ((max * refactorToDiner) - (value_perDay * refactorToDiner))
        }
        else {
            zScores[key] = 0
        }
    }
    return zScores
}

export function calcHeuristicsVitMin(zScores){

    let heuristics = {}
    heuristics["B12"] = zScores["B12_ug_ADH"]?zScores["B12_ug_ADH"]:0
    heuristics["D"] = zScores["D_ug_ADH"]?zScores["D_ug_ADH"]:0


    heuristics["E"] = zScores["E_mg_ADH"]?zScores["E_mg_ADH"]:0
    heuristics["Calcium"] = zScores["Calcium_mg_ADH"]?zScores["Calcium_mg_ADH"]:0
    heuristics["IJzer"] = zScores["IJzer_mg_ADH"]?zScores["IJzer_mg_ADH"]:0
    heuristics["Zink"] = zScores["Zink_mg_ADH"]?zScores["Zink_mg_ADH"]:0

    heuristics["Magnesium"] = zScores["Magnesium_mg_ADH"]?zScores["Magnesium_mg_ADH"]:0

    return heuristics
}






