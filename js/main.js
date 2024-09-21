const carsoul = document.querySelector('.carsoul'),
    firstImg = carsoul.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll('.wrapper i')
let isDragStart = false, prevPageX, preventScrollLeft
let firstWidth = firstImg.clientWidth + 14

const showHideIcons = () => {
    let scrollWidth = carsoul.scrollWidth - carsoul.clientWidth
    arrowIcons[0].style.display = carsoul.scrollLeft == 0 ? 'none' : 'block'
    arrowIcons[1].style.display = carsoul.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrowIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        let firstWidth = firstImg.clientWidth + 14
        carsoul.scrollLeft += icon.id == 'left' ? -firstWidth : firstWidth
        setTimeout(() => showHideIcons(), 60)
    })
})

const dragStart = (e) => {
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    preventScrollLeft = carsoul.scrollLeft
}

const dragging = (e) => {
    if (!isDragStart) return
    e.preventDefault()
    carsoul.classList.add('dragging')
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carsoul.scrollLeft = preventScrollLeft - positionDiff
    showHideIcons()
}

const dragStop = () => {
    isDragStart = false
    carsoul.classList.remove('dragging')
}

carsoul.addEventListener('mousedown', dragStart)
carsoul.addEventListener('touchstart', dragStart)

carsoul.addEventListener('mousemove', dragging)
carsoul.addEventListener('touchmove', dragging)

carsoul.addEventListener('mouseup', dragStop)
carsoul.addEventListener('mouseleave', dragStop)
carsoul.addEventListener('touchend', dragStop)
