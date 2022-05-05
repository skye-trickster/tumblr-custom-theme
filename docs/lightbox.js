

$('document').ready(function () {
    function prepareImage({ src }) {
        const img = document.createElement("img")
        img.src = src;
        img.style.cssText = `
        width: initial;
        max-height: 75%;
        max-width: 75%;
        border: 2px solid var(--accent-color);
        box-shadow: -3px 3px 7px black;
        `;
        return img;
    }

    function showLightbox(images, index = 0) {
        let figure = startLightbox()

        let left = document.createElement("a")

        let right = document.createElement("a")

        let img = prepareImage(images[index])

        const setControls = () => {
            if (index === 0) {
                left.innerHTML = " "
                left.classList.remove("setLink")
            }
            else {
                left.innerHTML = "<i class=\"fa fa-solid fa-arrow-left\"></i>"
                left.classList.add("setLink")
            }

            if (index >= images.length - 1) {
                right.innerHTML = " "
                right.classList.remove("setLink")
            }
            else {
                right.innerHTML = "<i class=\"fa fa-solid fa-arrow-right\"></i>"
                right.classList.add("setLink")
            }
        }
        setControls()

        const nextImage = () => {
            if (images.length > 1 && index < images.length - 1) {
                index = index + 1
                img.src = images[index].src;
            }
            setControls()
        }

        const prevImage = () => {
            if (images.length > 1 && index > 0)
                img.src = images[--index].src
            setControls()
        }

        img.addEventListener("click", (event) => {

            const half = event.target.x + (event.target.width) / 2

            if (event.clientX < half) prevImage()
            else nextImage()
        })

        left.addEventListener("click", prevImage)
        right.addEventListener("click", nextImage)

        figure.appendChild(left);
        figure.appendChild(img);
        figure.appendChild(right);
    }

    function startLightbox() {
        const figure = document.createElement("figure");
        figure.style.cssText = `
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            display: flex;
            justify-content: space-between;
            align-items: center;
            top: 0;
            left: 0;
            z-index: 1000;
            padding: 2%;
        `;
        figure.data = {}
        figure.data.photos = []
        const body = document.querySelector('body')
        body.appendChild(figure);
        const overflow = body.style.overflow;
        body.style.overflow = "hidden";

        function hidefigure(figure) {
            body.style.overflow = overflow
            if (figure.parentNode)
                figure.parentNode.removeChild(figure)
            document.removeEventListener("keydown", escapeKey, figure)
        }

        function escapeKey(event) { return event.key === "Escape" && hidefigure(figure) }

        figure.addEventListener("click", event => event.target === figure && hidefigure(event.target))
        document.addEventListener("keydown", escapeKey, figure)
        return figure
    }

    const addPointer = ({ target }) => { target.style.cursor = 'pointer' }
    $('.post-photo .featured-photo').each(function () {
        $(this).children("img")
            .mouseover(addPointer)
            .click(function (event) {
                showLightbox([event.target])
            })
    })
    $('.photoset').each(function () {
        let images = $(this).find("img")
        images.mouseover(addPointer).click(function (event) {
            showLightbox(images, $(images).index(this))
        })
    })
    return this;
})