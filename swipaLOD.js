var svg, point, canvas, nodes, edges;
var Xsample, Ysample, Xrt, Yrt;
const svgNS="http://www.w3.org/2000/svg";
function createElm(tagName){ return document.createElementNS(svgNS,tagName); }
const no=0, a=1, to=2, b=3;
var TP=[], phase=no, hotTe=null; // ToDo: hotTe doesn't know current triple and place in it. change that to allow TABbing through it
var typingTe=null; // TP=triple,Te=TextElement
const mp3=["","StartScratch.mp3","pewpew.mp3","LetGo.mp3"];
const fVoiceIn=[null,new Audio(mp3[a]),new Audio(mp3[to]),new Audio(mp3[b])];
const fHeard=["","scratch","pew","ploop"];
var count=0;

function createNode(evt){
    var N;
    point.x=evt.clientX;
    point.y=evt.clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    N=createElm("text");
    N.setAttribute("class","node");
    N.setAttribute("x",Math.round(point.x));
    N.setAttribute("y",Math.round(point.y));
    N.setAttribute("onmousedown" ,"nodeDown(evt)");
    N.setAttribute("onmouseup"   ,"nodeUp(evt)");
    N.setAttribute("onmouseout"  ,"nodeOut(evt)");
    N.setAttribute("onmouseenter","nodeIn(evt)");
    N.textContent="...";
    return N;
}
function createEdge(evt){
    var Le,Te,Ge;
    point.x=evt.clientX;
    point.y=evt.clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    Le=createElm("line");
    Le.setAttribute("x1",Math.round(point.x));
    Le.setAttribute("y1",Math.round(point.y));
    Le.setAttribute("marker-end","url(#arrow)");
    Te=createElm("text");
    Te.setAttribute("class","edge");
    Te.setAttribute("onmousedown","edgeDown(evt)");
    Te.setAttribute("onmouseup"  ,"edgeUp(evt)");
    Te.textContent="...";
    Ge=createElm("g");
    Ge.appendChild(Le);
    Ge.appendChild(Te);
    return Ge;
}
function updateEdge(evt){
    var Le,Te, x1,y1 , x2,y2 ;
    point.x = evt.clientX;
    point.y = evt.clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    x2=Math.round(point.x);
    y2=Math.round(point.y);
    Le=TP[to].getElementsByTagName("line")[0];
    Te=TP[to].getElementsByTagName("text")[0];
    x1=Le.getAttribute("x1");
    y1=Le.getAttribute("y1");
    Le.setAttribute("x2",x2);
    Le.setAttribute("y2",y2);
    Te.setAttribute("x",Math.round((parseInt(x1)+x2)/2));
    Te.setAttribute("y",Math.round((parseInt(y1)+y2)/2));
}
function resetTP(){
    TP[no]=null;
    TP[a]=null;
    TP[to]=null;
    TP[b]=null;
}
function KBoverride(evt){
    if (hotTe!==null){
        typingTe=hotTe;
        typingTe.textContent="";
        hotTe=null;
    }
    typingTe.textContent+=evt.key; // ToDo: error on empty canvas
}
function pickFound(Te,log){ // ToDo: on tspan?
    console.log("picked one from list of found "+log);
    hotTe=Te; // TODO: only when clicking 1st in list
}
// === UPDATE ELEMENTS ======================
function setContent(elm,str) {elm.textContent=str;} // TODO: reset found list
function textUpdateLater(i,str){
    var Te;
    if(i!==no){
        Te=TP[i];
        if (str==="") {str=(count++)+fHeard[i];}
        if (Te.nodeName.toLowerCase()!=="text") {Te=Te.getElementsByTagName("text")[0];}
        setTimeout(setContent,700,Te,str); // TODO: have more realistic faked hearing
        hotTe=Te; // TODO: start searching and add below, make it many tspan's in 
    }
}
function listen(next){
    if (phase===no) {resetTP();}
    else {textUpdateLater(phase,"");}
    phase=next;
    if (phase!==no) {fVoiceIn[phase].play();}  // TODO: have more realistic faked audio
}
/*1-2--3-0  crA+Ta+La  Ta     la+++++++cr2*T2+L2 arrow *+l2+crB+Tb+Lb Tb       lb
==========================================================================================================
0-A------0 (canvasDown--------AnodeUp)
0-a-TO-b-0             AnDown----(A.nodeOut#####-~mv~~----------------BnodeIn)               - BnUp / nOut-cUp
0-A-TO-b-0 (canvasDown--------AnodeOut##########-~mv~~----------------BnodeIn)               - BnUp / nOut-cUp
0-a-TO-B-0             AnDown----(A.nodeOut#####-~mv~~---canvasStop##----------(BnUp/BnOut)) -   0 / cUp
0-A-TO-B-0 (canvasDown--------AnodeOut##########-~mv~~---canvasStop##----------(BnUp/BnOut)) -   0 / cUp
==========================================================================================================
pickF_node             AnDown AnodeUp
pickF_edge 2.edgeDown                                     edgeUp */
                                                                                function fPad(func,e){
																					e.preventDefault();
                                                                                    func(e);
																					e.stopPropagation();
																				}
