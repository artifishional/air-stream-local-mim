const win = window.open(null, null, { resizable: true, menubar: 0, width: 5, height: 5 });

window.addEventListener('unload', function(event) {
    win.close();
});

export default function ({
     settings: {button: {size = 40} = {}, width = 10, height = 10} = {}, buttons
} = {}) {

    win.resizeTo(width * size, height * size);

    return function (emt) {

        buttons.map( ({name, onclick, size: {x = 1, y = 1 } = {} }) => {
            const elm = document.createElement("div");
            elm.textContent = name;
            elm.style.float = "left";
            elm.style.color = "#0026ff";
            elm.style.font = "30px Consolas";
            elm.style.border = "1px solid #0026ff";
            elm.style.margin = "1px";
            elm.style.width = `${x * (size - 2) }px`;
            elm.style.height = `${y * (size - 2) }px`;
            elm.style.lineHeight = `${y * size}px`;
            elm.style.cursor = "pointer";
            elm.addEventListener("click", () => onclick(emt));
            return elm;
        } )
            .forEach( elm => win.document.body.appendChild(elm) )
        ;

    }

};