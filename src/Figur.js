import React from 'react';
export function Figur(props) {
    return (<svg width="50" height="60" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(0.4)">
            <path stroke="#000" id="svg_2" d="m35.656537,144.628765c-5.040612,1.192835 -8.927045,-6.789081 -2.677031,-7.657376c5.499756,0.109546 -1.367755,-5.673337 3.596445,-7.621313c5.710154,-5.870561 11.37392,-11.992479 15.03341,-19.548688c-1.843831,-2.575478 -4.886873,-5.03615 -4.489256,-8.560295c3.58918,-1.287359 8.936022,-0.41482 9.148628,-6.383134c3.263968,-10.772194 4.134543,-22.161649 4.850022,-33.381962c-3.602047,-3.008049 -11.01954,-0.158432 -16.053465,-1.6906c-7.636643,-2.171829 2.847697,-6.329909 6.210647,-5.987319c3.021748,0.004776 7.496195,-1.957058 2.438533,-3.45643c4.266482,-0.207408 10.40293,-5.908452 3.386764,-7.963467c5.201643,-3.934108 1.193461,-12.4953 -0.978426,-17.418766c-3.274158,-5.945326 -8.658135,-10.25118 -14.743558,-12.547248c-0.985249,-6.062663 8.397983,-4.270759 12.203884,-4.585381c5.762915,0.231563 11.639323,-0.072553 16.660268,-3.377938c6.78392,-3.30652 12.551089,2.211903 18.756819,3.378432c6.277041,0.425853 12.80655,-1.189635 18.91849,0.683785c1.893779,1.419105 5.042104,3.660548 1.250431,4.73625c-7.241405,4.246257 -14.004013,10.519185 -15.819284,19.42998c-2.738575,4.956842 2.116147,9.258014 -2.322696,12.812809c-0.04619,4.182435 10.300794,4.766891 4.508536,6.826444c3.969618,2.26717 12.4831,0.837151 13.351827,5.87257c-3.603656,2.986372 -8.657117,1.807822 -12.974981,2.086619c-1.4642,0.525586 -5.143632,-1.282441 -4.583515,1.375574c-0.2869,11.910616 2.649625,23.621696 5.489499,35.052451c0.003623,5.600286 13.112392,2.424956 5.82605,8.781114c-5.382179,4.881208 2.508843,11.71918 5.242583,16.061005c3.71852,4.762874 10.319168,7.173697 9.768249,14.164982c3.787784,0.287262 8.293178,6.499891 3.056171,8.047869c-28.343076,0.626425 -56.707451,1.057657 -85.055056,0.870032l0.000014,0z" strokeOpacity="null" strokeWidth="1.5" fill={props.farbe} />
        </g>
    </svg>);
}
