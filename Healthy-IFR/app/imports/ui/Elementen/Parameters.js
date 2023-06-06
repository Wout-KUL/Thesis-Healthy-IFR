export const APPparameters = getParameters()

function getParameters() {
    parameters = {
    learnedUpperLimit : 100,
    learnedLowerLimit : 0,
    likertMiddle : 3,
    }
    parameters["learnedIncrease"] = (parameters.learnedUpperLimit - parameters.learnedLowerLimit) / 8 //iedere week 2 keer gegeten 8
    parameters["learnedDecrease"] = (parameters.learnedUpperLimit - parameters.learnedLowerLimit) / 30 // een hele maand niet gegeten 30
    return parameters
} 