const STORAGE_PREFIX = 'article_heart:'

function keyFor(id) {
  return `${STORAGE_PREFIX}${id}`
}

function isLiked(id) {
  try {
    return window.localStorage.getItem(keyFor(id)) === '1'
  } catch {
    return false
  }
}

function setLiked(id, liked) {
  try {
    window.localStorage.setItem(keyFor(id), liked ? '1' : '0')
  } catch {
    /* no-op */
  }
}

function updateButton(button, liked) {
  button.classList.toggle('is-active', liked)
  button.setAttribute('aria-pressed', liked ? 'true' : 'false')

  const textEl = button.querySelector('[data-article-heart-text]')
  if (textEl) textEl.textContent = liked ? 'Liked' : 'Like'
}

function initHeartButton(button) {
  const articleId = button.getAttribute('data-article-heart')
  if (!articleId) return

  updateButton(button, isLiked(articleId))

  button.addEventListener('click', () => {
    const next = !isLiked(articleId)
    setLiked(articleId, next)
    updateButton(button, next)
  })
}

document.querySelectorAll('[data-article-heart]').forEach(initHeartButton)

