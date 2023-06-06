import React from 'react';
import * as d3 from 'd3';
import {recommendedMen, recommendedWomen, vegiFactors, calcOther} from './RecommendedAndLimitIntakes'
import { calcZScoresSufficientOfRecipeVitMin, calcHeuristicsVitMin, giveHeuristicsMaxHexagon} from './HealthFunctions'


class HexagonVitMin extends React.Component {
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
            d3.select("#dummy" + "VitMin" + this.idString)
            .append("svg")
            .attr("width", window.screen.width)
            .attr("height",this.width + this.extraYOffset*2)
            .attr("transform", "translate("+ (-this.offset) + "," + 0 + ")");


        this.drawMaxHexagon(svgContainer);
        this.drawNutrientInformation(svgContainer);


    }

    drawNutrientInformation(svgContainer){
        let genderRecommended = this.majority == "Man"? JSON.parse(JSON.stringify(recommendedMen)) : JSON.parse(JSON.stringify(recommendedWomen))
        genderRecommended = this.majority == "Andere"? calcOther(JSON.parse(JSON.stringify(recommendedMen)), JSON.parse(JSON.stringify(recommendedWomen))) : genderRecommended

        console.log("hier", genderRecommended.IJzer_mg_ADH);
        console.log("hier", recommendedMen.IJzer_mg_ADH);
        if (this.isVegi) {
            genderRecommended.IJzer_mg_ADH = genderRecommended.IJzer_mg_ADH * vegiFactors.iron
        }

        var nmbPoints = 7

        let zScores = calcZScoresSufficientOfRecipeVitMin(this.ingredient.nutrienten, genderRecommended)
        console.log("zscores ", zScores)
        let heuristics = calcHeuristicsVitMin(zScores)
        console.log("heuristics ", heuristics)
        heuristics = giveHeuristicsMaxHexagon(heuristics)

        console.log("heuristics ", heuristics)


        var pointData = [];
        let index = -1
        for (let [key, value] of Object.entries(heuristics)) {

            let x = this.centerX +  value* (this.width/2) * (Math.cos(Math.PI*2/nmbPoints * index))
            let y = this.centerY +  value* (this.width/2) * (Math.sin(Math.PI*2/nmbPoints * index))
            pointData.push([x, y])


            // let xDir = (x-this.center)/Math.abs(x-this.center +0.000001)
            // let yDir = (y-this.center)/(Math.abs(y-this.center) +0.000001) 
            
            // console.log(xDir, yDir);

            // let Dir = Math.PI*2/nmbPoints 
            // let xDir = Math.cos(Dir) / (Math.abs(Math.cos(Dir)))
            // let yDir = Math.sin(Dir) /  (Math.abs(Math.sin(Dir)))
            // let xDir = Math.cos(Dir)
            // let yDir = Math.sin(Dir)

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
        var nmbPoints = 7

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
            {/* <span >ReceptenGeschiedenis</span> */}
        </div>
            <div id={"dummy" + "VitMin" + this.idString} className="test"></div>
            </div>
    )}
 
}
export default HexagonVitMin;

