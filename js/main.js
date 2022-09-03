import { newNode } from "./library.js";

const publicKey="12860630381af42035435477d8656d28";
const privateKey="7884734f7b69574fc0b6e9e7c3f6cafb1349323b";
const ts=1;

const hash= "529eb4466e8cb0a905fdd25689bcd0f4"; //Se genera concatenando ts+privateKey+publicKey y luego ir a google buscar un generador hash md5 y luego pegar lo 
                                                //que se genera aquí


fetch("https://gateway.marvel.com:443/v1/public/characters?ts="+ts+"&apikey="+publicKey+"&hash="+hash)
.then(function(resp){
    if(resp.ok)
        resp.json()
            .then(function(data){
                pintaDiv(data);
            })
            .catch(function(er){
                console.error("Error al recibir: " + er);
            })
})
.catch(function(er){
    console.error("Error al solicitar: " + er);
})


function pintaDiv(data){
    let section= document.getElementById("sectionCharacters");
    let array= data.data.results;
    let srcImg="";
    for(let character of array){

        let div= newNode("div");
        div.setAttribute("data-bs-toggle", "modal");
        div.setAttribute("data-bs-target", "#divModal");
        div.id="cuadricula";
        let img= newNode("img");
        img.addEventListener("click", fetchInfoCharacter);
        img.id=character.id;
        let p= newNode("p", character.name);

        let src= character.thumbnail.path;
        let extension= character.thumbnail.extension;
        srcImg=src+"."+extension;
        img.src=srcImg;

        div.appendChild(img);
        div.appendChild(p);

        section.appendChild(div);
    }
}

function fetchInfoCharacter(){
    let bodyModal= document.getElementById("bodyModal");
    let nodos= bodyModal.childNodes;

    while(nodos.length!=0)
        nodos[0].remove();
    
    let id= this.id;
    fetch("https://gateway.marvel.com:443/v1/public/characters/"+id+"?ts="+ts+"&apikey="+publicKey+"&hash="+hash)
    .then(function(resp){
        if(resp.ok)
            resp.json()
                .then(function(data){
                    infoCharacter(data.data.results[0]);
                })
                .catch(function(er){
                    console.error("Error al recibir: " + er);
                })
    })
    .catch(function(er){
        console.error("Error al solicitar: " + er);
    })
}


function infoCharacter(data){
    document.getElementById("titleModal").innerHTML= data.name;    

    let bodyModal= document.getElementById("bodyModal");

    let img= newNode("img");
        let path= data.thumbnail.path;
        let extension= data.thumbnail.extension;
        img.src= path+"."+extension;
    let description= newNode("p", data.description);

    let hr1= newNode("hr");

    let divTitulos= newNode("div");
        divTitulos.id="divTitulos";

    let h1TitleComics= newNode("h1", "Comics");
        h1TitleComics.id="h1TitleComics";
    
    let h1TitleSeries= newNode("h1", "Series");
        h1TitleSeries.id="h1TitleSeries";
    
    divTitulos.appendChild(h1TitleComics);
    divTitulos.appendChild(h1TitleSeries);

    bodyModal.appendChild(img);
    bodyModal.appendChild(description);
    bodyModal.appendChild(hr1);
    bodyModal.appendChild(divTitulos);

    let divComicSeries= newNode("div");
        divComicSeries.id= "divComicsSeries";

    //COMICS
    let arrayComics= data.comics.items;

    let divComics= newNode("div");
        divComics.id="divComics";
    
    for(let comic of arrayComics){
        let p= newNode("p", comic.name);
        divComics.appendChild(p);
    }
    divComicSeries.appendChild(divComics);


    //SERIES
    let arraySeries= data.series.items;

    let divSeries= newNode("div");
        divSeries.id="divSeries";

    for(let serie of arraySeries){
        let p= newNode("p", serie.name);
        divSeries.appendChild(p);
    }
    divComicSeries.appendChild(divSeries);

    
    bodyModal.appendChild(divComicSeries);
}




