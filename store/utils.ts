import { Domain} from 'effector';

export function saveToStorage(domain: Domain, storage: Storage) {
  return domain.onCreateStore(store => {
    const key = `${domain.shortName}/${store.shortName}`
    store.watch(value => {
      storage.setItem(
        key,
        JSON.stringify(value),
      )
    })
  })
}

export function loadFromStorage(domain: Domain, storage: Storage) {
  return domain.onCreateStore(store => {
    const key = `${domain.shortName}/${store.shortName}`
    const raw = storage.getItem(key)
    console.log(raw);
    if (!raw) return
    const parsed = JSON.parse(raw)
    store.setState(parsed)
  })
}