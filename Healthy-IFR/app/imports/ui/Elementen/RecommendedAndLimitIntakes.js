export const refactoringValues = {
    refactorToDiner : 0.285,// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5746190/ 57% of calories lunch plus diner => 28.5% diner
    maxScoreDoughnut : 1.2,
    maxScoreHexagon : 0.99,
    refactorToIngredientSize : {Big: 1/3, Medium:1/4, Small: 1/6, Tiny:1/10},
}

export function calcOther(Man, Woman) {
    let other = {}
    for (let [key, value] of Object.entries(Man)) {
        other[key] = (value + Woman[key]) / 2
    }
    // console.log(Man)
    // console.log(Woman)

    // console.log(other)
    return other
}



export const recommendedMen = {
    kcal_ADH : 2500,  //https://www.nhlbi.nih.gov/health/educational/wecan/downloads/calreqtips.pdf somewhat active 19-30 31-50
    // Kj_ADH: 10878.4,
    Water_g_ADH: 3700,
    Eiwit_g_ADH: 56,
    Koolhydraten_g_ADH: 130,
    // Suiker_g_ADH: ingredient.Suiker_g_ADH,
    Vet_g_ADH: 59.25, //0.5-1 g/kg gem gezicht man belgie is 79kg vrouw is 66.7
    // Verzadigd_g_ADH: ingredient.Verzadigd_g_ADH,
    // EOV_g_ADH: ingredient.EOV_g_ADH,
    // MOV_g_ADH: ingredient.MOV_g_ADH,
    // Omega6_g_ADH: ingredient.Omega6_g_ADH,
    // Omega3_g_ADH: ingredient.Omega3_g_ADH,
    // Cholesterol_mg_ADH: ingredient.Cholesterol_mg_ADH,
    Vezels_g_ADH: 38,
    A_mg_ADH: 0.9,
    B1_mg_ADH: 1.2,
    B2_mg_ADH: 1.3,
    B3_mg_ADH: 16,
    B5_mg_ADH: 5,
    B6_mg_ADH: 1.3,
    // B11_OR_Foliumzuur_ug_ADH:ingredient.B11_OR_Foliumzuur_ug_ADH,
    B12_ug_ADH: 2.4,
    C_mg_ADH: 90,
    D_ug_ADH: 15,
    E_mg_ADH: 15,
    Vitamine_K_ug_ADH: 120,
    Natrium_mg_ADH: 1500,
    Kalium_mg_ADH: 3400,
    Calcium_mg_ADH: 1000,
    Fosfor_mg_ADH: 700,
    IJzer_mg_ADH: 8,
    Jodium_ug_ADH: 150,
    Magnesium_mg_ADH: 410,
    Koper_mg_ADH: 0.9,
    Selenium_ug_ADH: 55,
    Zink_mg_ADH: 11,
    // Transvet_g_ADH: ingredient.Transvet_g_ADH,


    // Bètacaroteen_ug : null,
    // Bètacaroteen_ug_ADH: null,
    // Luteïne + zeaxanthine_ug : null,
    // Luteïne + zeaxanthine_ug_ADH: null,
    // Cryptoxanthine_ug : null,
    // Cryptoxanthine_ug_ADH: null,
    // Choline_mg : null,
    // Choline_mg_ADH: null,550
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



// Recommended Dietary Allowances (RDA) in bold type and Adequate Intakes (AI) in ordinary type 

//https://www.ncbi.nlm.nih.gov/books/NBK56068/table/summarytables.t2/?report=objectonly
// Vitamin A(μg/d)a	
// Vitamin C(mg/d)	
// Vitamin D(μg/d)b,c	
// Vitamin E(mg/d)d	
// Vitamin K(μg/d)	
// Thiamin(mg/d)	= B1
// Riboflavin(mg/d)	=B2
// Niacin(mg/d)e	=B3
// Vitamin B6(mg/d)	
// Folate(μg/d)f	= B9
// Vitamin B12(μg/d)	
// Pantothenic Acid(mg/d)	=B5
// Biotin(μg/d)	=B7
// Choline (mg/d)g
// 900	90	15	15	120* 1.2	1.3	16	1.3	400	2.4	5*	30*	550*
// 700	75	15	15	90*	 1.1	1.1	14	1.3	400	2.4	5*	30*	425*

//https://www.ncbi.nlm.nih.gov/books/NBK545442/table/appJ_tab3/?report=objectonly
// Calcium (mg/d)	Chromium (μg/d)	Copper (μg/d)	Fluoride (mg/d)	Iodine (μg/d)	Iron (mg/d)	Magnesium (mg/d)	Manganese (mg/d)	Molybdenum (μg/d)	Phosphorus (mg/d)	Selenium (μg/d)	Zinc (mg/d)	Potassium (mg/d)	Sodium (mg/d)	Chloride (g/d)
// 1000	        35*	            900	            4*	            150	            8	        410	                2.3*	            45	                700	                55	            11	        3,400*	            1,500*	        2.3*                19-30 gem 31-50
// 1000	        25*	            900	            3*	            150	            18	        315	                1.8*	            45	                700	                55	            8	        2,600*	            1,500*	        2.3*                19-30 gem 31-50

// https://www.ncbi.nlm.nih.gov/books/NBK56068/table/summarytables.t4/?report=objectonly
// Total Water(L/d)	Carbohydrate(g/d)	Total Fiber(g/d)	Fat(g/d)	Linoleic Acid(g/d)	α-Linolenic Acid(g/d)	Protein(g/d)
// 3.7*	            130	                38*	                ND	        17*	                1.6*	                56
// 2.7*	            130	                25*	                ND	        12*	                1.1*	                46

export const recommendedWomen = {
    kcal_ADH: 2000, //https://www.nhlbi.nih.gov/health/educational/wecan/downloads/calreqtips.pdf
    // Kj_ADH: 8368,
    Water_g_ADH: 2700,
    Eiwit_g_ADH: 46,
    Koolhydraten_g_ADH: 130,
    // Suiker_g_ADH: ingredient.Suiker_g_ADH,
    Vet_g_ADH: 50.025, //0.5-1 g/kg gem gewicht man belgie is 79kg vrouw is 66.7
    // Verzadigd_g_ADH: ingredient.Verzadigd_g_ADH,
    // EOV_g_ADH: ingredient.EOV_g_ADH,
    // MOV_g_ADH: ingredient.MOV_g_ADH,
    // Omega6_g_ADH: ingredient.Omega6_g_ADH,
    // Omega3_g_ADH: ingredient.Omega3_g_ADH,
    // Cholesterol_mg_ADH: ingredient.Cholesterol_mg_ADH,
    Vezels_g_ADH: 25,
    A_mg_ADH: 0.7,
    B1_mg_ADH: 1.1,
    B2_mg_ADH: 1.1,
    B3_mg_ADH: 14,
    B5_mg_ADH: 5,
    B6_mg_ADH: 1.3,
    // B11_OR_Foliumzuur_ug_ADH:ingredient.B11_OR_Foliumzuur_ug_ADH,
    B12_ug_ADH: 2.4,
    C_mg_ADH:75,
    D_ug_ADH: 15,
    E_mg_ADH: 15,
    Vitamine_K_ug_ADH: 90,
    Natrium_mg_ADH: 1500,
    Kalium_mg_ADH: 2600,
    Calcium_mg_ADH: 1000,
    Fosfor_mg_ADH: 700,
    IJzer_mg_ADH: 18,
    Jodium_ug_ADH: 150,
    Magnesium_mg_ADH: 315,
    Koper_mg_ADH: 0.9,
    Selenium_ug_ADH: 55,
    Zink_mg_ADH: 8,
    // Transvet_g_ADH: ingredient.Transvet_g_ADH,


    // Bètacaroteen_ug : null,
    // Bètacaroteen_ug_ADH: null,
    // Luteïne + zeaxanthine_ug : null,
    // Luteïne + zeaxanthine_ug_ADH: null,
    // Cryptoxanthine_ug : null,
    // Cryptoxanthine_ug_ADH: null,
    // Choline_mg : null,
    // Choline_mg_ADH: null,425
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
// https://pubmed.ncbi.nlm.nih.gov/23512957/
// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5746190/ 57% of calories lunch plus diner => 28.5% diner

export const upperMen = {
    kcal_ADH: 3000, //enkel als heel actief
    // Kj_ADH: 8368,
    // Water_g_ADH: 2700,
    //https://pubmed.ncbi.nlm.nih.gov/26797090/#:~:text=Long%2Dterm%20consumption%20of%20protein,abnormalities%20and%20should%20be%20avoided.
    Eiwit_g_ADH: 158, //2*79
    // https://www.ncbi.nlm.nih.gov/books/NBK459280/#:~:text=Healthy%20adult%20diets%20should%20include,(17%20kJ%2Fg).
    // Koolhydraten_g_ADH: 300,
    // Suiker_g_ADH: ingredient.Suiker_g_ADH,
    // https://www.nhlbi.nih.gov/health/educational/wecan/portion/documents/PRACTICAL3.pdf
    Vet_g_ADH: 80,
    // Verzadigd_g_ADH: ingredient.Verzadigd_g_ADH,
    // EOV_g_ADH: ingredient.EOV_g_ADH,
    // MOV_g_ADH: ingredient.MOV_g_ADH,
    // Omega6_g_ADH: ingredient.Omega6_g_ADH,
    // Omega3_g_ADH: ingredient.Omega3_g_ADH,
    // Cholesterol_mg_ADH: ingredient.Cholesterol_mg_ADH,
    // Vezels_g_ADH: ingredient.Vezels_g_ADH,
    A_mg_ADH: 3,
    B1_mg_ADH: null,
    B2_mg_ADH: null,
    B3_mg_ADH: 35,
    B5_mg_ADH: null,
    B6_mg_ADH: 100,
    // B11_OR_Foliumzuur_ug_ADH:ingredient.B11_OR_Foliumzuur_ug_ADH,
    B12_ug_ADH: null,
    C_mg_ADH:2000,
    D_ug_ADH: 100,
    E_mg_ADH: 1000,
    Vitamine_K_ug_ADH: null,
    Natrium_mg_ADH: null,
    Kalium_mg_ADH: null,
    Calcium_mg_ADH: 2500,
    Fosfor_mg_ADH: 4000,
    IJzer_mg_ADH: 45,
    Jodium_ug_ADH: 1100,
    // Magnesium_mg_ADH: 350,
    Koper_mg_ADH: 10,
    Selenium_ug_ADH: 400,
    Zink_mg_ADH: 40,
    // Transvet_g_ADH: ingredient.Transvet_g_ADH,


    // Bètacaroteen_ug : null,
    // Bètacaroteen_ug_ADH: null,
    // Luteïne + zeaxanthine_ug : null,
    // Luteïne + zeaxanthine_ug_ADH: null,
    // Cryptoxanthine_ug : null,
    // Cryptoxanthine_ug_ADH: null,
    // Choline_mg : null,
    // Choline_mg_ADH: null,425
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

//https://www.ncbi.nlm.nih.gov/books/NBK56068/table/summarytables.t7/?report=objectonly
// Vitamin A (μg/d)a	Vitamin C (mg/d)	Vitamin D (μg/d)	Vitamin E (mg/d)b,c	Vitamin K	Thiamin	Riboflavin	Niacin (mg/d)c	Vitamin B6 (mg/d)	Folate (μg/d)c	Vitamin B12	Pantothenic Acid	Biotin	Choline (g/d)	Carotenoidsd
// 3,000	            2,000	            100	                1,000	            ND	        ND	    ND	        35	            100	                1,000	        ND	        ND	                ND	    3.5	            ND


//https://www.ncbi.nlm.nih.gov/books/NBK545442/table/appJ_tab9/?report=objectonly
// Arsenica	Boron (mg/d)	Calcium (mg/d)	Chromium	Copper (μg/d)	Fluoride (mg/d)	Iodine (μg/d)	Iron (mg/d)	Magnesium (mg/d)b	Manganese (mg/d)	Molybdenum (μg/d)	Nickel (mg/d)	Phosphorus (g/d)	Potassium	Selenium (μg/d)	Siliconc	Sulfate	Vanadium (mg/d)d	Zinc (mg/d)	Sodiume	Chloride (g/d)
// ND	        20	            2,500	        ND	        10,000	        10	            1,100	        45	        350	                11	                2,000	            1.0	            4	                NDh	        400	            ND	        ND	    1.8	                40	        NDh	    3.6

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3065764/ No tolerable upper intake level has been set for dietary fiber
//https://edis.ifas.ufl.edu/publication/FS243 There is no upper limit for carbohydrate intake.
export const upperWomen = {
    kcal_ADH: 2500, //enkel als heel actief
    // Kj_ADH: 8368,
    // Water_g_ADH: 2700,
    Eiwit_g_ADH: 133.4, //2*66.7
    // Koolhydraten_g_ADH: 130,
    // Suiker_g_ADH: ingredient.Suiker_g_ADH,
    Vet_g_ADH: 65,
    // Verzadigd_g_ADH: ingredient.Verzadigd_g_ADH,
    // EOV_g_ADH: ingredient.EOV_g_ADH,
    // MOV_g_ADH: ingredient.MOV_g_ADH,
    // Omega6_g_ADH: ingredient.Omega6_g_ADH,
    // Omega3_g_ADH: ingredient.Omega3_g_ADH,
    // Cholesterol_mg_ADH: ingredient.Cholesterol_mg_ADH,
    // Vezels_g_ADH: ingredient.Vezels_g_ADH,
    A_mg_ADH: 3,
    B1_mg_ADH: null,
    B2_mg_ADH: null,
    B3_mg_ADH: 35,
    B5_mg_ADH: null,
    B6_mg_ADH: 100,
    // B11_OR_Foliumzuur_ug_ADH:ingredient.B11_OR_Foliumzuur_ug_ADH,
    B12_ug_ADH: null,
    C_mg_ADH:2000,
    D_ug_ADH: 100,
    E_mg_ADH: 1000,
    Vitamine_K_ug_ADH: null,
    Natrium_mg_ADH: null,
    Kalium_mg_ADH: null,
    Calcium_mg_ADH: 2500,
    Fosfor_mg_ADH: 4000,
    IJzer_mg_ADH: 45,
    Jodium_ug_ADH: 1100,
    // Magnesium_mg_ADH: 350, //was van suplementen
    Koper_mg_ADH: 10,
    Selenium_ug_ADH: 400,
    Zink_mg_ADH: 40,
    // Transvet_g_ADH: ingredient.Transvet_g_ADH,


    // Bètacaroteen_ug : null,
    // Bètacaroteen_ug_ADH: null,
    // Luteïne + zeaxanthine_ug : null,
    // Luteïne + zeaxanthine_ug_ADH: null,
    // Cryptoxanthine_ug : null,
    // Cryptoxanthine_ug_ADH: null,
    // Choline_mg : null,
    // Choline_mg_ADH: null,425
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

// https://pubmed.ncbi.nlm.nih.gov/21139125/
// https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/#:~:text=The%20RDAs%20for%20vegetarians%20are,of%20nonheme%20iron%20%5B5%5D. iron 1.8
// https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/ zink https://pubmed.ncbi.nlm.nih.gov/24871479/#:~:text=The%20bioavailability%20of%20iron%20and,the%20absence%20of%20flesh%20foods.
// https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/ calcium 1 bioavaiablility normaal gewoon op letten
//https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/ vit D zelfde maar minder goede voedingsbronnen die het geven
//https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/ vit 12 zelfde maar minder goede voedingsbronnen die het geven
// https://pubmed.ncbi.nlm.nih.gov/25369930/ proteine 1

export const vegiFactors = {
    iron :1.8, 
    // zinc : 1.5 Te weinig betrouwbare bronnen
}