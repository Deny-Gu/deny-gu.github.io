const input = document.querySelector('.content__input')
const searchResultList = document.querySelector('.content__search-result')
const favouritesList = document.querySelector('.content__list')


// Объект содержаший массив результатов поиска, массив с избранными репозиториями и методами для работы с репозиториями
const githubApiAutocomplete = {
  searchResult: [],
  favourites: [],

  // Получаем репозитории и добавляем их в массив
  getRepository: async function(str) {
    let response = await fetch(`https://api.github.com/search/repositories?q=${str}`)
    let data = await response.json()
    this.searchResult = await data.items
    this.showSearchResult()
  },

  // Отображаем результаты поиска
  showSearchResult: function() {
    if (this.searchResult.length !== 0) {
      this.searchResult.forEach((item, i) => {
        if (i < 5) {
          let li = document.createElement('li')
          li.innerHTML = item.name
          li.addEventListener('click', () => {
            this.addFavorites(item)
          })
          searchResultList.append(li)
        }
      })
    }
  },

  // Очищаем результаты поиска
  clearSearchResult: function() {
    searchResultList.innerHTML = ''
  },

  // Добавляем репозиторий в список избранных
  addFavorites: function(rep) {
    this.favourites = [...this.favourites, rep]
    this.showFavorites()
    this.clearSearchResult()
    input.value = ''
  },

  // Удаляем репозиторий из списка избранных
  removeFavorites: function(rep) {
    this.favourites = this.favourites.filter(item => item.id !== rep.id)
    this.showFavorites()
  },

  // Отображаем список избранных репозиториев
  showFavorites: function() {
    favouritesList.innerHTML = ''
    if (this.favourites.length !== 0) {
      this.favourites.forEach((item, i) => {
        let contentListItem = document.createElement('div')
        contentListItem.classList.add('content__list-item')
        let contenDescription = document.createElement('div')
        contenDescription.classList.add('content__description')
        contentListItem.append(contenDescription)
        let contenListName = document.createElement('p')
        contenListName.innerHTML = `Name: ${item.name}`
        let contenListOwner = document.createElement('p')
        contenListOwner.innerHTML = `Owner: ${item.owner.login}`
        let contenListStars = document.createElement('p')
        contenListStars.innerHTML = `Starts: ${item.stargazers_count}`
        contenDescription.append(contenListName)
        contenDescription.append(contenListOwner)
        contenDescription.append(contenListStars)
        let contenListRemove = document.createElement('div')
        contenListRemove.classList.add('content__list_remove')
        contenListRemove.insertAdjacentHTML('beforeEnd', 
          `<svg fill="red" width="50px" height="50px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/>
          </svg>`
        )
        contenListRemove.addEventListener('click', () => {
          this.removeFavorites(item)
        })
        contentListItem.append(contenListRemove)
        favouritesList.append(contentListItem)
      })
    }
  },
}

// Функция debounce в целях избежания лишних запросов на сервер
function debounce(func, timeout = 500) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args); }, timeout)
  }
}

// Обработчик события для поля поиска
input.addEventListener('input', debounce((event) => {
  githubApiAutocomplete.clearSearchResult()
  if (event.target.value.length === 0) {
    githubApiAutocomplete.searchResult = []
  } else {
    githubApiAutocomplete.getRepository(event.target.value)
  }
}))