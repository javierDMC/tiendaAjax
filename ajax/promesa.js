//promeseando
// function getArticulos(){
//     return new Promise((resolve, reject) => {
//         xhr = new XMLHttpRequest();
//         xhr.open("GET","localhost:3000/articulos");
//         xhr.response = "JSON";
//         xhr.send();
//         xhr.onload = function(){
//             if (xhr.status == 200) {
//                 resolve(xhr.response);
//             } else {
//                 reject("ERROR " + xhr.status + " " + xhr.statusText);
//             }
//         }
//     })
// }

// getArticulos.then(d=>pintarTabla(d))
//             .catch(e=>console.log("Error"))