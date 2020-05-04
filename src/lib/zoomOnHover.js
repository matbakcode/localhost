/**
 *
 * @param {Node} element
 */
class zoomOnHoverClass {
    constructor(el) {

        if ( !!(!el && el.nodeType !== 1) ) throw Error('DomUtilError: param is not an DOM element.');

        this.config = {
            zoomWindow: {
                size: {
                    w: 450,
                    h: 250,
                },
                classes: {
                    glob: "zoomOnHover-Window",
                    init: "zoomOnHover-Window--initialized",
                    show: "zoomOnHover-Window--showed",
                    hide: "zoomOnHover-Window--hid",
                }
            },
            movePerformance: 66
        }

        this.dom = {
            el: el,
            img: null,
            zoomWindow: null,
            zoomWindowImg: null
        }


        this.state = {
            first: true,
            showed: false,
            performance: null,
            zoomWindowImageSrc: null,
        }
    }

    valid () {
        this.dom.img = this.dom.el.getElementsByTagName("img")[0];

        if (!this.dom.img) {
            throw Error('DomUtilError: Child image is necessary.');
            return false;
        }
        if ( !!(this.dom.img.nodeType !== 1) ) {
            throw Error('DomUtilError: Child image is not an DOM element.');
            return false;
        };

        return true;
    }

    prepare () {
        this.state.zoomWindowImageSrc = this.dom.el.dataset.zoomImage;
        this.state.img = {
            pos: this.dom.img.getBoundingClientRect()
        }
    }

    events () {
        this.dom.img.addEventListener("mouseover", ( event ) => {

            this.controlMoveEvent(true);
            this.renderWindow();
        });

        this.dom.img.addEventListener("mouseout", ( event ) => {

            this.controlMoveEvent(false);
            this.renderWindow();

        });
    }

    setTransform (x, y, el) {
        const t = ("translate3d(" + x + "px, " + y + "px, 0 )");
        el.style.MozTransform = t;
        el.style.msTransform = t;
        el.style.OTransform = t;
        el.style.transform = t;
    }

    controlMoveEvent (state) {
        this.state.showed = state;

        if (state) {
            this.dom.img.addEventListener('mousemove', (event) => this.move(event), false);
        } else {
            this.dom.img.removeEventListener('mousemove', (event) => this.move(event), false);
        }
    }

    move (event) {

        if ( !this.state.performance ) {

            const cursorX = event.clientX - this.state.img.pos.left;
            const cursorY = event.clientY - this.state.img.pos.top;

            this.state.performance = setTimeout(() => {
                this.state.performance = null;

                const horizontalPositionPercent = ((cursorX*100) / (this.state.img.pos.right - this.state.img.pos.left));
                const verticalPositionPercent = ((cursorY*100) / (this.state.img.pos.bottom - this.state.img.pos.top));
                const imageWindowSize = {
                    w: this.dom.zoomWindowImg.naturalWidth,
                    h: this.dom.zoomWindowImg.naturalHeight,
                }
                const imageWindowMove = {
                    x: (horizontalPositionPercent * (this.dom.zoomWindowImg.naturalWidth-this.config.zoomWindow.size.w)) / 100,
                    y: (verticalPositionPercent * (this.dom.zoomWindowImg.naturalHeight-this.config.zoomWindow.size.h)) / 100,
                }

                this.setTransform(imageWindowMove.x*-1, imageWindowMove.y*-1, this.dom.zoomWindowImg);
            }, this.config.movePerformance);
        }
    }

    buildZoomWindow () {

        const w = document.createElement('div');
        w.classList.add(this.config.zoomWindow.classes.glob);

        const i = document.createElement('img');
        i.src = this.state.zoomWindowImageSrc;

        w.appendChild(i);

        this.dom.zoomWindowImg = i;
        this.dom.zoomWindow = w;

    }

    renderWindow (event, state) {
        if (this.state.showed) {
            if ( this.state.first ) {

                this.buildZoomWindow();

                this.dom.zoomWindow.classList.add(this.config.zoomWindow.classes.init);
                this.dom.el.appendChild(this.dom.zoomWindow);
                this.state.first = false;
            }
            this.dom.zoomWindow.classList.remove(this.config.zoomWindow.classes.hide);
            window.setTimeout(() => {
                this.dom.zoomWindow.classList.add(this.config.zoomWindow.classes.show);
            }, 100)


        } else {
            this.dom.zoomWindow.classList.remove(this.config.zoomWindow.classes.show);
            this.dom.zoomWindow.classList.add(this.config.zoomWindow.classes.hide);
        }
    }


    init () {
        if (this.valid()) {
            this.prepare();
            this.events();
        }
    }
}

export default zoomOnHoverClass;

