import { Meteor } from 'meteor/meteor'; 

import { ReceptenDB } from '/imports/db/ReceptenDB';
import '/imports/api/ReceptenDBMethods';
import '/imports/api/ReceptenDBPublications';
import {recipes} from './recipes2'

import { IngredientenDB } from '/imports/db/IngredientenDB';
import '/imports/api/IngredientenDBMethods';
import '/imports/api/IngredientenDBPublications';

import '/imports/api/GroepsInformatieDBMethods';
import '/imports/api/GroepsInformatieDBPublications';

import '/imports/api/MaaltijdGeschiedenisDBMethods';
import '/imports/api/MaaltijdGeschiedenisDBPublications';

import {ingredienten} from './ingredienten2'

import '/imports/api/signUpMethods';

import '/imports/api/ActivityLogboekDBMethods';
import '/imports/api/ActivityLogboekDBPublications';


import { Accounts } from 'meteor/accounts-base';

import '/imports/api/PythonMethods';

// console.log("Current directory:", process.cwd());

const insertRecept = (recept) => {
  ReceptenDB.insert({
    link: recept.URL,
    ingredienten: recept.ingredients,
    titel: recept.title,
    beschrijving: recept.description,  
    bereidingswijze: recept.steps,
    imgLink: recept.imgURL,

    Nmb	: recept.Nmb,
    SubTags	: recept.SubTags,
    Hoeveelheden	: recept.Hoeveelheden,
    MainTags	: recept.MainTags,
    Yields	: recept.Yields,
    Preparation_min	: recept.Preparation_min,
    Cooking_min	: recept.Cooking_min,
    Meal_type	: recept.Meal_type,
    Cuisine	: recept.Cuisine,
    Energy_kj_portion	: recept.Energy_kj_portion,
    Energy_kcal_portion	: recept.Energy_kcal_portion,
    Carbohydrate_g_portion	: recept.Carbohydrate_g_portion,
    Protein_g_portion	: recept.Protein_g_portion,
    Fat_g_portion	: recept.Fat_g_portion,
    Fibre_g_portion	: recept.Fibre_g_portion,
    Sodium_mg_portion	: recept.Sodium_mg_portion,
    Iron_mg_portion	: recept.Iron_mg_portion,
    vegan: recept.vegan,
    origineelEngels : recept.origineelEngels,

  // 12_microg_portion	
  // Iron_%rda_be_0-5m/f	
  // Iron_%rda_be_6-9m/f	
  // Iron_%rda_be_10-13m/f	
  // Iron_%rda_be_14-60f	
  // Iron_%rda_be_14-17m	
  // Iron_%rda_be_18+m	
  // Iron_%rda_be_60+f	
  // Iron_%rda_uk_1-3m/f	
  // Iron_%rda_uk_4-6m/f	
  // Iron_%rda_uk_7-10m/f	
  // Iron_%rda_uk_11-18m	
  // Iron_%rda_uk_19-50m	
  // Iron_%rda_uk_11-50f	
  // Iron_%rda_uk_51+m/f	
  // Iron_bioav%	
})};
// console.log(ingredienten);

