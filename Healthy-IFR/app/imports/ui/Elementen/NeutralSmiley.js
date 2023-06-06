import React from 'react';
import * as d3 from 'd3';

class HappySmiley extends React.Component {
    constructor(props){
        super(props);
        this.veryHappy = props.veryHappy
        this.idString = props.idString
        this.width = window.screen.width /5
        this.shared = props.shared

        this.smileyR = (this.width /2)  / this.shared
        this.eyesR = 0.04*this.width / this.shared
        this.eyesCX = 0.1*this.width / this.shared
        this.eyesCY = 0.20*this.width/ this.shared
        this.innerRadius = 0.15 *this.width/ this.shared
        this.outerRadius = 0.2 * this.width/ this.shared

        this.mouthY = 0.20*this.width/ this.shared
        this.mouthLeft = - 0.2*this.width / this.shared
        this.mouthRight = 0.2*this.width / this.shared
        this.mouthWidth = 5
    }
    componentDidMount(){

        var svgContainer = 
            d3.select("#" + this.idString)
            .append("svg")
            .attr("width", this.width/ this.shared)
            .attr("height", this.width/ this.shared);

        this.drawSmiley(svgContainer);




    }
    drawSmiley(svgContainer) {
        const g = svgContainer.append('g')  
            .attr('transform', `translate(${this.smileyR}, ${this.smileyR})`);
        
        const circle = g.append('circle') 
            .attr('r', this.smileyR)    
            .attr('fill', 'yellow')
            .attr('stroke', 'black')
        
        const leftEye = g.append('circle')
            .attr('r', this.eyesR)    
            .attr('cx', -this.eyesCX)     
            .attr('cy', -this.eyesCY)
            .attr('fill', 'black')
        
        const rightEye = g.append('circle')
            .attr('r', this.eyesR)    
            .attr('cx', this.eyesCX)     
            .attr('cy', -this.eyesCY)
            .attr('fill', 'black')
        
        let innerRadius = this.innerRadius;
        if (this.veryHappy) {
            innerRadius = 0;
        }
        // const mouth = g.append('path')
        //     .attr('d', d3.arc()({     
        //         innerRadius: innerRadius,
        //         outerRadius: this.outerRadius, 
        //         startAngle: Math.PI / 2, 
        //         endAngle: Math.PI * 3/2
        //     }))

        const mouth = g.append("line")          // attach a line
            .style("stroke", "black")  // colour the line
            .attr("x1", this.mouthLeft)     // x position of the first end of the line
            .attr("y1", this.mouthY)      // y position of the first end of the line
            .attr("x2", this.mouthRight)     // x position of the second end of the line
            .attr("y2", this.mouthY)
            .attr("stroke-width", this.mouthWidth)
    }


    render(){
        return (
            <div id={this.idString} className="test"></div>
    )}
 
}
export default HappySmiley;
