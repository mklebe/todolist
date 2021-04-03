import { createDomain } from 'effector';
import { loadFromStorage, saveToStorage } from './utils';

const productFeatureList = createDomain('productFeatureList');

loadFromStorage(productFeatureList, localStorage);
saveToStorage(productFeatureList, localStorage);

export interface ProductFeature {
  id: number;
  title: string;
  done: boolean;
  impact: number;
  effort: number;
}

export const setInitialFeatureTitle = productFeatureList.createEvent<string>();
export const setInitialFeatureImpact = productFeatureList.createEvent<number>();
export const setInitialFeatureEffort = productFeatureList.createEvent<number>();

export const addProductFeature = productFeatureList.createEvent();
export const deleteProductFeature = productFeatureList.createEvent<number>();
export const achieveProductFeature = productFeatureList.createEvent<number>();
export const completeProductFeature = productFeatureList.createEvent<number>();

const add = (features: ProductFeature[], {title, impact, effort}: InitialProductFeature): ProductFeature[] => [
  ...features,
  {
    id: Math.max(0, Math.max(...features.map(({ id }) => id))) + 1,
    done: false,
    title,
    impact,
    effort,
  }
];

const toggle = (features: ProductFeature[], id: number): ProductFeature[] =>
  features.map((feature) => {
    console.log(feature)
    return {
      ...feature,
      done: feature.id === id ? !feature.done : feature.done,
    };
  });

const remove = (features: ProductFeature[], id: number): ProductFeature[] => features.filter((f) => f.id !== id);

const achive = (features: ProductFeature[], id: number): ProductFeature[] =>
  features.map((f) => ({
    ...f,
    done: f.id === id ? true : f.done,
  }));

type InitialProductFeature = Pick<ProductFeature, 'title' | 'effort' | 'impact'>;

type Store = {
  features: ProductFeature[];
  initalFeature: InitialProductFeature,
}

const productFeatureMap = productFeatureList.createStore<Store>({
  features: [],
  initalFeature: {
    title: '',
    impact: 1,
    effort: 1,
  }
});

export default productFeatureMap
  .on(setInitialFeatureTitle, (state, title) => ({
    ...state,
    initalFeature: {
      ...state.initalFeature,
      title,
    }
  }))
  .on(setInitialFeatureImpact, (state, impact) => ({
    ...state,
    initalFeature: {
      ...state.initalFeature,
      impact,
    }
  }))
  .on(setInitialFeatureEffort, (state, effort) => ({
    ...state,
    initalFeature: {
      ...state.initalFeature,
      effort,
    }
  }))
  .on(addProductFeature, (state) => ({
    ...state,
    features: add(state.features, state.initalFeature),
    initalFeature: {
      title: '',
      impact: 1,
      effort: 1,
    }
  }))
  .on(deleteProductFeature, (state, id) => ({
    ...state,
    features: remove(state.features, id),
  }))
  .on(achieveProductFeature, (state, id) => ({
    ...state,
    features: achive(state.features, id),
  }))
  .on(completeProductFeature, (state, id) => ({
    ...state,
    features: toggle(state.features, id),
  }))
;
