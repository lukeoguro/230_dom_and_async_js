'use strict';

class API {
  static async #get(url) {
    let response = await fetch(url);
    return await response.json();
  }

  static async #post(url, data) {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: new URLSearchParams(data).toString(),
    });
    return await response.json();
  }

  static async getPhotosData() {
    return await this.#get('photos');
  }

  static async getCommentsData(photoId) {
    return await this.#get(`/comments?photo_id=${photoId}`);
  }

  static async postLike(photoId) {
    return await this.#post('/photos/like', { photo_id: photoId });
  }

  static async postFavorite(photoId) {
    return await this.#post('/photos/favorite', { photo_id: photoId });
  }

  static async postNewComment(data) {
    return await this.#post('/comments/new', data);
  }
}

class Templater {
  #photosData;
  constructor(photosData) {
    this.#photosData = photosData;

    this.registerPartials();
    this.compileTemplates();
    this.initialize();
  }

  #templates = {};
  compileTemplates() {
    document.querySelectorAll('[type="text/x-handlebars"]').forEach(template => {
      this.#templates[template.id] = Handlebars.compile(template.innerHTML);
    });
  }

  registerPartials() {
    document.querySelectorAll("[data-type=partial]").forEach(template => {
      Handlebars.registerPartial(template.id, template.innerHTML);
    });
  }

  renderSlides() {
    const slidesEl = document.querySelector('#slides');
    const html = this.#templates.photos({ photos: this.#photosData });

    slidesEl.insertAdjacentHTML('beforeend', html);
  }

  renderPhotoInfo(photoId) {
    const headerEl = document.querySelector('section > header');
    while (headerEl.firstChild) headerEl.firstChild.remove();

    const photoData = this.#getPhotoData(photoId);
    const html = this.#templates.photo_information(photoData);
    headerEl.insertAdjacentHTML('beforeend', html);

    this.#bindInteractions();
  }

  #getPhotoData(photoId) {
    return this.#photosData.find(({ id }) => photoId === id);
  }

  #bindInteractions() {
    const likeBtn = document.querySelector('a[data-property="likes"]');
    const favoriteBtn = document.querySelector('a[data-property="favorites"]');

    likeBtn.addEventListener('click', (e) => { this.#likeHandler(e) });
    favoriteBtn.addEventListener('click', (e) => { this.#favoriteHandler(e) });
  }

  async #likeHandler(event) {
    event.preventDefault();

    const photoId = Number(event.target.dataset.id);
    const { total: newLikeCount } = await API.postLike(photoId);
    this.#getPhotoData(photoId).likes = newLikeCount;

    event.target.textContent = `♡ ${newLikeCount} Likes`;
  }

  async #favoriteHandler(event) {
    event.preventDefault();

    const photoId = Number(event.target.dataset.id);
    const { total: newFavoriteCount } = await API.postFavorite(photoId);
    this.#getPhotoData(photoId).favorites = newFavoriteCount;

    event.target.textContent = `☆ ${newFavoriteCount} Favorites`;
  }

  async renderComments(photoId) {
    const listEl = document.querySelector('div#comments > ul');
    while (listEl.firstChild) listEl.firstChild.remove();

    const html = this.#templates.photo_comments({ comments: await API.getCommentsData(photoId) });
    listEl.insertAdjacentHTML('beforeend', html);

    this.#updateCommentForm(photoId);
  }

  #updateCommentForm(photoId) {
    document.querySelector('fieldset > input[name = "photo_id"]').value = photoId;
  }

  renderNewComment(commentData) {
    const listEl = document.querySelector('div#comments > ul');
    const html = this.#templates.photo_comment(commentData);
    listEl.insertAdjacentHTML('beforeend', html);
  }

  initialize() {
    const firstPhotoId = this.#photosData[0].id;

    this.renderSlides();
    this.renderPhotoInfo(firstPhotoId);
    this.renderComments(firstPhotoId);
  }
}

class Slideshow {
  constructor(templater) {
    this.slides = document.querySelectorAll('div#slides > figure');
    this.index = 0;
    this.templater = templater;

    this.bindButtons();
  }

  bindButtons() {
    let prevButton = document.querySelector('a.prev');
    let nextButton = document.querySelector('a.next');

    prevButton.addEventListener('click', (e) => { this.#prevHandler(e) });
    nextButton.addEventListener('click', (e) => { this.#nextHandler(e) });
  }

  #prevHandler(e) {
    e.preventDefault();

    let currentSlide = this.slides[this.index];
    this.#hide(currentSlide);

    let prevIndex = (this.index === 0 ? this.slides.length - 1 : this.index - 1);
    let prevSlide = this.slides[prevIndex];
    this.#show(prevSlide);

    this.index = prevIndex;
  }

  #nextHandler(e) {
    e.preventDefault();

    let currentSlide = this.slides[this.index];
    this.#hide(currentSlide);

    let nextIndex = (this.index + 1) % this.slides.length;
    let nextSlide = this.slides[nextIndex];
    this.#show(nextSlide);

    this.index = nextIndex;
  }

  #hide(slide) {
    slide.classList.remove('show');
    slide.classList.add('hide');
  }

  #show(slide) {
    slide.classList.remove('hide');
    slide.classList.add('show');

    this.templater.renderPhotoInfo(Number(slide.dataset.id));
    this.templater.renderComments(Number(slide.dataset.id));
  }
}

async function commentFormHandler(event, templater) {
  event.preventDefault();

  const data = new FormData(event.target);
  let commentData = await API.postNewComment(data);

  templater.renderNewComment(commentData);
  event.target.reset();
}

document.addEventListener('DOMContentLoaded', async () => {
  const photosData = await API.getPhotosData();
  const templater = new Templater(photosData);

  new Slideshow(templater);

  document.querySelector('form').addEventListener('submit', (event) => {
    commentFormHandler(event, templater);
  });
});