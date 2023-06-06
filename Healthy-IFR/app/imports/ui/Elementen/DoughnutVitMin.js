import React from 'react';
import * as d3 from 'd3';
import {calcZScoresToMuchOfRecipeVitMin, calcZScoresSufficientOfRecipeVitMin, calcHeuristicsVitMin,  sumTagNutritions, giveHeuristicsMax} from './HealthFunctions'
import {recommendedMen, upperMen, recommendedWomen, upperWomen, vegiFactors, calcOther} from './RecommendedAndLimitIntakes'


// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8746448/
class DoughnutVitMin extends React.Component {
    constructor(props){
        super(props);

        this.rootURL = props.rootURL
        this.recept = props.recept
        this.innerRadius = 2/16
        this.outerRadius = 4/16
        this.width =  window.screen.width / props.shared < window.screen.height / props.shared? 
                                 window.screen.width / props.shared 
                                : 
                                 window.screen.height / props.shared;
        if (this.width>540) {
            this.width = 540
        }
        this.centerX = (window.screen.width/2) / props.shared
        if (this.centerX>540) {
            this.centerX = 0.7* 540
        }
        this.centerY = (this.width/2)
        this.shared = props.shared
        this.idString = props.idString
        this.alleIngredienten = props.alleIngredienten
        this.goToExplanationsPage = props.goToExplanationsPage
        this.isVegi = props.isVegi
        this.majority = props.majority
        this.offset= props.offset





        // this.ingredientNames = props.alleIngredienten.map(ingredient => ingredient.naam)
        // console.log(this.center)
        // console.log(this.width)


        
    }
    componentDidMount(){


        // this.center = window.screen.width/2;
        // if (this.center > 400) {
        //     this.center = 400
        // }
        // this.width = 0.6 * this.center*2 / this.shared;

        var svgContainer = 
            d3.select("#dummy" + "VitMin" +  this.idString)
            .append("svg")
            .attr("width", window.screen.width )
            .attr("height",this.width)
            .attr("transform", "translate("+ (-this.offset) + "," + 0 + ")");



        this.drawMaxCircle(svgContainer);
        this.drawDoughnutHole(svgContainer);
        this.drawNutritions(svgContainer)

        // this.drawNutrientInformation(svgContainer);


    }

    drawMaxCircle(svgContainer){
        svgContainer
        .append('circle')
        // .attr('cx', '50%')
        // .attr('cy', '50%')
        .attr('cx', this.centerX)
        .attr('cy', this.centerY)
        .attr('r', this.outerRadius * this.width)
        .style('fill', "rgba(230,230,230,1)")
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    
    }

    drawDoughnutHole(svgContainer){
        svgContainer
        .append('circle')
        .attr('cx', this.centerX)
        .attr('cy', this.centerY)
        .attr('r', this.innerRadius * this.width)
        .style('fill', "rgba(255,255,255,1)")
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    
    }



    calcRadius(zScoreSufficient, zScoreToMuch){
        if (zScoreSufficient < 1){
            return this.width * this.innerRadius * zScoreSufficient
        }
        else{
            //sommige nutrienten hebben snel voldoende maar pas heel traag te veel => lijjkt alsof goede maaltijden maar net genoeg hebben
            let  estimatedRadiusBasedOnUpperLimits = this.width * this.innerRadius + 5  + (-5 +this.width * this.outerRadius - this.width * this.innerRadius)* zScoreToMuch
            if (zScoreSufficient > 0 && zScoreToMuch<0){
                //omdat niet alle upper limits gekend zijn, kan de z score van de doughnut negatief zijn terwijl de z score van het doughnutgat positief is
                estimatedRadiusBasedOnUpperLimits = this.width * this.innerRadius * zScoreSufficient
            }
            return estimatedRadiusBasedOnUpperLimits
        }
    }

