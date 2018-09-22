/**
 * @module stream
 */

function join(obj) {
    return Object.keys(obj).map( key => key + "=" + obj[key] ).join(",");
}

/**
 * Create a window
 * @param {Object} args
 * @param {Object} args.settings
 * @param {Boolean} [args.settings.windowed=true]
 * @param {Object} args.settings.button
 * @param {Number} [args.settings.button.size=40]
 * @param {Number} [args.settings.width=10]
 * @param {Number} [args.settings.height=10]
 * @param {Object[]} args.buttons
 * @param {Object} args.buttons[].size
 * @param {Number} args.buttons[].size.x
 * @param {Number} args.buttons[].size.y
 * @param {string} args.buttons[].name
 * @param {Function} args.buttons[].onclick
 * @returns {Function}
 */
export default ( {
                     stream,
                     settings: {
                         button: {
                             size = 40
                         } = {},
                         width = 10,
                         height = 10,
                         windowed = true
                     } = {},
                     buttons,
                     oninit
                 } ) =>
stream( emt => {

    let target;

    if(windowed) {
        const win = window.open(null, null, join({
            directories: "no",
            titlebar: "no",
            toolbar: "no",
            location: "no",
            status: "no",
            menubar: "no",
            scrollbars: "no",
            resizable: "no",
            width: width * size,
            height: height * size
        }));
        window.addEventListener('unload', function(event) {
            win.close();
        });
        if(win.document) {
            target = win.document.body;
            console.warn("To display the debugger window, allow pop-ups and refresh the page");
        }
        else {
            target = document.createElement("div");
        }
    }
    else {
        target = document.createElement("div");
        target.style.position = "absolute";
        target.style.top = "0px";
        target.style.left = "0px";
        target.style.zIndex = 999999999;
        window.addEventListener('load', () => document.body.appendChild(target));
    }

    oninit && oninit(emt);

    buttons.map( ({name, onclick, size: {x = 1, y = 1 } = {} }) => {
        const elm = document.createElement("div");
        elm.innerHTML = name;
        elm.style.float = "left";
        elm.style.color = "#0026ff";
        elm.style.textAlign = "center";
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
        .forEach( elm => target.appendChild(elm) )
    ;

});