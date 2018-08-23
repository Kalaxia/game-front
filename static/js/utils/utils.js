
class Utils {
	
	static drawLine (NodeStart, NodeEnd, lineNode){ 
		// Draw a line between two points and a given div which will be transform
		var PosStartCenter = [NodeStart.left + NodeStart.width/2 + NodeStart.style.borderWidth, NodeStart.top + NodeStart.height/2 + NodeStart.style.borderWidth ];
		var PosEndCenter = [NodeEnd.left + NodeEnd.width/2 + NodeEnd.style.borderWidth, NodeEnd.top + NodeEnd.height/2 + NodeEnd.style.borderWidth ];
		
		var angle = Math.atan2(PosEndCenter[1] - PosStartCenter[1], PosEndCenter[0] - PosStartCenter[0]);
		var distance = Math.pow(Math.pow(PosStartCenter[0]-PosEndCenter[0],2.) + Math.pow(PosStartCenter[1]-PosEndCenter[1],2.), 0.5);
		
		lineNode.css('transform', 'rotate(' + angle*180/Math.PI + 'deg)');
		
		lineNode.css('width', distance + 'px');
		
		if(PosEndCenter[0] < PosStartCenter[0]) {
    		lineNode.offset({ top:  NodeEnd.top + PosStartCenter[1] - lineNode.height*Math.cos(angle), left: NodeEnd.left + PosEndCenter[0] - lineNode.height*Math.sin(angle) });
  		} 
		else {
    		lineNode.offset({ top: NodeStart.top + PosStartCenter[1] - lineNode.height*Math.cos(angle), left: NodeStart.left + PosStartCenter[0] - lineNode.height*Math.sin(angle) });
  		}
	}
	
}

export default Utils;
