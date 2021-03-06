class MovieListView {
    constructor(controller){
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click',(event)=>this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.rateMovieListener(event));
        this.viewport.addEventListener('click', (event) => this.favMovieListener(event));
    }
    favMovieListener(event){
        event.preventDefault();
        
        const targetEle = event.target;
        if(targetEle && targetEle.parentNode.classList.contains('add-favorite')){
            const movieId = targetEle.parentNode.dataset.favid;            
            this.controller.storeFavourite(movieId,'yes');
        }
        this.controller.init();

    }
    detailViewBtnListener(event){
        event.preventDefault();
        
        const targetEle = event.target;
        if(targetEle && targetEle.parentNode.classList.contains('detail-view-button')){
            const movieId = targetEle.parentNode.dataset.id;            
            this.controller.displayDetail(movieId);
        }
    }
    rateMovieListener(event) {
        const targetEle = event.target;
        const movieId = targetEle.parentNode.id;
        const value = targetEle.dataset.value;
        console.log("rate movie" + targetEle);
        if (targetEle && targetEle.parentNode.classList.contains('star-wrapper')) {
            this.controller.storeRating(movieId, value);
        }
    
    }

    getItemTemplate(object){
        console.log(object.rating);
        let starContent = "";
        for(let star = 1; star <= object.rating; star++){
            starContent += "<i class='fas fa-star' id="+object.id+"_"+star+" data-value="+star+"></i>";
        }
        
        for(let star=1; star <= (5-object.rating); star++){
            console.log(object.rating);
            if(object.rating>=star)
            {
                starContent += "<i class='far fa-star' id="+object.id+"_"+star+" data-value="+star+" style='font-color:gold></i>";
            }
            else{
                starContent += "<i class='far fa-star' id="+object.id+"_"+star+" data-value="+star+"></i>";
            }           
            
        }
        const fav=this.controller.getFavorite(object.id);
        let favcontent="";
        if(fav==='yes')
        {
           
            favcontent = "<a class='add-favorite btn-floating ' href='#' id='favourite' data-favid="+object.id+" style='background-color:red'><i class='material-icons ' >favorite_border</i></a>";
                
        }
        else{
            favcontent = "<a class='add-favorite btn-floating ' href='#' id='favourite' data-favid="+object.id+" style='background-color:gray'><i class='material-icons ' >favorite_border</i></a>";
        }
        
        const result = this.itemTemplate
        .replace("{{this.title}}",object.title)
        .replace("{{this.poster}}",`https://image.tmdb.org/t/p/w400/${object.poster}`)
        .replace("{{this.overview}}",this.getExcerptWords(object.overview))
        .replace("{{this.id}}",object.id)
        .replace("{{this.ratedId}}", object.id)
        .replace("{{this.ratingStars}}", starContent)
        .replace("{{this.favcontent}}",favcontent);
        return result;
    }    

    getExcerptWords(mainString){
        const sliced = mainString.slice(0,100)
        const split = sliced.split(" ");
        split.splice(-1,1);
        const joined = split.join(" ");        
        return joined + "...";
    }

    render(templates) {  
        document.documentElement.scrollTop = 0;
        this.viewport.innerHTML = "";
        for (let template of templates) {        
            this.viewport.innerHTML += template;        
        }
    }
    ratingMovie(movieId, ratingValue) {
        console.log("ratingValue" + ratingValue);
        for(let rate=1; rate <= 5; rate++){
            const fillStar = document.getElementById(movieId + "_" + rate);
            fillStar.className="far fa-star";
        }
        for (let rate = 1; rate <= ratingValue; rate++) {
            const fillStar = document.getElementById(movieId + "_" + rate);
            console.log("fillstar" + fillStar);
            if (fillStar.classList.item(0) == 'far') {
                fillStar.className = "fas fa-star";
            } else {
                fillStar.className = "far fa-star";
            }
        }
    }
}

export default MovieListView;