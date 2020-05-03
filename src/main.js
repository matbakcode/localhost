import './index.html';
import movies from "./data/movies";
import { paginateArray } from "./functions/paginateArray";


(function() {
    'use strict';

    const settings = {
        actualPageIdx: Infinity,
        entriesOnPage: 9,
    };
    const moviesToRender = paginateArray( movies, settings);




    // Only for view
    const catalogWrapper = document.createElement("div");

    moviesToRender.forEach( (movie) => {

        const row = document.createElement("div");

        row.classList.add('movie');
        row.innerHTML = movie.rank + ". " + movie.title;

        catalogWrapper.appendChild( row );
    });

    document.getElementById('moviesListPlace').appendChild(catalogWrapper);

}());
