function showLightbox(src) {

    var figure = document.createElement("figure");
    figure.style.cssText = `
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: 1000;
        flex-direction: column;
    `;

    let img = document.createElement("img");
    img.src = src;
    img.style.cssText = `
        width: initial;
        max-height: 75%;
        max-width: 75%;
        border: 2px solid var(--accent-color);
        box-shadow: -3px 3px 7px black;
    `;

    figure.appendChild(img);

    const body = document.querySelector('body');
    body.appendChild(figure);
    const overflow = body.style.overflow;
    body.style.overflow = "hidden";

    function hidefigure(figure) {
        body.style.overflow = overflow;
        if (figure.parentNode)
            figure.parentNode.removeChild(figure)
        document.removeEventListener("keydown", escapeKey, figure)
    }

    function escapeKey(event) { return event.key === "Escape" && hidefigure(figure) }

    figure.addEventListener("click", event => event.target === figure && hidefigure(event.target))
    document.addEventListener("keydown", escapeKey, figure)
}

function figurePreview(figure) {
    const caption = figure.querySelector("figcaption");
    const image = figure.querySelector("img");

    image.addEventListener("load", (event) => {
        caption.width = `image.clientWidth`;
    })
    image.addEventListener("mouseover", () => { image.style.cursor = `pointer` });
    image.addEventListener("click", ({ target: { src } }) => showLightbox(src));

}

function main() {
    const images = document.querySelectorAll(".post-photo .featured-photo");

    images.forEach(figurePreview);

}

document.addEventListener("DOMContentLoaded", main);