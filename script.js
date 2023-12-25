function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateArray(){
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    let size = document.getElementById("size-input").value;

    const array = [];
    for(let i = 0; i < size; i++){
        array.push(randomInt(10, 300));
    }

    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.className = "bar";
        
        const bar_label = document.createElement("div");
        bar_label.className = "bar-label";
        bar_label.textContent = array[i];
        bar.appendChild(bar_label);

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

            let speed = document.getElementById("speed-input").value;
            await new Promise(resolve => setTimeout(resolve, 100-speed));

            const height1 = parseInt(bar1.style.height);
            const height2 = parseInt(bar2.style.height);

            if(height1 > height2){
                bar1.style.height = `${height2}px`;
                bar2.style.height = `${height1}px`;

                const temp_label = bar1.querySelector(".bar-label").textContent;
                bar1.querySelector(".bar-label").textContent = bar2.querySelector(".bar-label").textContent;
                bar2.querySelector(".bar-label").textContent = temp_label;
            }

            bar1.style.backgroundColor = "black";
            bar2.style.backgroundColor = "black";
        }
    }
}



// Code for sliders
let size_slider = document.getElementById("size-input");
let size_text_val = document.getElementsByClassName("slider-value")[0];
size_text_val.textContent = size_slider.value;
size_slider.oninput = function() {
    size_text_val.textContent = this.value;
};


let speed_slider = document.getElementById("speed-input");
let speed_text_val = document.getElementsByClassName("slider-value")[1];
speed_text_val.textContent = speed_slider.value;
speed_slider.oninput = function() {
    speed_text_val.textContent = this.value;
}