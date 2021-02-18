const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

//Search button Onclick
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  if(search.value !=""){
    getImages(search.value);
    toggleSpinner(true)
    sliders.length = 0;

  }

});

// Trying KeyBoard On this
let input = document.getElementById("search");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-btn").click();
  }
});

//Slider button for slide
sliderBtn.addEventListener('click', function () {
  createSlider()
})


// show images 


const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {//Cannot read property of forEach of undefined
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    toggleSpinner(false)
    gallery.appendChild(div);
    
  })

}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  // element.classList.add('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    element.classList.add('added');
    sliders.push(img);
  } else {console.log(item)
    // alert('Hey, Already added !')
    element.classList.remove('added');
    for( var i = 0; i < sliders.length; i++){ 
    
      if ( i == item) { 
        // console.log(sliders)
        sliders.splice(i, 1); 
      }
    // sliders.remove(img);
    // console.log(sliders)

    }
  }
}



var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  // sliderContainer.appendChild(prevNext)
  // document.querySelector('.main').style.display = 'block';
  // // hide image aria
  // // imagesArea.style.display = 'none';//Changing for trial
  // imagesArea.style.display = 'none';//Changing for trial

  // const duration = document.getElementById('duration').value || 1000;
  // sliders.forEach(slide => {
  //   let item = document.createElement('div')
  //   item.className = "slider-item";
  //   item.innerHTML = `<img class="w-100"
  //   src="${slide}"
  //   alt="">`;
  //   sliderContainer.appendChild(item)
  // })


  const duration = document.getElementById('duration').value || 1000;
 
  if(duration < 0){
    alert("Please increase Your Sliding Time More Than 0 Milliseconds ");
    
  }else{

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    // imagesArea.style.display = 'none';//Changing for trial
    imagesArea.style.display = 'none';//Changing for trial
   
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
   
    timer = setInterval(function () {
      changeSlide(0)
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);

  }

}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}


const toggleSpinner = (show) => {
  const spinner = document.getElementById("spinner-toggle");
  if(show){
    spinner.classList.remove("d-none");
  }
  else{
    spinner.classList.add("d-none");

  }
  
}