const insertIngredient = (ingredient) => {
  if(!(ingredient.ID === null)){
    IngredientenDB.insert({
        naam: ingredient.Tags,
        // nutrienten: {calorien: ingredient.calorien, ijzer: ingredient.calorien},
        ID: ingredient.ID,
        Tags: ingredient.Tags,
        TagSite: ingredient.TagSite,
        Amount: ingredient.Amount,
        Vegi : ingredient.Vegi,
        // ignore1: ingredient.ignore1,
        // ignore2: ingredient.ignore2,
        Per: ingredient.Per,
        nutrienten: {
                      kcal: ingredient.kcal,
                      kcal_ADH : ingredient.kcal_ADH,
                      Kj : ingredient.Kj,
                      Kj_ADH: ingredient.Kj_ADH,
                      Water_g: ingredient.Water_g,
                      Water_g_ADH: ingredient.Water_g_ADH,
                      Eiwit_g : ingredient.Eiwit_g,
                      Eiwit_g_ADH: ingredient.Eiwit_g_ADH,
                      Koolhydraten_g : ingredient.Koolhydraten_g,
                      Koolhydraten_g_ADH: ingredient.Koolhydraten_g_ADH,
                      Suiker_g : ingredient.Suiker_g,
                      Suiker_g_ADH: ingredient.Suiker_g_ADH,
                      Vet_g : ingredient.Vet_g,
                      Vet_g_ADH: ingredient.Vet_g_ADH,
                      Verzadigd_g : ingredient.Verzadigd_g,
                      Verzadigd_g_ADH: ingredient.Verzadigd_g_ADH,
                      EOV_g : ingredient.EOV_g,
                      EOV_g_ADH: ingredient.EOV_g_ADH,
                      MOV_g : ingredient.MOV_g,
                      MOV_g_ADH: ingredient.MOV_g_ADH,
                      Omega6_g : ingredient.Omega6_g,
                      Omega6_g_ADH: ingredient.Omega6_g_ADH,
                      Omega3_g : ingredient.Omega3_g,
                      Omega3_g_ADH: ingredient.Omega3_g_ADH,
                      Cholesterol_mg : ingredient.Cholesterol_mg,
                      Cholesterol_mg_ADH: ingredient.Cholesterol_mg_ADH,
                      Vezels_g : ingredient.Vezels_g,
                      Vezels_g_ADH: ingredient.Vezels_g_ADH,
                      A_mg : ingredient.A_mg,
                      A_mg_ADH: ingredient.A_mg_ADH,
                      B1_mg : ingredient.B1_mg,
                      B1_mg_ADH: ingredient.B1_mg_ADH,
                      B2_mg : ingredient.B2_mg,
                      B2_mg_ADH: ingredient.B2_mg_ADH,
                      B3_mg : ingredient.B3_mg,
                      B3_mg_ADH: ingredient.B3_mg_ADH,
                      B5_mg : ingredient.B5_mg,
                      B5_mg_ADH: ingredient.B5_mg_ADH,
                      B6_mg : ingredient.B6_mg,
                      B6_mg_ADH: ingredient.B6_mg_ADH,
                      B11_OR_Foliumzuur_ug :ingredient.B11_OR_Foliumzuur_ug ,
                      B11_OR_Foliumzuur_ug_ADH:ingredient.B11_OR_Foliumzuur_ug_ADH,
                      B12_ug : ingredient.B12_ug,
                      B12_ug_ADH: ingredient.B12_ug_ADH,
                      C_mg : ingredient.C_mg,
                      C_mg_ADH:ingredient.C_mg_ADH,
                      D_ug : ingredient.D_ug,
                      D_ug_ADH: ingredient.D_ug_ADH,
                      E_mg : ingredient.E_mg,
                      E_mg_ADH: ingredient.E_mg_ADH,
                      Vitamine_K_ug : ingredient.Vitamine_K_ug,
                      Vitamine_K_ug_ADH: ingredient.Vitamine_K_ug_ADH,
                      Natrium_mg : ingredient.Natrium_mg,
                      Natrium_mg_ADH: ingredient.Natrium_mg_ADH,
                      Kalium_mg : ingredient.Kalium_mg,
                      Kalium_mg_ADH: ingredient.Kalium_mg_ADH,
                      Calcium_mg : ingredient.Calcium_mg,
                      Calcium_mg_ADH: ingredient.Calcium_mg_ADH,
                      Fosfor_mg : ingredient.Fosfor_mg,
                      Fosfor_mg_ADH: ingredient.Fosfor_mg_ADH,
                      IJzer_mg : ingredient.IJzer_mg,
                      IJzer_mg_ADH: ingredient.IJzer_mg_ADH,
                      Jodium_ug : ingredient.Jodium_ug,
                      Jodium_ug_ADH: ingredient.Jodium_ug_ADH,
                      Magnesium_mg :ingredient.Magnesium_mg, 
                      Magnesium_mg_ADH: ingredient.Magnesium_mg_ADH,
                      Koper_mg : ingredient.Koper_mg,
                      Koper_mg_ADH: ingredient.Koper_mg_ADH,
                      Selenium_ug : ingredient.Selenium_ug,
                      Selenium_ug_ADH:ingredient.Selenium_ug_ADH,
                      Zink_mg : ingredient.Zink_mg,
                      Zink_mg_ADH: ingredient.Zink_mg_ADH,
                      Transvet_g : ingredient.Transvet_g,
                      Transvet_g_ADH: ingredient.Transvet_g_ADH,


                      // Bètacaroteen_ug : null,
                      // Bètacaroteen_ug_ADH: null,
                      // Luteïne + zeaxanthine_ug : null,
                      // Luteïne + zeaxanthine_ug_ADH: null,
                      // Cryptoxanthine_ug : null,
                      // Cryptoxanthine_ug_ADH: null,
                      // Choline_mg : null,
                      // Choline_mg_ADH: null,
                      // B11 / Foliumzuur_ug : null,
                      // B11 / Foliumzuur_ug_ADH: null,
                      // Lycopeen : null,
                      // Lycopeen_ADH: null,
                      // Bèta-caroteen : null,
                      // Bèta-caroteen_ADH: null,
                      // Luteïne : null,
                      // Luteïne_ADH: null,
                      // A / Retinol_mg : null,
                      // A / Retinol_mg_ADH: null,
                      // Beta-caroteen (µg) : null,
                      // Beta-caroteen (µg)_ADH: null,
                      // Alfa-caroteen (µg) : null,
                      // Alfa-caroteen (µg)_ADH: null,
                      // RAE (µg) : null,
                      // RAE (µg)_ADH: null,
                      // Retinol equivalenten (RE) (µg) : null,
                      // Retinol equivalenten (RE) (µg)_ADH: null,
                      // Bronnen: []'
        }
      })
    }
};


const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


Meteor.startup(() => {
  console.log("url is ", Meteor.absoluteUrl("Healthy-IFR"));
  

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ReceptenDB.find().count() === 0) {
    recipes.forEach(recept => insertRecept(recept));
  }
  if (IngredientenDB.find().count() === 0) {
    ingredienten.forEach(ingredient => insertIngredient(ingredient));
  }
});


