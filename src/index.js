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
    stream( (emt, {hook}) => {
        let target;
        if(windowed) {
            let win = window.open("", null, join({
                directories: "no",
                titlebar: "no",
                toolbar: "no",
                location: "no",
                status: "no",
                menubar: "no",
                scrollbars: "no",
                resizable: "no",
                width: width * ( size + 4 ),
                height: height * ( size + 4 )
            }));
            if(win && win.document) {
                win.focus();
                target = win.document.body;
            }
            else {
                console.warn("To display the debugger window, allow pop-ups and refresh the page");
                target = document.createElement("div");
            }
            target.style.margin = "0px";
            target.style.padding = "0px";
            target.style.top = "0px";
            target.style.left = "0px";
            target.style.zIndex = 999999999;
        }
        else {
            throw "unwindowed mode now is unsupported"
        }

        oninit && oninit(emt);

        hook.add( ({ btns}) => {
            if(btns){ target.innerHTML = ""};
            btns && buttons.map( ({name, onclick, size: {x = 1, y = 1 } = {} }, i) => {
                const elm = document.createElement("div");
                elm.innerHTML = name;
                elm.style.float = "left";
                elm.style.color = "#0026ff";
                elm.style.textAlign = "center";
                elm.style.font = "30px Consolas";
                elm.style.border = "1px solid #0026ff";
                elm.style.margin = "1px";
                elm.style.width = `${x * size + (x-1)*4 }px`;
                elm.style.height = `${y * size + (y-1)*4 }px`;
                elm.style.lineHeight = `${y * size}px`;
                elm.style.cursor = "pointer";
                const isNotActive = btns.find(x => x.btn === i).state
                if(isNotActive){
                    elm.style.backgroundColor = "#999999"
                    elm.style.pointerEvents = "none"
                }
                elm.addEventListener("click", () => onclick(emt));
                return elm;
            } )
                .forEach( elm => {
                    target.appendChild(elm)
                });
        } );

    });