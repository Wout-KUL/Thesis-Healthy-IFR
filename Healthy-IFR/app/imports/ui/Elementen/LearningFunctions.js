import { getParticipatingMembers } from "./TasteFunctions";
import { APPparameters } from "./Parameters";

export function updateLearnedPreferences(recept, rating, groepInfo, alleIngredienten){
    //rating voor kwaliteit van de recepten te achterhalen voor analyse achteraf => gekozen dat dit niet doortrekbaar is tot lekkerheid van ingredienten
    console.log(groepInfo["group"]);
    let participatingMembers = getParticipatingMembers(groepInfo["group"])
    console.log(APPparameters);


    const subtags = recept.SubTags.split(',');
    const receptIngredientenNamen = subtags.map(tag => tag.replaceAll(" ", "").toUpperCase())
    alleIngredienten.map(ingredient => ingredient.naam.replaceAll(" ", "").toUpperCase()).forEach(ingredientNaam => {

        participatingMembers.forEach(member => {
            if (member.learnedPreferences) {  //zodat testfase blijft werken na de update
                if (receptIngredientenNamen.includes(ingredientNaam)) {
                    member.learnedPreferences[ingredientNaam] = member.learnedPreferences[ingredientNaam] +APPparameters.learnedIncrease
                    
                }else{
                    member.learnedPreferences[ingredientNaam] = member.learnedPreferences[ingredientNaam] -APPparameters.learnedDecrease
                }
            }
        });
        
    })
    console.log(groepInfo["group"]);

    updateVoorkeuren(groepInfo)

}

function updateVoorkeuren(groepInfo){
    let participatingMembers = getParticipatingMembers(groepInfo["group"])
    let updated = false
    let members = new Set()
    participatingMembers.forEach(member => {
        if (member.learnedPreferences) {  //zodat testfase blijft werken na de update

            for (const [key, value] of Object.entries(member.learnedPreferences)){
                if (!member.blockedArray.includes(key.replaceAll(" ", "").toUpperCase())) {
                    if (value > APPparameters.learnedUpperLimit) {
                        updated = true
                        members.add(member.naam)
                        if(member.voorkeuren[key]){
                            member.voorkeuren[key] = member.voorkeuren[key] == 5? 5: member.voorkeuren[key] + 1
                        }
                        else{
                            member.voorkeuren[key] = APPparameters.likertMiddle + 1
                        }
                        member.learnedPreferences[key] = APPparameters.learnedLowerLimit
                    }
    
    
                    else if (value < APPparameters.learnedLowerLimit) {
                        updated = true
                        members.add(member.naam)

                        if(member.voorkeuren[key]){
                            member.voorkeuren[key] =member.voorkeuren[key] == 1? 1:  member.voorkeuren[key] - 1
                        }
                        else{
                            member.voorkeuren[key] = APPparameters.likertMiddle - 1
                        }
                        member.learnedPreferences[key] = APPparameters.learnedUpperLimit
                    }
                }
                
            }
        }
    
    })
    if (updated) {
        alert("Omdat u enkele ingrediënten vaak, of bijna niet eet, zijn één of meerdere van de ingrediënten " + 
                    "voorkeuren van " + Array.from(members).join(', ') + " gewijzigd. U kan het automatisch updaten van voorkeuren uitschakelen bij uw persoonlijke voorkeuren in de groepsinstellingen pagina.")
    }

    Meteor.call('GroepsInformatieDB.update', groepInfo);
}
      