import { APPparameters } from "./Parameters";

export function rateRecept(recept, member){
    opinionsSum = 0
    opinionsLength = 0
    const subtags = recept.SubTags.split(',');
    subtags.forEach(ingredient =>{
        opinionsLength++

        for (const [key, value] of Object.entries(member.voorkeuren)) {
            if (ingredient.replaceAll(" ", "").toUpperCase() == (key.replaceAll(" ", "").toUpperCase())) {
                opinionsSum = opinionsSum + value - APPparameters.likertMiddle
            }
        }
    })

    if (opinionsLength>0) {
        return opinionsSum/opinionsLength
    }else{
        return 0
    }

}

export function getSharedIngredients(voorkeuren, SubTags){
    let sharedIngredients = []
    const subtags = SubTags.split(',');
    subtags.forEach(ingredient =>{
        for (const [key, value] of Object.entries(voorkeuren)) {
            console.log(voorkeuren);
            if (ingredient.replaceAll(" ", "").toUpperCase() == (key.replaceAll(" ", "").toUpperCase())) {
                sharedIngredients.push(key)
            }
        }
    })
    return sharedIngredients
}

export function getParticipatingMembers(group){
    return group.filter( member =>{
        return member["checked"] == true
    })
}