    drawNutritions(svgContainer){
        let genderRecommended = this.majority == "Man"? JSON.parse(JSON.stringify(recommendedMen)) : JSON.parse(JSON.stringify(recommendedWomen))
        genderRecommended = this.majority == "Andere"? calcOther(JSON.parse(JSON.stringify(recommendedMen)), JSON.parse(JSON.stringify(recommendedWomen))) : genderRecommended
        
        let genderUpper = this.majority == "Man"? JSON.parse(JSON.stringify(upperMen)) : JSON.parse(JSON.stringify(upperWomen))
        genderUpper = this.majority == "Andere"? calcOther(JSON.parse(JSON.stringify(upperMen)), JSON.parse(JSON.stringify(upperWomen))) : genderUpper

        console.log("hier", genderRecommended.IJzer_mg_ADH);
        console.log("hier", recommendedMen.IJzer_mg_ADH);

        if (this.isVegi) {
            genderRecommended.IJzer_mg_ADH = genderRecommended.IJzer_mg_ADH * vegiFactors.iron
        }
        console.log("hier", genderRecommended.IJzer_mg_ADH);

        let summedNutritions = sumTagNutritions(this.recept, this.alleIngredienten)
        console.log("nutri ",summedNutritions)

        
        let zScoresSufficient = calcZScoresSufficientOfRecipeVitMin(summedNutritions, genderRecommended)
        console.log("zScoresSufficient is ",zScoresSufficient)
        let heuristicsSufficient = calcHeuristicsVitMin(zScoresSufficient)
        console.log("heuristicsSufficient is ",heuristicsSufficient)




        let zScoresToMuch = calcZScoresToMuchOfRecipeVitMin(summedNutritions, genderRecommended, genderUpper)
        console.log("zScoresToMuch ",zScoresToMuch)
        let heuristicsToMuch = calcHeuristicsVitMin(zScoresToMuch)
        console.log("heuristicsToMuch is ",heuristicsToMuch)

        heuristicsSufficient = giveHeuristicsMax(heuristicsSufficient)
        heuristicsToMuch = giveHeuristicsMax(heuristicsToMuch)
        let nmbPoints = Object.keys(heuristicsSufficient).length
 

        let index = 0
        for (let [key, value] of Object.entries(heuristicsSufficient)) {
            let radius = this.calcRadius(value, heuristicsToMuch[key])

            let color = "#1976D2"
            let opacity = 0.97
     
            // let color = "green";
            if (radius < this.innerRadius * this.width || radius > this.outerRadius * this.width ) {
                // color = "red";
                color = "#87B5E3"

            }
            if (radius > 1.2 * this.width * this.outerRadius ) {
                radius =  1.2 * this.width * this.outerRadius;
            }
            let startAngle = 2*Math.PI/nmbPoints *index
            let endAngle = 2*Math.PI/nmbPoints *index +  2*Math.PI/nmbPoints
            svgContainer
            .append("path")
            .attr("transform", "translate("+this.centerX + "," + this.centerY + ")")
            .attr("d", d3.arc()
                .innerRadius( 0 )
                .outerRadius( radius )
                .startAngle( startAngle )     // It's in radian, so Pi = 3.14 = bottom.
                .endAngle(endAngle )       // 2*Pi = 6.28 = top
                )
            .attr('stroke', 'black')
            .attr('fill', color)
            .attr("opacity", opacity);


            let Dir = (endAngle - startAngle) / 2 + startAngle +9/6*Math.PI 
            let xDir = Math.cos(Dir)
            let yDir = Math.sin(Dir)
 

            svgContainer.append("text")
            .text(key.replaceAll('_', ' '))
            .attr("x", this.centerX + (this.width + 170/this.shared) * this.outerRadius * xDir- key.length*3)
            .attr("y", this.centerY +(this.width + 170/this.shared) * this.outerRadius*yDir + 3)
            .style("font-size", 16/this.shared + "px")

            index ++
        }

    }


    render(){
        return (
            <div>
            <div className="question-container blue-question">
            <img className='blue-question-img' src={this.rootURL + '/Images/question.png'} onClick={this.goToExplanationsPage}/>
            {/* <span >ReceptenGeschiedenis</span> */}
        </div>
            <div id={"dummy" + "VitMin" +  this.idString} className="test"></div>
            </div>
    )}
 
}

export function lala(){
    return "test"
}

export default DoughnutVitMin;
