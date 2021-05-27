import { Domain, Subscription} from 'effector';

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

export function saveWithFunction(domain: Domain, saveFunction: Function) {
  return domain.onCreateStore(store => {
    store.watch(value => {
      saveFunction(
        value,
      )
    })
  })
}

export function loadFromStorage(domain: Domain, storage: Storage): Subscription {
  return domain.onCreateStore(store => {
    const key = `${domain.shortName}/${store.shortName}`
    const raw = storage.getItem(key)
    if (!raw) return
    const parsed = JSON.parse(raw)
    store.setState(parsed)
  })
}