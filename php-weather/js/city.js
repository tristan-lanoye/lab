
const cats = Array.from(document.querySelectorAll('.cat-button'))
cats.map(button => button.addEventListener('click', (e) => {
    cats.map(button => button.classList.remove('active'))
    Array.from(document.querySelectorAll('.section-item')).map(button => button.classList.remove('active'))
    document.querySelector(`.section-${e.currentTarget.dataset.section}`).classList.add('active') 
    e.currentTarget.classList.add('active')

    const svg =  document.querySelector('svg'), back =  document.querySelector('.back a'), section1 =  document.querySelector('.section-1')
    if(e.currentTarget.dataset.section == 3 && section1.classList.contains('red') || e.currentTarget.dataset.section == 4 && section1.classList.contains('orange')) {
        svg.getAttribute('stroke') == 'rgb(211, 35, 35)' ? svg.setAttribute('stroke', 'rgb(0, 115, 187)') : svg.setAttribute('stroke', 'rgb(211, 35, 35)')
        back.classList.toggle('orange')
        back.classList.toggle('red')
        section1.classList.toggle('orange')
        section1.classList.toggle('red')
    }
}))

console.log(document.querySelector('.back a svg'))
const days = Array.from(document.querySelectorAll('.day'))
days.map((el, i) => {
    el.addEventListener('click', (e) => {
        document.querySelector('.option-day').innerText = `${dateArray[i]}`
        days.map(el => el.classList.remove('day-active'))
        e.currentTarget.classList.add('day-active')
        Array.from(document.querySelectorAll('.hour')).map(el => el.classList.remove('hour-active'))
        Array.from(document.querySelectorAll(`.hour[data-id="${e.currentTarget.dataset.id}"]`)).map(el => el.classList.add('hour-active'))
        Array.from(document.querySelectorAll('.detail')).map(el => el.classList.remove('detail-active'))
        Array.from(document.querySelectorAll(`.detail-${i + 1}`)).map(el => el.classList.add('detail-active'))
    })
})