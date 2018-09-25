
class Utils {
	
	constructor(){
		
	}
	
	static drawLine (NodeStart, NodeEnd, lineNode){ 
		// Draw a line between two points and a given div which will be transform
		var PosStartCenter = [NodeStart.left + NodeStart.width/2 + NodeStart.style.borderWidth, NodeStart.top + NodeStart.height/2 + NodeStart.style.borderWidth ];
		var PosEndCenter = [NodeEnd.left + NodeEnd.width/2 + NodeEnd.style.borderWidth, NodeEnd.top + NodeEnd.height/2 + NodeEnd.style.borderWidth ];
		
		return Utils.drawLinePosition (PosStartCenter,PosEndCenter, lineNode);
	}
	
	static drawLinePosition (PosStartCenter,PosEndCenter, lineNode){
		// Draw line between two position
		var angle = Math.atan2(PosEndCenter[1] - PosStartCenter[1], PosEndCenter[0] - PosStartCenter[0]);
		var distance = Math.pow(Math.pow(PosStartCenter[0]-PosEndCenter[0],2.0) + Math.pow(PosStartCenter[1]-PosEndCenter[1],2.0), 0.5);
		
		lineNode.style.transform = `rotate(${Utils.angleRadToDeg(angle)}deg)`;
		
		lineNode.style.width = distance + 'px';
		if (lineNode.style.height == ""){
			lineNode.style.height = 8+"px"; // this is what is defined in the css but at the time of the execution this is undefined
		}
		
		lineNode.style.top = (PosStartCenter[1]+PosEndCenter[1])/2 - parseInt(lineNode.style.height)/2+ "px";
		lineNode.style.left = (PosStartCenter[0]+PosEndCenter[0])/2 - parseInt(lineNode.style.width)/2 + "px";
		
		return lineNode;
	}
	
	static angleRadToDeg (angle) {
		// convert angle from radian to degree
		return angle*180/Math.PI;
	}
}

export default Utils;
