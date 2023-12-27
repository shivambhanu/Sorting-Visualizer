function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateArray(){
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    let size = document.getElementById("size-input").value;

    const array = [];
    for(let i = 0; i < size; i++){
        array.push(randomInt(10, 100));
    }

    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = `${array[i] * 4}px`;
        bar.className = "bar";
        
        const bar_label = document.createElement("div");
        bar_label.className = "bar-label";
        bar_label.textContent = array[i];
        bar.appendChild(bar_label);

        arrayContainer.appendChild(bar);
    }
}


async function bubbleSort() {
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



async function insertionSort() {
    const arrayContainer = document.getElementById("array-container");
    const bars = arrayContainer.children;
    for(let i = 1; i < bars.length; i++) {
        let j = i-1;
        const key_bar_height = parseInt(bars[i].style.height);
        const key_bar_textcontent = bars[i].querySelector(".bar-label").textContent;
        while(j >= 0 && key_bar_height < parseInt(bars[j].style.height)) {
            bars[j].style.backgroundColor = "red";

            let speed = document.getElementById("speed-input").value;
            await new Promise(resolve => setTimeout(resolve, 100-speed));

            bars[j+1].style.height = bars[j].style.height;
            bars[j+1].querySelector(".bar-label").textContent = bars[j].querySelector(".bar-label").textContent;

            bars[j].style.backgroundColor = "black";
            j -= 1;
        }
        bars[j+1].style.height = `${key_bar_height}px`;
        bars[j+1].querySelector(".bar-label").textContent = key_bar_textcontent;
    }
}


async function selectionSort() {
    const arrayContainer = document.getElementById("array-container");
    const bars = arrayContainer.children;

    for(let i = 0; i < bars.length; i++) {
        let min_val_idx = i;
        for(let j = i+1; j < bars.length; j++) {
            bars[j].style.backgroundColor = "red";

            if(parseInt(bars[j].style.height) < parseInt(bars[min_val_idx].style.height)){
                min_val_idx = j
            }

            let speed = document.getElementById("speed-input").value;
            await new Promise(resolve => (setTimeout(resolve, 100-speed)));

            bars[j].style.backgroundColor = "black";
        }

        const temp_height = bars[i].style.height;
        bars[i].style.height = bars[min_val_idx].style.height;
        bars[min_val_idx].style.height = temp_height;

        //Changing bar-labels
        const temp_text = bars[i].querySelector(".bar-label").textContent;
        bars[i].querySelector(".bar-label").textContent = bars[min_val_idx].querySelector(".bar-label").textContent;
        bars[min_val_idx].querySelector(".bar-label").textContent = temp_text;
    }
}



async function quickSort(bars, start, end) {
    if(start < end){
        // bars[end].style.backgroundColor = "red";
        let temp_idx = start;  //This won't be zero. Don't do that mistake.
        for(let i = start; i < end; i++){
            bars[i].style.backgroundColor = "red";

            let speed = document.getElementById("speed-input").value;
            await new Promise(resolve => (setTimeout(resolve, 100-speed)));

            if(parseInt(bars[i].style.height) <= parseInt(bars[end].style.height)){
                //swapping time
                const temp_height = bars[temp_idx].style.height;
                bars[temp_idx].style.height = bars[i].style.height;
                bars[i].style.height = temp_height;

                //swapping bar-labels
                const temp_text = bars[temp_idx].querySelector(".bar-label").textContent;
                bars[temp_idx].querySelector(".bar-label").textContent = bars[i].querySelector(".bar-label").textContent;
                bars[i].querySelector(".bar-label").textContent = temp_text;

                temp_idx += 1;
            }
            bars[i].style.backgroundColor = "black";
        }
        //last swap
        const temp_height = bars[temp_idx].style.height;
        bars[temp_idx].style.height = bars[end].style.height;
        bars[end].style.height = temp_height;

        //last bar-label swap
        const temp_text = bars[temp_idx].querySelector(".bar-label").textContent;
        bars[temp_idx].querySelector(".bar-label").textContent = bars[end].querySelector(".bar-label").textContent;
        bars[end].querySelector(".bar-label").textContent = temp_text;

        quickSort(bars, start, temp_idx - 1);
        quickSort(bars, temp_idx + 1, end);
    }
}
function quickSortDriverFunc() {
    const arrayContainer = document.getElementById("array-container");
    const bars = arrayContainer.children;
    quickSort(bars, 0, bars.length-1);
}


//Merge-Sort algorithm
async function combineBars(bars, start, end, allowed_to_combine) {
    if(allowed_to_combine){
        let helperArr = [];
        const mid = Math.floor((start + end) / 2);
        let i = start;
        let j = mid + 1;

        while(i <= mid && j <= end) {
            if(parseInt(bars[i].style.height) <= parseInt(bars[j].style.height)){
                helperArr.push(bars[i].style.height);
                i += 1;
            }else{
                helperArr.push(bars[j].style.height);
                j += 1;
            }
        }

        while(i <= mid){
            helperArr.push(bars[i].style.height);
            i += 1;
        }

        while(j <= end){
            helperArr.push(bars[j].style.height);
            j += 1;
        }


        //Add animation while merging both parts
        for(let i = start, j = 0; i <= end; i++, j++){
            bars[i].style.backgroundColor = "red";

            let speed = document.getElementById("speed-input").value;
            await new Promise(resolve => (setTimeout(resolve, 100-speed)));
            bars[i].style.height = helperArr[j];

            bars[i].style.backgroundColor="black";
        }
    }
    
}

function mergeSort(bars, start, end) {
    if(start < end){
        const mid = Math.floor((start + end) / 2);
        
        // let allowed_to_combine = false;

        mergeSort(bars, start, mid);
        mergeSort(bars, mid+1, end);

        // allowed_to_combine = true;
        combineBars(bars, start, end, false);  //async function
    }
}

function mergeSortDriverFunc() {
    const arrayContainer = document.getElementById("array-container");
    const bars = arrayContainer.children;
    mergeSort(bars, 0, bars.length-1);
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