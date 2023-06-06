import React from 'react';
import * as d3 from 'd3';
import {calcZScoresToMuchOfRecipe, calcZScoresSufficientOfRecipe, sumTagNutritions, calcHeuristics, giveHeuristicsMax} from './HealthFunctions'
import {recommendedMen, upperMen, recommendedWomen, upperWomen, vegiFactors, calcOther} from './RecommendedAndLimitIntakes'
import { useOutletContext } from 'react-router-dom';


class Doughnut extends React.Component {
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
            d3.select("#dummy" + this.idString)
            .append("svg")
            .attr("width", window.screen.width )
            .attr("height",this.width)
            .attr("transform", "translate("+ (-this.offset) + "," + 0 + ")");


        this.drawMaxCircle(svgContainer);
        this.drawDoughnutHole(svgContainer);
        this.drawNutritions(svgContainer)
        // this.drawMaxCircleBorder(svgContainer);

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

    drawMaxCircleBorder(svgContainer){
        svgContainer
        .append('circle')
        // .attr('cx', '50%')
        // .attr('cy', '50%')
        .attr('cx', this.centerX)
        .attr('cy', this.centerY)
        .attr('r', this.outerRadius * this.width)
        .style('fill', "transparent")
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

    gradientColor(svgContainer, cx, cy, id, radius){
        console.log( radius)

        console.log( ( this.innerRadius*this.width  + (this.outerRadius*this.width - this.innerRadius*this.width)/2)  / radius)
        var gradient = svgContainer.append("svg:defs")
        .append("svg:radialGradient")
        .attr("id", id)
        .attr("cx", cx)
        .attr("cy", cy)
        // .attr("cx", "0.5")
        // .attr("cy", "0.5")
        .attr("r", ( this.innerRadius*this.width  + (this.outerRadius*this.width - this.innerRadius*this.width)/2)  / radius)
        // .attr("fx", "0.25")  
        // .attr("fy", "0.25")        
      
        // .attr("x1", "0%")
        // .attr("y1", "0%")
        // .attr("x2", "100%")
        // .attr("y2", "100%")
        // .attr("spreadMethod", "pad");
    
    // Define the gradient colors
    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "red")
        .attr("stop-opacity", 0.95);
    
    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "green")
        .attr("stop-opacity", 0.95);
    }

    drawNutritions(svgContainer){

    //     <defs>
    //     <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
    //       <stop offset="0%" stop-color="red" />
    //       <stop offset="100%" stop-color="blue" />
    //     </radialGradient>
    //   </defs>

        let genderRecommended = this.majority == "Man"? JSON.parse(JSON.stringify(recommendedMen)) : JSON.parse(JSON.stringify(recommendedWomen))
        genderRecommended = this.majority == "Andere"? calcOther(JSON.parse(JSON.stringify(recommendedMen)), JSON.parse(JSON.stringify(recommendedWomen))) : genderRecommended
        
        let genderUpper = this.majority == "Man"? JSON.parse(JSON.stringify(upperMen)) : JSON.parse(JSON.stringify(upperWomen))
        genderUpper = this.majority == "Andere"? calcOther(JSON.parse(JSON.stringify(upperMen)), JSON.parse(JSON.stringify(upperWomen))) : genderUpper

        console.log("hier", genderRecommended.IJzer_mg_ADH);
        console.log("hier", recommendedMen.IJzer_mg_ADH);
        if (this.isVegi) {
            genderRecommended.IJzer_mg_ADH = genderRecommended.IJzer_mg_ADH * vegiFactors.iron
        }

        let summedNutritions = sumTagNutritions(this.recept, this.alleIngredienten)
        console.log("nutri ",summedNutritions)

        
        let zScoresSufficient = calcZScoresSufficientOfRecipe(summedNutritions, genderRecommended)
        console.log("zScoresSufficient is ",zScoresSufficient)
        let heuristicsSufficient = calcHeuristics(zScoresSufficient)
        console.log("heuristicsSufficient is ",heuristicsSufficient)




        let zScoresToMuch = calcZScoresToMuchOfRecipe(summedNutritions, genderRecommended, genderUpper)
        console.log("zScoresToMuch ",zScoresToMuch)
        let heuristicsToMuch = calcHeuristics(zScoresToMuch)
        console.log("heuristicsToMuch is ",heuristicsToMuch)

        heuristicsSufficient = giveHeuristicsMax(heuristicsSufficient)
        heuristicsToMuch = giveHeuristicsMax(heuristicsToMuch)
        let nmbPoints = Object.keys(heuristicsSufficient).length


        



        // for (let index = 0; index < nmbPoints; index++) {
        let index = 0
        for (let [key, value] of Object.entries(heuristicsSufficient)) {
            let radius = this.calcRadius(value, heuristicsToMuch[key])
            // let radius = value * this.width /2;
            // let color = "green";
            let color = "#1976D2"
            let opacity = 0.97
            // opacity = 1
            if (radius < this.innerRadius * this.width || radius > this.outerRadius * this.width ) {
                // color = "red";
                color = "#6DCCF2"
                // color = "#5AA0CF"
                color = "#87B5E3"
                // opacity = 0.70

            }
            // if (radius > 0.95 * window.screen.width/2 ) {
            //     radius =  0.95 * window.screen.width/2;
            // }
            if (radius > 1.2 * this.width * this.outerRadius ) {
                radius =  1.2 * this.width * this.outerRadius;
            }
            let startAngle = 2*Math.PI/nmbPoints *index
            let endAngle = 2*Math.PI/nmbPoints *index +  2*Math.PI/nmbPoints

            let Dir = (endAngle - startAngle) / 2 + startAngle +9/6*Math.PI 
            let xDir = Math.cos(Dir)
            let yDir = Math.sin(Dir)
            this.gradientColor(svgContainer, xDir.toFixed(2)>0? 0:1, yDir.toFixed(2)>0.1?0: yDir.toFixed(2)==0?0.5:1, "gradient" + index, radius)
            console.log(key,xDir>0? 0:1,   yDir>0?0: yDir.toFixed(2)==0.00?0.5:1, "gradient" + index, radius);

            // var color = d3.scaleLinear()
            // .domain([0, (this.innerRadius  + (this.outerRadius - this.innerRadius)/2) /this.innerRadius  ])
            // .range(["red", "green"]);
            
            // console.log(color);

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
            // .attr('fill', "url(#gradient" + index + ")")
            // .attr("fill", function(d){ return color(d)});
            .attr('fill', color)
            .attr("opacity", opacity);


            // let xDir = Math.cos(Dir) / (Math.abs(Math.cos(Dir)))
            // let yDir = Math.sin(Dir) /  (Math.abs(Math.sin(Dir)))
            // let xDir = Math.cos(Dir)
            // let yDir = Math.sin(Dir)
 
            // console.log(Dir);
            // console.log(xDir);
            // console.log(yDir);
            // console.log(this.width);
            // console.log("x is " , this.width * xDir);
            // console.log(this.width * yDir);

            if(key == "Vitamines_&_Mineralen"){
                key = "Vit._&_Min."
            }

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
                </div>
                <div id={"dummy" + this.idString} className="test"></div>
            </div>
    )}
 
}
export default Doughnut;
