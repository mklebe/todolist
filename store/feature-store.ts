import { createDomain } from 'effector';
import firebase from 'firebase/app';
import 'firebase/database';

const productFeatureList = createDomain('productFeatureList');

const firebaseConfig = {
  apiKey: "AIzaSyB10HEW3qg5l3khyHzXtbgUKEkeJSeA11M",
  authDomain: "todolist-d887f.firebaseapp.com",
  databaseURL: "https://todolist-d887f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-d887f",
  storageBucket: "todolist-d887f.appspot.com",
  messagingSenderId: "287249167474",
  appId: "1:287249167474:web:c501dbfa9a516d9df3feeb",
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
// Get default database from firebase; currently there is only one database
const db = firebase.app().database();

// // Create a pointer to the database in the cloud, to put data in the database
const databaseReference = db.ref("features");

productFeatureList.onCreateStore(async (store) => {
  const snapshot = databaseReference.get();
  const initialState = (await snapshot).val();
  store.setState(initialState);

  store.watch(value => {
    databaseReference.set(value);
  });
});

export interface ProductFeature {
  id: number;
  title: string;
  done: boolean;
  impact: number;
  effort: number;
}

type InitialProductFeature = Pick<ProductFeature, 'title' | 'effort' | 'impact'>;

type Store = {
  featureList: ProductFeature[];
  initalFeature: InitialProductFeature,
}

databaseReference.on('value', snap => {
  console.log(snap.val());
})

const productFeatureMap = productFeatureList.createStore<Store>({
  featureList: [],
  initalFeature: {
    title: '',
    impact: 1,
    effort: 1,
  }
});

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

const complete = (features: ProductFeature[], id: number): ProductFeature[] =>
  features.map((feature) => {
    return {
      ...feature,
      done: feature.id === id ? true : feature.done,
    };
  }
);

const remove = (features: ProductFeature[], id: number): ProductFeature[] => features.filter((f) => f.id !== id);

const achive = (features: ProductFeature[], id: number): ProductFeature[] =>
  features.map((f) => ({
    ...f,
    done: f.id === id ? true : f.done,
  }));

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
    featureList: add(state.featureList, state.initalFeature),
    initalFeature: {
      title: '',
      impact: 1,
      effort: 1,
    }
  }))
  .on(deleteProductFeature, (state, id) => ({
    ...state,
    featureList: remove(state.featureList, id),
  }))
  .on(achieveProductFeature, (state, id) => ({
    ...state,
    featureList: achive(state.featureList, id),
  }))
  .on(completeProductFeature, (state, id) => ({
    ...state,
    featureList: complete(state.featureList, id),
  }))
;
