function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    funKaraterkiaratas(userDatas);

    // funEventadd();

    document.querySelector("#searchButton").addEventListener("click", fun1)

    function fun1() {
        var parameter = document.querySelector("#search").value
        adatmegjelenit(userDatas, parameter);
    }

}



// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function funKaraterkiaratas(data) {

    var jsonData = data[2].data
    jsonData.sort(function (a, b) {
        if (a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 0
        }
    });
    //console.log(jsonData.length);


    var bigdiv = ``;
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].dead == 0) {
            // jsonData[i].name
            //console.log(jsonData[i].name);
            //console.log(jsonData[i].portrait);
            bigdiv += `<div class="char-div"><img class="char-pic char-${jsonData[i].id}" src="${jsonData[i].portrait}" alt="${jsonData[i].portrait}"> <br> <a class="atag link${jsonData[i].id}" >${jsonData[i].name}</a>
    </div>`

        }

        document.querySelector(".ideberak").innerHTML = bigdiv;
    };



};

/*
function funEventadd(berakTag) {
    var berakTag = document.querySelectorAll(".atag");
    for (var i = 0; i < berakTag.length; i++) {
        berakTag[i].onclick = "valami";

        console.log(berakTag[i]);

    }
    berakTag.fo

};
*/
function adatmegjelenit(data, searchParameter) {
    var jsonData = data[2].data
    console.log(1);
    var characterdiv = ``;
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].dead == 0 && jsonData[i].name.toLowerCase() == searchParameter.toLowerCase()) {
            characterdiv += `<img src="${jsonData[i].picture}" alt="${jsonData[i].picture}"> <p>${jsonData[i].name}</p> <p>${jsonData[i].bio}</p>`

            break;
        } else {
            characterdiv = ""
        }
    }
    console.log(characterdiv);
    document.querySelector(".character-data").innerHTML = characterdiv
};