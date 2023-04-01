let count = 0;

function stopSliding() {
  count++;
  let slid = "slider" + count;
  let sliderCurrent = document.getElementById(slid);

  slid = "slider" + (count + 1);
  let sliderAbove = document.getElementById(slid);

  let sliderBelow;
  if (count == 1) {
    sliderBelow = sliderCurrent;
  } else {
    slid = "slider" + (count - 1);
    sliderBelow = document.getElementById(slid);
  }

  let left = parseInt(window.getComputedStyle(sliderCurrent).getPropertyValue("left"));
  let width = parseInt(window.getComputedStyle(sliderCurrent).getPropertyValue("width"));
  let leftBelow = parseInt(window.getComputedStyle(sliderBelow).getPropertyValue("left"));
   
  sliderCurrent.classList.remove('animate');
  sliderCurrent.style.left = left + "px";

  let diffrence = left - leftBelow;
  let absDiffrence = Math.abs(diffrence);
  let newWidth = (width - absDiffrence).toString().concat("px");
  sliderCurrent.style.width = newWidth;
  sliderAbove.style.width = newWidth;
  sliderAbove.style.visibility = 'visible';

  if (diffrence > width || diffrence < -width) {
    let score =  count;
    alert("Your score is : " + score);
    location.reload();
  }
}
