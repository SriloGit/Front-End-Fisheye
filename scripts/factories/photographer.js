function photographerFactory (data) {
  const { id, name, city, country, tagline, price, portrait, image, likes, title, video } = data

  const picture = `assets/photographers/${portrait}`

  // Create HTML Layout with photograph data
  function getUserCardDOM () {
    const ahref = document.createElement('a')
    ahref.setAttribute('class', 'link')
    ahref.setAttribute('aria-label', 'Show '+ name +' Profile')
    ahref.setAttribute('href', 'photographer.html?id=' + id)
    const article = document.createElement('article')
    const img = document.createElement('img')
    article.setAttribute('class', 'card-photographer')

    const villePays = document.createElement('span')
    const bio = document.createElement('p')
    const prix = document.createElement('span')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    const h2 = document.createElement('h2')
    h2.textContent = name
    villePays.textContent = city.concat(', ', country)
    bio.textContent = tagline
    villePays.setAttribute('class', 'location')
    bio.setAttribute('class','tagline')
    prix.setAttribute('class', 'prix')
    prix.textContent = price + '€ /jour'

    ahref.appendChild(article)
    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(villePays)
    article.appendChild(bio)
    article.appendChild(prix)
    return (ahref)
  }

  // HTML layout for profil of photograph
  function getProfilePage () {

    const photograph_header = document.createElement('div')
    photograph_header.setAttribute('class', 'photograph-header')

    const mainInfos = document.createElement('div')
    mainInfos.setAttribute('class', 'photograph-infos')

    const nomPrenom = document.createElement('h1')
    nomPrenom.setAttribute('class', 'names')
    nomPrenom.textContent = name

    const location = document.createElement('div')
    location.setAttribute('class', 'location')
    const villePays = document.createElement('span')
    villePays.textContent = city.concat(', ', country)
    const bio = document.createElement('p')
    bio.textContent = tagline

    const contact_button = document.createElement('button')
    contact_button.setAttribute('id', 'contact_button')
    contact_button.setAttribute('class', 'contact_button')
    contact_button.setAttribute('onclick', 'displayModal()')
    contact_button.textContent = 'Contactez-moi'

    const profileImg = document.createElement('img')
    profileImg.setAttribute('src', `assets/photographers/${portrait}`)
    profileImg.setAttribute('class', 'photographImg')
    profileImg.setAttribute('alt', 'profilePic')

    const price_likes = document.createElement('div')
    price_likes.setAttribute('class', 'price')
    const likesSpan = document.createElement('span')
    likesSpan.setAttribute('class', 'compteurLikeTotal')

    const heart = document.createElement('span')
    heart.setAttribute('aria-label', 'likes')
    heart.setAttribute('class', 'fas fa-heart')
    const priceDay = document.createElement('span')
    priceDay.textContent = price + '€ /jour'

    photograph_header.appendChild(mainInfos)
    mainInfos.appendChild(nomPrenom)
    mainInfos.appendChild(location)
    location.appendChild(villePays)
    location.appendChild(bio)
    photograph_header.appendChild(contact_button)
    photograph_header.appendChild(profileImg)

    photograph_header.appendChild(price_likes)
    price_likes.appendChild(likesSpan)
    likesSpan.appendChild(heart)
    price_likes.appendChild(priceDay)

    return (photograph_header)
  }

  // HTML layout for media
  function getMediaPage () {
    const jpg = `assets/images/${image}`
    const mp4 = `assets/images/${video}`

    const album = document.createElement('article')
    album.setAttribute('class', 'album')

    const caption = document.createElement('div')
    caption.setAttribute('class', 'caption')
    const albumTitle = document.createElement('h2')
    if (title.length > 20) {
      albumTitle.textContent = title.substring(0, 24) + '...'
    } else {
      albumTitle.textContent = title
    }

    const like = document.createElement('p')
    like.setAttribute('class', 'like')

    const compteur = document.createElement('span')
    compteur.setAttribute('class', 'compteur')
    compteur.textContent = likes +  ' ';
    const heart = document.createElement('span')
    heart.setAttribute('aria-label', 'likes')
    heart.setAttribute('class', 'fas fa-heart incrementLike')

    // If JPG -> <img>
    if (jpg.split('.').pop() === 'jpg') {
      const img = document.createElement('img')
      img.setAttribute('class', 'lightboxMedia')
      img.setAttribute('src', jpg)
      img.setAttribute('alt', title)

      album.appendChild(img)
      album.appendChild(caption)
      caption.appendChild(albumTitle)
      caption.appendChild(like)
      like.appendChild(compteur)
      like.appendChild(heart)
    }

    // If MP4 -> <video>
    if (mp4.split('.').pop() === 'mp4') {
      const videoPlayer = document.createElement('video')
      videoPlayer.setAttribute('controls', '')
      videoPlayer.setAttribute('class', 'lightboxMedia')
      const source = document.createElement('source')
      source.setAttribute('src', mp4)
      source.setAttribute('type', 'video/mp4')
      source.setAttribute('class', 'lightboxImg')


      album.appendChild(videoPlayer)
      videoPlayer.appendChild(source)
      album.appendChild(caption)
      caption.appendChild(albumTitle)
      caption.appendChild(like)
      like.appendChild(compteur)
      like.appendChild(heart)
    }

    return (album)
  }

  // Get likes of every media and add it to the sidebar
  function getTotalLikes() {

    let totalLikes = 0

    data.forEach((media) => {

      totalLikes += media.likes;

    });
    document.querySelector('.compteurLikeTotal').innerHTML = totalLikes + " " + "<span class='fas fa-heart'></span>";
  }

  // HTML layout for the form contact
  function getContactNameDOM () {
    const contactHeader = document.createElement('header')
    contactHeader.setAttribute('class', 'contact-header')
    const contact = document.createElement('div')
    contact.setAttribute('class', 'contactText')
    const contactMe = document.createElement('h3')
    contactMe.setAttribute('class', 'contactName')
    contactMe.textContent = 'Contactez-moi'
    const contactName = document.createElement('h4')
    contactName.setAttribute('class', 'contactName')
    contactName.textContent = name

    const closeContact = document.createElement('img')
    closeContact.setAttribute('src',`assets/icons/close.svg`)
    closeContact.setAttribute('onclick', 'closeModal()')
    closeContact.setAttribute('alt', 'close Contact Form')

    contactHeader.appendChild(contact)
    contact.appendChild(contactMe)
    contact.appendChild(contactName)
    contactHeader.appendChild(closeContact)

    return(contactHeader)
  }

  return { getUserCardDOM, getProfilePage, getMediaPage, getTotalLikes, getContactNameDOM }
}