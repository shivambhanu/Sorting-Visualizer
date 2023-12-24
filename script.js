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


async function bubbleSort(){
    const arrayContainer = document.getElementById("array-container");
    const bars = arrayContainer.children;

    for(let i = 0; i < bars.length; i++){
        for(let j = 0; j < bars.length - i - 1; j++){
            const bar1 = bars[j];
            const bar2 = bars[j+1];

            
            bar1.style.backgroundColor = "red";
            bar2.style.backgroundColor = "red";

            await new Promise(resolve => setTimeout(resolve, 20));

            const height1 = parseInt(bar1.style.height);
            const height2 = parseInt(bar2.style.height);

            if(height1 > height2){
                bar1.style.height = `${height2}px`;
                bar2.style.height = `${height1}px`;
            }

            bar1.style.backgroundColor = "black";
            bar2.style.backgroundColor = "black";
        }
    }
}