import {getParticipatingMembers, rateRecept} from './TasteFunctions'
import { recommendedMen, recommendedWomen, upperMen, upperWomen, calcOther, vegiFactors } from './RecommendedAndLimitIntakes'
import { sumTagNutritions, calcHeuristics, calcHeuristicsVitMin, calcZScoresSufficientOfRecipe, calcZScoresSufficientOfRecipeVitMin, calcZScoresToMuchOfRecipe, calcZScoresToMuchOfRecipeVitMin, } from './HealthFunctions'
import { APPparameters } from './Parameters'

function AnalyseRecept(recept, member, alleIngredienten){
    const gender = member.geslacht


    let genderRecommended = gender == "Man"? JSON.parse(JSON.stringify(recommendedMen)) : JSON.parse(JSON.stringify(recommendedWomen))
    genderRecommended = gender== "Andere"? calcOther(JSON.parse(JSON.stringify(recommendedMen)), JSON.parse(JSON.stringify(recommendedWomen))) : genderRecommended
    
    let genderUpper = gender == "Man"? JSON.parse(JSON.stringify(upperMen)) : JSON.parse(JSON.stringify(upperWomen))
    genderUpper = gender== "Andere"? calcOther(JSON.parse(JSON.stringify(upperMen)), JSON.parse(JSON.stringify(upperWomen))) : genderUpper

    if (member.isVegi) {
        genderRecommended.IJzer_mg_ADH = genderRecommended.IJzer_mg_ADH * vegiFactors.iron
    }

    healthScoreSum = 0
    const nutrienten = sumTagNutritions(recept, alleIngredienten) 
    const enoughHeuristics = calcHeuristics(calcZScoresSufficientOfRecipe(nutrienten, genderRecommended))
    const toMuchHeuristics = calcHeuristics(calcZScoresToMuchOfRecipe(nutrienten, genderRecommended, genderUpper))
    for (const [key, enoughValue] of Object.entries(enoughHeuristics)) {
        const toMuchValue = toMuchHeuristics[key]
        if (enoughValue >= 1 && toMuchValue <= 1) {
            healthScoreSum++
        }
    }

    const enoughHeuristicsVitMin = calcHeuristicsVitMin(calcZScoresSufficientOfRecipeVitMin(nutrienten, genderRecommended))
    const toMuchHeuristicsVitMin = calcHeuristicsVitMin(calcZScoresToMuchOfRecipeVitMin(nutrienten, genderRecommended, genderUpper))
    for (const [key, enoughValue] of Object.entries(enoughHeuristicsVitMin)) {
        const toMuchValue = toMuchHeuristicsVitMin[key]
        if (enoughValue >= 1 && toMuchValue <= 1) {
            healthScoreSum++
        }
    }
    console.log(Object.entries(enoughHeuristics).length + Object.entries(enoughHeuristicsVitMin).length);
    return [(Object.entries(enoughHeuristics).length + Object.entries(enoughHeuristicsVitMin).length), healthScoreSum  ]
}

export  function addHealthMetric(recepten, groepInfo, alleIngredienten){
    let participatingMembers = getParticipatingMembers(groepInfo["group"])
    let maxScore = 6
    let minScore = 0
    for (let index = 0; index < recepten.length; index++) {
        let recept = recepten[index]
        let healthScoreSum = 0
        if (participatingMembers.length == 0) {
            let dummyGroup = [{
                "naam" : "dummy",
                "voorkeuren" : {},
                "allergien" : [],
                "isVegi" : false,
                "checked" : true,
                "geslacht" : "Andere"
            }]
            participatingMembers = dummyGroup
        }
        participatingMembers.forEach(member => {
            [maxScore, healthScoreMember] = AnalyseRecept(recept, member, alleIngredienten)

            healthScoreSum = healthScoreSum + healthScoreMember
        })
        const zScore = (healthScoreSum/participatingMembers.length - minScore) / (maxScore - minScore)
        recept["healthScore"] = zScore
    };

    return recepten
}

