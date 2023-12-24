function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateArray(){
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    const array = [];
    for(let i = 0; i < 20; i++){
        array.push(randomInt(10, 300));
    }

    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.className = "bar";
        arrayContainer.appendChild(bar);
    }
}