function _canvasUp(evt){
    if (phase===to){
        TP[b]=createNode(evt);
        nodes.appendChild(TP[b]);
		listen(b);
		setTimeout(listen,1000,b);
    }
}
                                                                                function canvasUp(evt) {evt.preventDefault();
                                                                                    _canvasUp(evt);
                                                                                evt.stopPropagation();}
function _canvasDown(evt){
    listen(a);
    TP[a]=createNode(evt);
    nodes.appendChild(TP[a]);
}
//                                                                                function canvasDown(evt) {fPad(_canvasDown);}
                                                                                function canvasDown(evt) {evt.preventDefault();
                                                                                    _canvasDown(evt);                                                                                
                                                                                evt.stopPropagation();}
function _nodeDown(evt){
    TP[a]=evt.target;
}
                                                                                function nodeDown(evt) {evt.preventDefault();
                                                                                    _nodeDown(evt);
                                                                                evt.stopPropagation();}
function _edgeDown(evt){
}
                                                                                function edgeDown(evt) {evt.preventDefault();
                                                                                    _edgeDown(evt);
                                                                                evt.stopPropagation();}
function _nodeUp(evt){
    if ((evt.target===TP[a])&&(phase===no)) {pickFound(evt.target,"nodes");}
    else {listen(no);}
}
                                                                                function nodeUp(evt) {evt.preventDefault();
                                                                                    _nodeUp(evt);
                                                                                evt.stopPropagation();}
function _nodeOut(evt){
    if ((evt.buttons===1)&&(evt.target===TP[a])){
		listen(to);
		TP[to]=createEdge(evt);
		edges.append(TP[to]);
    }
    if(evt.target===TP[b]) {listen(no);} // ToDo: this should also be called after a while of silence
}
                                                                                function nodeOut(evt) {evt.preventDefault();
                                                                                    _nodeOut(evt);
                                                                                evt.stopPropagation();}
function _nodeIn(evt){
    var node=evt.target;
    if ((evt.buttons===1)&&(evt.target!==TP[a])){
        if (phase!==b){
            TP[b]=node;
            listen(no);
        }
    }
}
                                                                                function nodeIn(evt) {evt.preventDefault();
                                                                                    _nodeIn(evt);
                                                                                evt.stopPropagation();}
function _canvasMove(evt){
    if (phase===to){
        updateEdge(evt);
    }
}
                                                                                function canvasMove(evt) {evt.preventDefault();
                                                                                    _canvasMove(evt);
                                                                                evt.stopPropagation();}
function _edgeUp(evt){
    hotTe=evt.target;
    pickFound(evt.target,"edges");
}
                                                                                function edgeUp(evt) {evt.preventDefault();
                                                                                    _edgeUp(evt);
                                                                                evt.stopPropagation();}
// ########  INIT  #######################################
function EbyId(id){ return document.getElementById(id); }
function init(evt){
    svg   =EbyId("svg");
    canvas=EbyId("canvas");
    nodes =EbyId("nodes");
    edges =EbyId("edges");
    point = svg.createSVGPoint();
    window.addEventListener("keypress", KBoverride);
    resetTP();
	
	// ToDo: use (shift)TAB to loop through latest Triple elements
}