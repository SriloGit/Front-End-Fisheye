 //Utils class for other function
 class PhotographerUtils {
    // sort media switch criteria
    sortMedia (tri, mediaArray) {
      const titre = document.querySelectorAll('.titre');
      const date = document.getElementById('date');
      const popularite = document.getElementById('popularite');
      // Manage top border layout
      titre[0].style.display = 'block';
      titre[1].style.display = 'block';
      date.style.display = 'block';

      if (tri === 'titre') {
        titre[0].style.display = 'none';
        titre[1].style.display = 'none';
        popularite.style.display = 'block';
        mediaArray.sort(function (a, b) {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })
      }
  
      if (tri === 'date') {
        date.style.display = 'none';
        popularite.style.display = 'block';
        mediaArray = mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date))
      }
  
      if (tri === 'popularite') {
        popularite.style.display = 'none';
        mediaArray = mediaArray.sort(function (a, b) {
          return b.likes - a.likes
        })

      }
  
      return mediaArray
    }
  
    // Add 1 heart to the media and photograph
    incrementLike (coeurIcon) {
      const compteur = coeurIcon.parentNode.querySelector('.compteur') // We get the compteur from the parent
      const compteurTotal = document.querySelector('.compteurLikeTotal');
      compteurTotal.innerHTML = parseInt(compteurTotal.innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
      compteur.innerHTML = parseInt(compteur.innerHTML) + 1 + ' ';
    }
  
    initLightbox () {
  

      const lightbox = document.getElementById('lightbox');
  
  
      const allMedia = document.querySelectorAll('.lightboxMedia')
      const util = this;

      allMedia.forEach(function (media, index){
  
        media.addEventListener('click', e => {
  
          lightbox.classList.add('active')
  
          //Use the function to show media
          util.showMedia(index);
  
          
        })
  
      });
  
    }
  
    // Get the media at his index
    showMedia(index)
    {
      const util = this;
  
      // reset la lightbox
      document.getElementById('lightbox').innerHTML = ""
  
      const allMedia = document.querySelectorAll('.lightboxMedia')
  
      const source = allMedia[index].src
  
      // If media = image
      if (source.split('.').pop() === 'jpg') {
  
        const container = document.createElement('div')
        container.setAttribute('class', 'container')
        
        const img = document.createElement('img')
        img.src = allMedia[index].src
        img.setAttribute('alt', allMedia[index].alt )
  
        const caption = document.createElement('h2');
        caption.setAttribute('class', 'title');
        caption.innerHTML = allMedia[index].alt
  
        document.getElementById('lightbox').appendChild(container)
        container.appendChild(img)
        container.appendChild(caption)
      }
  
      // If media = video
      else if (allMedia[index].querySelector('source').src.split('.').pop() === 'mp4') {
  
  
        const container = document.createElement('div')
        container.setAttribute('class', 'container')
  
        const video = document.createElement('video')
        const source = document.createElement('source')
  
        video.setAttribute('controls', '')
        source.src = allMedia[index].querySelector('source').src
        source.setAttribute('type', 'video/mp4')
  
        const captionContainer = document.createElement('div')
        captionContainer.setAttribute('class', 'captionContainer')
  
        const caption = document.createElement('h2');
        caption.setAttribute('class', 'title');
        caption.innerHTML = allMedia[index].parentNode.querySelector('h2').innerHTML
  
  
        document.getElementById('lightbox').appendChild(container)
        container.appendChild(video)
        video.appendChild(source)
        container.appendChild(caption)
      }
  
      const closeCursor = document.createElement('span')
      closeCursor.setAttribute('id', 'close')
      closeCursor.setAttribute('aria-label', 'Close dialog')
      closeCursor.addEventListener('click', e => {
        
        document.getElementById('lightbox').classList.remove('active')
        
      })
      closeCursor.innerHTML = '&times;'
  
      // Previous arrow
      const prev = document.createElement('a');
      prev.setAttribute('id', 'previousMedia')
      prev.setAttribute('class', 'prev')
      prev.setAttribute('aria-label', 'Previous image')
      prev.innerHTML = '&#10094;';
  
      prev.addEventListener('click', e => {
  
        if(index === 0)
        {
          util.showMedia(allMedia.length - 1)
        }else {
          util.showMedia(index - 1)
        }
  
      })
  
      // Next arrow
      const next = document.createElement('a');
      next.setAttribute('id', 'nextMedia')
      next.setAttribute('class', 'next')
      next.setAttribute('aria-label', 'Next image')
      next.innerHTML = '&#10095;';
      next.addEventListener('click', e => {

        //If index is higher than the number of media we go back to the first media 
        if(index === allMedia.length - 1)
        {
          util.showMedia(0)
        }else{
  
          util.showMedia(index + 1)
  
        }
  
      })
  
  
      // insertion dans le dom
      document.getElementById('lightbox').appendChild(closeCursor)
      document.getElementById('lightbox').appendChild(prev)
      document.getElementById('lightbox').appendChild(next)
  
    }
  
    //permet de naviguer dans la lightbox avec les flèches du clavier
  
     arrowKey(event) {
       //je bind un évènement sur les médias
  
         event.preventDefault(); //prevent default arrow key behavior
         const key = event.key; // "ArrowRight", "ArrowLeft"
  
         switch (event.key) {
           //si flèche gauche pressée
           case "ArrowLeft":
             //simule un clique sur l'élément défini
             document.getElementById('previousMedia').click()
             break;
  
             //si flèche droite pressée
           case "ArrowRight":
             document.getElementById('nextMedia').click()
             break;
         }
  
  
  
     }
  
  }