const main_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
//the dropdowns (all the countries)
const dropdown = document.querySelectorAll(".dropdown select")
const button = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector("#message");
//for(code in countryList){
//console.log(code,countryList[code]); to print all the countries
for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected = "selected"
        }
        else if(select.name ==="to" && currCode ==="INR"){
            newOption.selected = "selected"

        }
        select.append(newOption);
        
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    }) 
}
//to update the flaf everytime
const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}
button.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    //amount access
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    console.log(amountVal);
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = 1;
    }

    console.log(fromCurr.value,toCurr.value);
    const url = `${main_url}/${fromCurr.value.toLowerCase()}.json`
    let response = await(fetch(url));
    if (!response.ok) {
    throw new Error("Failed to fetch data");
    }
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let final_amount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${final_amount} ${toCurr.value}`
});




