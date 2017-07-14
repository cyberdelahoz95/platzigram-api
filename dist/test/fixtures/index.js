'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getImage: function getImage() {
    return {
      id: '02b353bf5358995bc7d193ed1ce9c2eaec2b694b21d2f96232c9d6a0832121d1',
      publicId: 'foo123',
      userId: 'platzigram',
      liked: false,
      likes: 0,
      src: 'http://platzigram.test/foo123.jpg',
      description: '#awesome',
      tags: ['awesome'],
      createdAt: new Date().toString()
    };
  },
  getImages: function getImages() {
    return [this.getImage(), this.getImage(), this.getImage()];
  },
  getImagesByTag: function getImagesByTag() {
    return [this.getImage(), this.getImage()];
  },
  getUser: function getUser() {
    return {
      id: '02b353bf5358995bc7d193ed1ce9c2eaec2b694b21d2f96232c9d6a0832121d1',
      name: 'Freddy Vega',
      username: 'freddier',
      email: 'f@platzi.test',
      password: 'pl4tz1',
      createdAt: new Date().toString()
    };
  }
};