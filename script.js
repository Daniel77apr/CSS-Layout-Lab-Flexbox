String.prototype.removeClass = function(...str) {
    /* Applied to a string of CSS classes, it accepts multiple classes as arguments and returns an array equal to the original, but without the given classes*/
    const arr = this.split(" ");
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
        let different = true;
        for(let j = 0; j < str.length; j++) {
            if(arr[i] == str[j]) {
                different = false;
            }
        }
        if(different) {
            newArr.push(arr[i]);
        }
    }
    return newArr.join(" ");
};

// Navigation bar

const guidesButton = document.getElementById("guides");

const guidesDiv = document.getElementById("guides-div");

function slide() {
    guidesDiv.className += " translate";
}

function slideBack() {
    guidesDiv.className = guidesDiv.className.removeClass("translate");
}

guidesDiv.addEventListener("mouseover", slide);
guidesButton.addEventListener("mouseover", slide);
guidesDiv.addEventListener("mouseout", slideBack);
guidesButton.addEventListener("mouseout", slideBack);


// Body

const selectEls = document.getElementsByTagName("select");

const inputEls = document.getElementsByTagName("input");

const sectionArr = [
    {}, // Do NOT remove
    {
        inputs: [selectEls[0]],
        classes: ["row", "row-reverse", "column", "column-reverse"],
        div: document.getElementById(`div1`),
        function: changeClass
    },
    {
        inputs: [selectEls[1]],
        classes: ["nowrap", "wrap", "wrap-reverse"],
        div: document.getElementById(`div2`),
        function: changeClass
    },
    {
        inputs: [selectEls[2]],
        classes: ["justify-content-flex-start", "justify-content-flex-end", "justify-content-center", "justify-content-space-between", "justify-content-space-around", "justify-content-space-evenly"],
        div: document.getElementById(`div3`),
        function: changeClass
    },
    {
        inputs: [selectEls[3]],
        classes: ["align-items-stretch", "align-items-flex-start", "align-items-flex-end", "align-items-center", "align-items-baseline"],
        div: document.getElementById(`div4`),
        function: changeClass
    },
    {
        inputs: [selectEls[4], selectEls[5]],
        classes: ["align-content-stretch", "align-content-flex-start", "align-content-flex-end", "align-content-center", "align-content-space-between", "align-content-space-around", "align-content-space-evenly", "align-items-stretch", "align-items-flex-start", "align-items-flex-end", "align-items-center", "align-items-baseline"],
        div: document.getElementById(`div5`),
        function: changeClass
    },
    {
        inputs: [inputEls[0], inputEls[1], inputEls[2], inputEls[3]],
        property: "order",
        divs: document.getElementsByClassName("dynamic-item0"),
        function: changeStyle
    },
    {
        inputs: [inputEls[4], inputEls[5], inputEls[6]],
        property: "flexGrow",
        divs: document.getElementsByClassName("dynamic-item1"),
        function: changeStyle
    },
    {
        inputs: [inputEls[7], inputEls[8], inputEls[9]],
        property: "flexShrink",
        divs: document.getElementsByClassName("dynamic-item2"),
        function: changeStyle
    },
    {
        inputs: [selectEls[6]],
        classes: ["align-self-auto", "align-self-stretch", "align-self-flex-start", "align-self-flex-end", "align-self-center", "align-self-baseline"],
        div: document.getElementById(`div9`),
        function: changeClass
    }
];

function changeClass(section) {
    // Depending on the given section number, removes certain classes from the container div in that section and adds new ones based on the selector values in the code div.
    return function() {
        const currentDiv = sectionArr[section].div
        const currentClasses = sectionArr[section].classes
        const currentInputs =sectionArr[section].inputs
        currentDiv.className = currentDiv.className.removeClass(...currentClasses);
        for(let i = 0; i < currentInputs.length; i++) {
            currentDiv.className += ` ${currentInputs[i].value}`;
        }
    }
}

function changeStyle(section) {
    // Depending on the given section number, changes the value of a predetermined style property to the one given in the respective input element.
    return function() {
        const currentDivs = sectionArr[section].divs;
        const currentProperty = sectionArr[section].property;
        const currentInputs = sectionArr[section].inputs;
        for(let i = 0; i < currentDivs.length; i++) {
            currentDivs[i].style[currentProperty] = currentInputs[i].value;
        }
    }
}

for(let i = 1; i < sectionArr.length; i++) {
    for(let j = 0; j < sectionArr[i].inputs.length; j++) {
        sectionArr[i].inputs[j].addEventListener("change", sectionArr[i].function(i));
    }
}
