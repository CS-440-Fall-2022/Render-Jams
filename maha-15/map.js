// function map_point(P, Q, A, B, X) {
//   let alpha;
//   if (A.type != "vec2" && A.type != "vec3" && A.type != "vec4") {
//     alpha = Math.abs(X - P) / Math.abs(Q - P);
//     return mix(B, A, alpha);
//     // return (1.0 - alpha) * B + alpha * A;
//   }

//   for (var i = 0; i < P.length; ++i)
//   {
//       if (P[i] != 0 | Q[i]!=0)
//       {
//           alpha = (X - P[i]) / (Q[i] - P[i]);
//           return mix(B, A, alpha);

//       }
//   }
// }
function map_point(P,Q,A,B,X)
{
    if (A.type != "vec2" && A.type != "vec3" && A.type != "vec4")
    {
        return (1.0 - ((Math.abs(X-P))/Math.abs(Q-P))) * B + ((Math.abs(X-P))/Math.abs(Q-P)) * A 
    }
    return mix( A, B,  ((length(subtract(P,X))))/ length(subtract(P,Q)))
}
// console.log(map_point( vec2(2,2), vec2(4,4), vec2(0,0), vec2(5,5), vec2(2.2,2.2)))
// alert(map_point( vec2(2,2), vec2(4,4), vec2(0,0), vec2(5,5), vec2(2.2,2.2)))
