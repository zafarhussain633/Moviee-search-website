`use strict`;

const key = `bfe1e5c1f6ec97e547ed202e4423013f`;
const base_url = `https://api.themoviedb.org/3`;
const most_popular_movie =base_url + `/discover/movie?sort_by=popularity.desc&api_key=${key}`;
const top_rated_movie = base_url +`/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=${key}`;
const science_fiction = base_url + `/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=${key}`;
const best_darama = base_url +`/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=${key}`;
const highest_rated = base_url + `/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=${key}`;
const search_movie = base_url + `/search/movie?api_key=${key}`; // for searching movies

const form = document.getElementById("search");

const homePage = document.getElementById("best");
const logo = document.getElementById("logo");
//event listners
document.getElementById("most-popular").addEventListener("click", () => {
    getdata(most_popular_movie)
    homePage.style.display="none"
}
);
document.getElementById("top-rated").addEventListener("click", () => {
   getdata(top_rated_movie)
   homePage.style.display="none"
}
);
document.getElementById("science-fiction").addEventListener("click", () => {
    getdata(science_fiction)
    homePage.style.display="none"
}
);
document.getElementById("darama").addEventListener("click", () =>{
    getdata(best_darama)
    homePage.style.display="none"
} 
);
document.getElementById("logo").addEventListener('click', ()=>{
    home(highest_rated);
})
//end of event listener

function getdata(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      display(res.results);
    });
}

function display(result) {
  let output = "";
  let rate =null;
  result.forEach((value) => {
      if(value.vote_average<7){
        rate = `<div style="color:red">${value.vote_average}</div>`
      }else{
        rate = `<div style="color:green">${value.vote_average}</div>`
      }
    output += ` 
        <div class="card">     
            <div><img src="https://image.tmdb.org/t/p/w500/${value.poster_path}" width="160px" height="180px" alt="image"></div>
            <div class="title">${value.title}</div>
            <div id="card-body">
                        <div class="date-area">
                        <div class="date">Release date</div>
                        <div class="getdate">${value.release_date}</div>
            </div>
                <div class="rating">
                    ${rate}
                </div>
            </div>
        </div>`;
  });
  document.getElementById("result").innerHTML = output;
}


//for when user search moview
form.addEventListener("keyup", (e) => {
  e.preventDefault();
  let userInput = document.getElementById("search").value;
  console.log(userInput);
  if (userInput) {
    console.log(userInput);
    getdata(search_movie + "&query=" + userInput);
  }
});

function home(url){  // for homepage
    fetch(url)
    .then((res) => res.json())
    .then(res=>{
      let rate =null;
        let output="";
        res.results.forEach(value=>{
          if(value.vote_average<7){
            rate = `<div style="color:red">${value.vote_average}</div>`
          }else{
            rate = `<div style="color:green">${value.vote_average}</div>`
          }
            output += ` 
            <div class="card">     
                <div><img src="https://image.tmdb.org/t/p/w500/${value.poster_path}" width="160px" height="180px" alt="image"></div>
                <div class="title">${value.title}</div>
                <div id="card-body">
                            <div class="date-area">
                            <div class="date">Release date</div>
                            <div class="getdate">${value.release_date}</div>
                </div>
                    <div class="rating">
                        <div >${rate}</div>
                    </div>
                </div>
            </div>`;
        })
        document.getElementById("result").innerHTML=output
    } 
   
    )

}
home(highest_rated);