export function addTasteMetric(recepten, groepInfo){
    const participatingMembers = getParticipatingMembers(groepInfo["group"])


    for (let index = 0; index < recepten.length; index++) {
        let recept = recepten[index]

        let maxScore = 2 * participatingMembers.length;
        let minScore = - maxScore

        let opinionsSum = 0
        if (participatingMembers.length>0) {
            participatingMembers.forEach(member => {
                //rateRecept returd gemiddelde opinion over de ingredienten in het recept
                opinionsSum = opinionsSum + rateRecept(recept, member)
            })

            const zScore = (opinionsSum/participatingMembers.length - minScore) / (maxScore - minScore )
            recept["opinion"] = zScore

        }else{
            recept["opinion"] = 0.5

        }

    };
    return recepten
}




//////////////////////////////////INGREDIENTEN METRICS /////////////////////////////////////////////////////////////////////////////

export function rateIngredientTaste(ingredient, groepInfo){
    const participatingMembers = getParticipatingMembers(groepInfo["group"])

    opinionsSum = 0
    opinionsMax = 0
    opinionsMin = 0
    for (let index = 0; index < participatingMembers.length; index++) {
        opinionsMax = opinionsMax + 2
        opinionsMin = opinionsMin - 2


        const member = participatingMembers[index];
        for (const [key, value] of Object.entries(member.voorkeuren)) {
            if (ingredient.naam.replaceAll(" ", "").toUpperCase() == (key.replaceAll(" ", "").toUpperCase())) {
                opinionsSum = opinionsSum + value - APPparameters.likertMiddle
            }
        }
        
    }
    if (opinionsMax>0) {
        ingredient["opinion"] = ( opinionsSum  - opinionsMin)/(opinionsMax - opinionsMin)
    }else{
        ingredient["opinion"] =  0.5
    }
    return ingredient

}

export function rateIngredientHealth(ingredient, groepInfo){
    let participatingMembers = getParticipatingMembers(groepInfo["group"])
    let treshold = 0.5
    let healthSum = 0
    let healthMax = 0
    let healthMin = 0

    if (participatingMembers.length == 0) {
        let dummyGroup = [{
            "naam" : "dummy",
            "voorkeuren" : {},
            "allergien" : [],
            "isVegi" : false,
            "checked" : true,
            "geslacht" : "Andere"
        }]
        participatingMembers = dummyGroup
    }


    for (let index = 0; index < participatingMembers.length; index++) {
        const member = participatingMembers[index];

        let genderRecommended = member.geslacht == "Man"? JSON.parse(JSON.stringify(recommendedMen)) : JSON.parse(JSON.stringify(recommendedWomen))
        genderRecommended = member.geslacht == "Andere"? calcOther(JSON.parse(JSON.stringify(recommendedMen)), JSON.parse(JSON.stringify(recommendedWomen))) : genderRecommended
        if (member.isVegi) {
            genderRecommended.IJzer_mg_ADH = genderRecommended.IJzer_mg_ADH * vegiFactors.iron
        }


        const enoughHeuristics = calcHeuristics(calcZScoresSufficientOfRecipe(ingredient.nutrienten, genderRecommended))
        for (const [key, value] of Object.entries(enoughHeuristics)) {
            healthMax++
            if (value> treshold) {
                healthSum++
            }
        }

        const enoughHeuristicsVitMin = calcHeuristicsVitMin(calcZScoresSufficientOfRecipeVitMin(ingredient.nutrienten, genderRecommended))
        for (const [key, value] of Object.entries(enoughHeuristicsVitMin)) {
            healthMax++
            if (value> treshold) {
                healthSum++
            }
        }

    }

    if (healthMax>0) {
        ingredient["health"] = (healthSum - healthMin)/(healthMax - healthMin)
    }else{
        ingredient["health"] = 0
    }
    return ingredient

}