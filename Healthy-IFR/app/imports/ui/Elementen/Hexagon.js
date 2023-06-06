import React from 'react';
import * as d3 from 'd3';
import {recommendedMen, recommendedWomen, vegiFactors, calcOther} from './RecommendedAndLimitIntakes'
import { calcZScoresSufficientOfRecipe, calcHeuristics, giveHeuristicsMaxHexagon} from './HealthFunctions'


class Hexagon extends React.Component {
    constructor(props){
        super(props);

        this.rootURL = props.rootURL
        this.ingredient = props.ingredient

        this.idString = props.ingredient._id
        this.goToExplanationsPage = props.goToExplanationsPage
        this.width =  window.screen.width  < window.screen.height? 
                        window.screen.width/2  
                        : 
                        window.screen.height /2;
        
        if (this.width>540) {
            this.width = 540
        }

        this.centerX = (window.screen.width/2)
        if (this.centerX>540) {
            this.centerX = 0.7* 540
        }

        this.extraYOffset = 50
        this.centerY = (this.width/2) + this.extraYOffset

        this.isVegi = props.isVegi
        this.majority = props.majority

        this.offset = props.offset
    }
    componentDidMount(){

        // this.center = window.screen.width/2;
        // if (this.center > 400) {
        //     this.center = 400
        // }
        // this.width = 0.6 * this.center*2;

        var svgContainer = 
            d3.select("#dummy" + this.idString)
            .append("svg")
            .attr("width", window.screen.width)
            .attr("height",this.width + this.extraYOffset*2)
            .attr("transform", "translate("+ (-this.offset) + "," + 0 + ")");


        this.drawMaxHexagon(svgContainer);
        this.drawNutrientInformation(svgContainer);


    }

    // calcZScores(ingredient){
    //     // console.log("kc is ", ingredient.kcal)
    //     // https://web-s-ebscohost-com.kuleuven.e-bronnen.be/ehost/pdfviewer/pdfviewer?vid=0&sid=5d233075-4889-43b2-a5ad-d591b0c3d157%40redis 1/3
    //     // https://onlinelibrary.wiley.com/doi/epdf/10.1111/ecin.12069?saml_referrer 0-400 green 400-800 yellow
    //     // https://www.healthxchange.sg/food-nutrition/weight-management/eating-right-recommended-calorie-intake-healthier-alternatives#:~:text=Here%27s%20the%20recommended%20amount%20of,dinner%3A%20400%2D500%20calories%20each 400-500
    //     // https://globalnews.ca/news/3615212/this-is-what-your-breakfast-lunch-and-dinner-calories-actually-look-like/#:~:text=Although%20every%20person%27s%20daily%20caloric,each%20for%20lunch%20and%20dinner. 500-700

    //     //average meal 400g
    //     const maxScore = 0.99
    //     const avgMealWeigth_g = 400
    //     const avgMealWeigth_per100g = 400/100
    //     const refactorToDiner = 1/3.5
    //     const refactorToIngredientSize = {"Big": 1/3, "Medium":1/4, "Small": 1/6, "Tiny":1/10}
    //     let zScores = {}
    //     // https://newsinhealth.nih.gov/2011/12/weighing-dietary-fats#:~:text=Experts%20say%20that%20the%20total,calories%20from%20saturated%20fatty%20acids.
    //     // 20-35 % cal per dag moeten v vetten komen
    //     for (const [key, value_perDay] of Object.entries(recommendedMen)) {
    //         // zScores[key] = ingredient.nutrienten[key.slice(0, -4)] / (value * refactorToDiner *refactorToIngredientSize[ingredient.Amount] )

    //         //Influence of ingredient on diner -zegt weinig over hoe goed ingredienten zijn die in kleine hoeveelheid voorkomen
    //         // zScores[key] = (ingredient.nutrienten[key.slice(0, -4)]  * avgMealWeigth_per100g *refactorToIngredientSize[ingredient.Amount] ) 
    //         //                     / (value_perDay * refactorToDiner)
    //         zScores[key] = (ingredient.nutrienten[key.slice(0, -4)]  * avgMealWeigth_per100g ) 
    //                             / (value_perDay * refactorToDiner)
    //         if (zScores[key] > maxScore){
    //             zScores[key] = maxScore
    //         }

    //     }

    //     return zScores
    // }

    // calcHeuristics(zScores){
    //     let heuristics = {}

    //     heuristics["Vet"] = zScores["Vet_g_ADH"]?zScores["Vet_g_ADH"]:0

    //     let VitaminsAndMineralsLength = 0
    //     let VitaminsAndMineralsSum = 0
    //     const exclude  = ["kcal_ADH", "Koolhydraten_g_ADH", "Eiwit_g_ADH", "Kj_ADH", "Water_g_ADH", "Vet_kcal_ADH", "Vezels_g_ADH", "Vet_g_ADH"]
    //     for (let [key, value] of Object.entries(zScores)) {

    //         if (!exclude.includes(key)){
    //             console.log(`${key}: ${value}`);
    //             if (value){
    //                 VitaminsAndMineralsLength = VitaminsAndMineralsLength +1
    //                 VitaminsAndMineralsSum = VitaminsAndMineralsSum + value
    //             }

