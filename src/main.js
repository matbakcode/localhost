import './index.html';
import './main.css';
import zoomOnHoverClass from "./lib/zoomOnHover";

(function() {
    'use strict';

    function zoomOnHover () {
        const its = document.querySelectorAll('.zoomOnHover');
        const t = [];
        for (let i = 0; i < its.length; ++i) {
            t[i] = new zoomOnHoverClass( its[i] );
            t[i].init();
        }
    }

    zoomOnHover();

}());
