function photographerFactory(data) {
  const {
    id, name, city, country, tagline, price, portrait, image, likes, title, video,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  // Create HTML Layout with photograph data
  function getUserCardDOM() {
    const ahref = document.createElement('a');
    ahref.setAttribute('class', 'link');
    ahref.setAttribute('aria-label', `${name}`);
    ahref.setAttribute('href', `photographer.html?id=${id}`);
    const article = document.createElement('article');
    const img = document.createElement('img');
    article.setAttribute('class', 'card-photographer');

    const villePays = document.createElement('span');
    const bio = document.createElement('p');
    const prix = document.createElement('span');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    villePays.textContent = city.concat(', ', country);
    bio.textContent = tagline;
    villePays.setAttribute('class', 'location');
    bio.setAttribute('class', 'tagline');
    prix.setAttribute('class', 'prix');
    prix.textContent = `${price}€ /jour`;

    ahref.appendChild(article);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(villePays);
    article.appendChild(bio);
    article.appendChild(prix);
    return (ahref);
  }

  // HTML layout for profil of photograph
  function getProfilePage() {
    const photographHeader = document.createElement('div');
    photographHeader.setAttribute('class', 'photograph-header');

    const mainInfos = document.createElement('div');
    mainInfos.setAttribute('class', 'photograph-infos');
    mainInfos.setAttribute('tabindex', '0');

    const nomPrenom = document.createElement('h1');
    nomPrenom.setAttribute('class', 'names');
    nomPrenom.textContent = name;

    const location = document.createElement('div');
    location.setAttribute('class', 'location');
    const villePays = document.createElement('span');
    villePays.textContent = city.concat(', ', country);
    const bio = document.createElement('p');
    bio.textContent = tagline;

    const contactButton = document.createElement('button');
    contactButton.setAttribute('id', 'contact_button');
    contactButton.setAttribute('class', 'contact_button');
    contactButton.setAttribute('onclick', 'displayModal()');
    contactButton.textContent = 'Contactez-moi';

    const profileImg = document.createElement('img');
    profileImg.setAttribute('src', `assets/photographers/${portrait}`);
    profileImg.setAttribute('class', 'photographImg');
    profileImg.setAttribute('alt', name);
    profileImg.setAttribute('tabindex', '0');

    const priceLikes = document.createElement('div');
    priceLikes.setAttribute('class', 'price');
    const likesSpan = document.createElement('span');
    likesSpan.setAttribute('class', 'compteurLikeTotal');

    const heart = document.createElement('span');
    heart.setAttribute('aria-label', 'likes');
    heart.setAttribute('class', 'fas fa-heart');
    const priceDay = document.createElement('span');
    priceDay.textContent = `${price}€ /jour`;

    photographHeader.appendChild(mainInfos);
    mainInfos.appendChild(nomPrenom);
    mainInfos.appendChild(location);
    location.appendChild(villePays);
    location.appendChild(bio);
    photographHeader.appendChild(contactButton);
    photographHeader.appendChild(profileImg);

    photographHeader.appendChild(priceLikes);
    priceLikes.appendChild(likesSpan);
    likesSpan.appendChild(heart);
    priceLikes.appendChild(priceDay);

    return (photographHeader);
  }

  // HTML layout for media
  function getMediaPage() {
    const jpg = `assets/images/${image}`;
    const mp4 = `assets/images/${video}`;

    const album = document.createElement('article');
    album.setAttribute('class', 'album');

    const caption = document.createElement('div');
    caption.setAttribute('class', 'caption');
    const albumTitle = document.createElement('h2');
    albumTitle.setAttribute('class', 'mediaTitle');
    if (title.length > 20) {
      albumTitle.textContent = `${title.substring(0, 24)}...`;
    } else {
      albumTitle.textContent = title;
    }

    const like = document.createElement('p');
    like.setAttribute('class', 'like');

    const compteur = document.createElement('span');
    compteur.setAttribute('class', 'compteur');
    compteur.textContent = `${likes} `;
    const heart = document.createElement('span');
    heart.setAttribute('aria-label', 'likes');
    heart.setAttribute('class', 'fas fa-heart incrementLike');
    heart.setAttribute('tabindex', '0');

    // If JPG -> <img>
    if (jpg.split('.').pop() === 'jpg') {
      const img = document.createElement('img');
      img.setAttribute('class', 'lightboxMedia');
      img.setAttribute('src', jpg);
      img.setAttribute('alt', title);
      img.setAttribute('tabindex', '0');

      album.appendChild(img);
      album.appendChild(caption);
      caption.appendChild(albumTitle);
      caption.appendChild(like);
      like.appendChild(compteur);
      like.appendChild(heart);
    }

    // If MP4 -> <video>
    if (mp4.split('.').pop() === 'mp4') {
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('controls', '');
      videoPlayer.setAttribute('class', 'lightboxMedia');
      const source = document.createElement('source');
      source.setAttribute('src', mp4);
      source.setAttribute('type', 'video/mp4');
      source.setAttribute('class', 'lightboxImg');
      source.setAttribute('tabindex', '0');

      album.appendChild(videoPlayer);
      videoPlayer.appendChild(source);
      album.appendChild(caption);
      caption.appendChild(albumTitle);
      caption.appendChild(like);
      like.appendChild(compteur);
      like.appendChild(heart);
    }

    return (album);
  }

  // Get likes of every media and add it to the sidebar
  function getTotalLikes() {
    let totalLikes = 0;

    data.forEach((media) => {
      totalLikes += media.likes;
    });
    // eslint-disable-next-line no-useless-concat
    document.querySelector('.compteurLikeTotal').innerHTML = `${totalLikes} ` + '<span class=\'fas fa-heart\'></span>';
  }

  // HTML layout for the form contact
  function getContactNameDOM() {
    const contactHeader = document.createElement('header');
    contactHeader.setAttribute('class', 'contact-header');
    const contact = document.createElement('div');
    contact.setAttribute('class', 'contactText');
    const contactMe = document.createElement('h3');
    contactMe.setAttribute('class', 'contactName');
    contactMe.setAttribute('aria-label', 'Contact Me');
    contactMe.textContent = 'Contactez-moi';
    const contactName = document.createElement('h4');
    contactName.setAttribute('class', 'contactName');
    contactName.textContent = name;

    const closeContact = document.createElement('img');
    closeContact.setAttribute('src', 'assets/icons/close.svg');
    closeContact.setAttribute('onclick', 'closeModal()');
    closeContact.setAttribute('alt', 'close Contact Form');
    closeContact.setAttribute('tabindex', '0');
    closeContact.setAttribute('class', 'closeModal');

    contactHeader.appendChild(contact);
    contact.appendChild(contactMe);
    contact.appendChild(contactName);
    contactHeader.appendChild(closeContact);

    return (contactHeader);
  }

  return {
    getUserCardDOM, getProfilePage, getMediaPage, getTotalLikes, getContactNameDOM,
  };
}