    //         }
    //     }
    //     console.log("VitaminsAndMineralsLength is ", VitaminsAndMineralsLength)
    //     console.log("VitaminsAndMineralsSum is ", VitaminsAndMineralsSum)
    //     console.log("div is ",  VitaminsAndMineralsSum / VitaminsAndMineralsLength)

    //     heuristics["Vitamines_&_Mineralen"] = (VitaminsAndMineralsSum / VitaminsAndMineralsLength) ? VitaminsAndMineralsSum / VitaminsAndMineralsLength:0
    //     heuristics["Koolhydraten"] = zScores["Koolhydraten_g_ADH"]? zScores["Koolhydraten_g_ADH"] : 0

    //     heuristics["Vezels"] = zScores["Vezels_g_ADH"]? zScores["Vezels_g_ADH"] : 0

    //     heuristics["Eiwitten"] = zScores["Eiwit_g_ADH"]? zScores["Eiwit_g_ADH"] : 0
    //     heuristics["Caloriën"] = zScores["kcal_ADH"]? zScores["kcal_ADH"] : 0


    //     console.log("heuristics is ", heuristics)
    //     return heuristics
    // }

    drawNutrientInformation(svgContainer){
        let genderRecommended = this.majority == "Man"? JSON.parse(JSON.stringify(recommendedMen)) : JSON.parse(JSON.stringify(recommendedWomen))
        genderRecommended = this.majority == "Andere"? calcOther(JSON.parse(JSON.stringify(recommendedMen)), JSON.parse(JSON.stringify(recommendedWomen))) : genderRecommended
        console.log("hier", genderRecommended.IJzer_mg_ADH);
        console.log("hier", recommendedMen.IJzer_mg_ADH);
        if (this.isVegi) {
            genderRecommended.IJzer_mg_ADH = genderRecommended.IJzer_mg_ADH * vegiFactors.iron
        }


        let zScores = calcZScoresSufficientOfRecipe(this.ingredient.nutrienten, genderRecommended)
        console.log("zscores ", zScores)
        let heuristics = calcHeuristics(zScores)
        console.log("heuristics ", heuristics)
        heuristics = giveHeuristicsMaxHexagon(heuristics)

        console.log("heuristics ", heuristics)

        var nmbPoints = 6

        // let zScores = this.calcZScores(this.ingredient)
        // console.log("zscores ", zScores)
        // let heuristics = this.calcHeuristics(zScores)
        // console.log("heuristics ", heuristics)



        var pointData = [];

        let index = -1 //To position hexagon text consistent with doughnut text
        for (let [key, value] of Object.entries(heuristics)) {

            let x = this.centerX +  value* (this.width/2) * (Math.cos(Math.PI*2/nmbPoints * index))
            let y = this.centerY +  value* (this.width/2) * (Math.sin(Math.PI*2/nmbPoints * index))
            pointData.push([x, y])
            let Dir = Math.PI*2/nmbPoints 

            // let xDir = (x-this.centerX)/Math.abs(x-this.centerX)
            // let yDir = (y-this.centerY)/(Math.abs(y-this.centerY) +0.000001)
            svgContainer.append("text")
            .text(key.replaceAll('_', ' '))
            .attr("x", this.centerX +  (this.width/2 +40) * (Math.cos(Math.PI*2/nmbPoints * index)) - key.length*3)
            .attr("y", this.centerY +  (this.width/2+40) * (Math.sin(Math.PI*2/nmbPoints * index))); 
            index ++
        }
        pointData.push(pointData[0])

        console.log(pointData)



        svgContainer.selectAll("path.area")
                    .data([pointData]).enter().append("path")
                    .attr("d", d3.line())
                    .attr("stroke", "blue")
                    .attr("stroke-width", 1)

                    .attr("fill", "#3CA4E9");

        svgContainer.append('circle')
                    .attr('cx', this.centerX)
                    .attr('cy', this.centerY)
                    .attr('r', 3)
                    .style('fill', "rgba(0,0,0,1)");
                
    }

    drawMaxHexagon(svgContainer){
        var nmbPoints = 6

        var pointData = [];
        for (let index = 0; index < nmbPoints; index++) {
            let x = this.centerX +  (this.width/2) * (Math.cos(Math.PI*2/nmbPoints * index))
            let y = this.centerY +  (this.width/2) * (Math.sin(Math.PI*2/nmbPoints * index))
            pointData.push([x, y])

        }
        pointData.push(pointData[0])
        console.log(pointData)




        svgContainer.selectAll("path.area")
                        .data([pointData]).enter().append("path")
                        .attr("d", d3.line())
                        .attr("fill", "rgba(230,230,230,1)")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)


    }

    render(){
        return (
            <div>
            <div className="question-container blue-question">
            <img  className='blue-question-img' src={this.rootURL + '/Images/question.png'} onClick={this.goToExplanationsPage}/>
            </div>
            <div id={"dummy" + this.idString} className="test"></div>
            </div>
    )}
 
}
export default Hexagon;

