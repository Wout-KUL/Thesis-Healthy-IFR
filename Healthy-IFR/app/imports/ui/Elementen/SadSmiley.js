import React from 'react';
import * as d3 from 'd3';

class SadSmiley extends React.Component {
    constructor(props){
        super(props);
        this.verySad = props.verySad
        this.idString = props.idString
        this.width = window.screen.width / 5
        this.shared = props.shared

        this.smileyR = (this.width /2)  / this.shared
        this.eyesR = 0.04*this.width / this.shared
        this.eyesCX = 0.1*this.width / this.shared
        this.eyesCY = 0.20*this.width/ this.shared
        this.mouthY = 0.35*this.width/ this.shared
        this.innerRadius = 0.15 *this.width/ this.shared
        this.outerRadius = 0.2 * this.width/ this.shared
    }
    componentDidMount(){


        var svgContainer = 
            d3.select("#" + this.idString)
            .append("svg")
            .attr("width", this.width / this.shared)
            .attr("height",this.width / this.shared);

        this.drawSmiley(svgContainer);


        // this.drawNutrientInformation(svgContainer);


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
        if (this.verySad) {
            innerRadius = 0;
        }

        const mouth = g.append('path')
            .attr('d', d3.arc()({     
                innerRadius: innerRadius,
                outerRadius: this.outerRadius , 
                startAngle: Math.PI *3/2, 
                endAngle: Math.PI * 5/2
            }))
            .attr("transform", "translate("+0 + "," + this.mouthY + ")")
            // .attr('transform', function(){
            //     var me = svg.node()
            //     var x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
            //     var y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate
            //     console.log(x1, y1)
            //     return `rotate(10, ${x1}, ${y1})`}); 
    }


    render(){
        return (
            <div id={this.idString} className="test"></div>
    )}
 
}
export default SadSmiley;
