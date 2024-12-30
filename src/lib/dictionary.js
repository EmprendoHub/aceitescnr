import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then(module => module.default),
  es: () => import('../dictionaries/es.json').then(module => module.default)
}

export const getDictionary = async (lang) => {
  if (typeof dictionaries[lang] === 'function') {
    return dictionaries[lang]();
  } else {
    return dictionaries["en"]();
  }
};