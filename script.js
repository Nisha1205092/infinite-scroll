const cardContainer = document.querySelector('.card-container');

const loadNewCards = () => {
    for (let i = 0; i < 10; i++) {
        let card = document.createElement('div')
        card.textContent = 'New Card'
        card.classList.add(['card'])
        observer.observe(card)
        cardContainer.append(card)
    }
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            console.log(entry)
            entry.target.classList.toggle('show', entry.isIntersecting)

            /**
             * to animate something only the first time
             * in case of lazy loading something (e.g., an image)
             * we can load it the first time and unobserve it.
             * 
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
            } */

        })
    },
    {
        threshold: 0.5
    }
)

const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) {
        return
    }
    loadNewCards()
    // unobserve the original last card
    lastCardObserver.unobserve(lastCard.target)
    // observe the "new last card" every time, essentially an infinite scroll
    // useful for cases like social media apps or youtube like platforms, 
    // where they keep loading content as a user scrolls down and down
    lastCardObserver.observe(document.querySelector('.card:last-child'))
}, {})

const cards = document.querySelectorAll('.card')
cards.forEach(card => {
    observer.observe(card)
})

lastCardObserver.observe(document.querySelector('.card:last-child'))
