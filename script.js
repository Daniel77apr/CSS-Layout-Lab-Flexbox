/* TO DO: 
    - Define removeClass method to work with className only insted of String
    - Fix bug in line 45
*/

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

const select = document.getElementsByTagName("select");
const input = document.getElementsByTagName("input");

function changeClass(section) {
    // Depending on the given section number, removes certain classes from the container div in that section and adds new ones based on the selector values in the code div.
    return function() {
        const classes = [
            ["row", "row-reverse", "column", "column-reverse"],
            ["nowrap", "wrap", "wrap-reverse"],
            ["justify-content-flex-start", "justify-content-flex-end", "justify-content-center", "justify-content-space-between", "justify-content-space-around", "justify-content-space-evenly"],
            ["align-items-stretch", "align-items-flex-start", "align-items-flex-end", "align-items-center", "align-items-baseline"],
            ["align-content-stretch", "align-content-flex-start", "align-content-flex-end", "align-content-center", "align-content-space-between", "align-content-space-around", "align-content-space-evenly", "align-items-stretch", "align-items-flex-start", "align-items-flex-end", "align-items-center", "align-items-baseline"],
            [], [], [], // Do NOT remove
            ["align-self-auto", "align-self-stretch", "align-self-flex-start", "align-self-flex-end", "align-self-center", "align-self-baseline"]
        ];
        const div = document.getElementById(`div${section}`);
        div.className = div.className.removeClass(...classes[section - 1]);
        if (section < 9) {
            div.className += ` ${select[section - 1].value}`;
            if(section == 5) {
                div.className += ` ${select[section].value}`;
            }
        } else {
            div.className += ` ${select[section - 3].value}`;
        }
    }
}

function changeStyle(section) {
    // Depending on the given section number, changes a the value of a predetermined style property given in the respective input element.
    return function() {
        const itemGroup = document.getElementsByClassName(`dynamic-item${section - 6}`);
        const inputGroup = document.getElementsByClassName(`input${section - 6}`);
        const properties = ["order", "flexGrow", "flexShrink"];
        console.log(properties[section - 6]);
        for(let i = 0; i < itemGroup.length; i++) {
            itemGroup[i].style[properties[section - 6]] = inputGroup[i].value;
        }
    }
}

select[0].addEventListener("change", changeClass(1));
select[1].addEventListener("change", changeClass(2));
select[2].addEventListener("change", changeClass(3));
select[3].addEventListener("change", changeClass(4));
for(let i = 4; i < 6; i++) {
    select[i].addEventListener("change", changeClass(5));
}
for(let i = 0; i < 4; i++) {
    input[i].addEventListener("change", changeStyle(6));
}
for(let i = 4; i < 7; i++) {
    input[i].addEventListener("change", changeStyle(7));
}
for(let i = 7; i < 10; i++) {
    input[i].addEventListener("change", changeStyle(8));
}
select[6].addEventListener("change", changeClass(9));