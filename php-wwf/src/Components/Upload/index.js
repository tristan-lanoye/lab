import './main.scss'

import Dropdown from '../Utils/js/Dropdown'

for(const el of Array.from(document.querySelectorAll('.dropdown-container'))) {
    new Dropdown(el)
}


let currentTab = 0 // Current tab is set to be the first tab (0)

const fixStepIndicator=(n)=> {
  // This function removes the "active" class of all steps...
  let i, x = document.getElementsByClassName("step")
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "")
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active"
}


const showTab=(n)=> {
  // This function will display the specified tab of the form ...
  let x = document.getElementsByClassName("tab")
  x[n].style.display = "block"
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none"
  } else {
    document.getElementById("prevBtn").style.display = "inline"
  }
  if (n == (x.length - 1)) {
    const $lastButton = document.getElementById("nextBtn")
    $lastButton.innerHTML = "Send"
    $lastButton.style.color = "white"
    $lastButton.style.background = "#ec4e01"
    $lastButton.style.height = "30px"
    $lastButton.style.padding = "5px 10px"
    $lastButton.style.borderRadius = "5px"
  } else {
    document.getElementById("nextBtn").innerHTML = "Next"
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}



document.querySelector("#prevBtn").addEventListener(
  "click",
  ()=>{
    nextPrev(-1)
  }
)

document.querySelector("#nextBtn").addEventListener(
  "click",
  ()=>{
    nextPrev(1)
  }
)
const nextPrev=(n)=> {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab")
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false
  // Hide the current tab:
  x[currentTab].style.display = "none"
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit()
    return false
  }
  // Otherwise, display the correct tab:
  showTab(currentTab)
}

const validateForm=()=> {
  // This function deals with validation of the form fields
  let x, y, i, valid = true
  x = document.getElementsByClassName("tab")
  y = x[currentTab].getElementsByTagName("input")
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid"
      // and set the current valid status to false:
      valid = false
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish"
  }
  return valid // return the valid status
}

showTab(currentTab) // Display the current tab

