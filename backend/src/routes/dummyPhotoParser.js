// THIS FILE IS FOR PURELY TESTING PURPOSES ONLY

const photos = [];
const apiKey = 'AIzaSyB3_9KbQ5Ali-VPfXjN9L2-kWXagOJj_lk';

const photoRefs = [
  'ATtYBwJCpVMovE0CNOl3H9jl6hgkyzkK_U3B_QtPV8x3x20BhZ7aDG8vGEuXzpOxZiXWkd8K1fXD2prsvKQujRK5hgvoV6e9mLL7mfUeCRfUZSnMSXgNZ9G06D1DADdWxB10p7XjnCPvSd8HCXDxW4k7YZYlsebxfyhKbWhAN2VHV0V208B4',
    'ATtYBwLuODchTg5OJs37BFVYFYixtG1CnPLsoZMHBfScJJDCAgiddg4gCcicTbxyagAlBdm8R0XvEVwjRvDzu2JmhAFaOOYrKVPHG8kUpNXKxFymnOHYfY-6z53BudrLX4zaSYe9VTfDH_vRyYYri0ZQ43XUDZOUn0XE0VlYUChiSw1LCAbL',
    'ATtYBwInICf4pbdhK7wmTQqBjBaaY2_ZZBoxf5-ejQPr1eqawnJ4xSn4B255Ap4aueTb5Yh4t9-_c00UHYZOn0K-z-hYn7rPTH9wgx8tfk_Kbou-iIgC3f1hdawMGhuEBJPV9RqYnL5g0Qr12WOujiwK2mDJX1Siyae1NiGH3H_hFiYiV8x7',
    'ATtYBwJXKuqF7UTI8HdWLF2ML84n2NmkfMeaUA26DE2KgMEPwN5152NacyDE_JzkZ-wOTuVAslOapdc-k78YOz_ms4QSN1T192EI-BhfXbMoOuzoBnGH8Qxpdx4KdBKCXbunVDQfr6VGPJiTLE8_kSUR5qn6pAQU6PQjzdedIXHK_Ul4szZX',
    'ATtYBwIOsfrAQj5oF-AdY0NYH9nUz4m1gmlELFDgpJnwHZTh0wCQmUE4qJlCd-ymZjy86QCoV5AXOUsMtUuW754oO3xKkPP0QWjoBOol32s-20OBolkKgw_RWq-RrBomuXzyfPQKU2RObnMv_T-Td0dCFLudTyHT0eoPLjuxfmcMoC8XpctK',
    'ATtYBwKie-OMRs0vr1u39QzVLVLqBIMG7Tn6UyOcptRrFMSL_1OgbuwV17rq60vaMzOGtBqTgPHAt5WQxA9pI2jv4UhpkyT300TkiDB9ynUyRG4_KinG9S_bfaJLjoDhHMia9PjiJ96T90egjdKxGtdTeEwruPxBrNHw8MTyxm9zVV6Uf-ul',
];

for (var i in photoRefs) {
  if (i < photoRefs.length) {
    photos.push(`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRefs[i]}&key=${apiKey}&maxheight=600&maxwidth=600`);
  }
}

exports.photos = photos;
