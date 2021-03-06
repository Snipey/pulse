import { Pulse, State, Collection } from './internal';
import { extractAll } from './helpers/extractAll';
import { isWatchableObject } from './helpers/isWatchableObj';

export function cleanState<T>(state: State<T>): object {
  return {
    value: state.value,
    previousState: state.previousState,
    isSet: state.isSet,
    dependents: state.dep.deps.size,
    subscribers: state.dep.subs.size,
    name: state.name
  };
}

export function resetState(items: Iterable<State | Collection | any>) {
  for (const item of items) {
    if (item instanceof Collection) item.reset();
    if (item instanceof State) return item.reset();
    const stateSet = extractAll(State, item);
    stateSet.forEach(state => state.reset());
  }
}

export function getPulseInstance(state: State): Pulse {
  try {
    if (state.instance) return state.instance();
    else return globalThis.__pulse;
  } catch (e) {}
}

export function normalizeDeps(deps: Array<State> | State) {
  return Array.isArray(deps) ? (deps as Array<State>) : [deps as State];
}

export const copy = val => {
  // ignore if primitive type
  if (typeof val !== 'object') return val;

  if (isWatchableObject(val)) val = { ...val };
  else if (Array.isArray(val)) val = [...val];

  return val;
};

// groups are defined by the user as an array of strings, this converts them into object/keys
export function normalizeGroups(groupsAsArray: any = []) {
  const groups: object = {};
  for (let i = 0; i < groupsAsArray.length; i++) {
    const groupName = groupsAsArray[i];
    groups[groupName] = [];
  }
  return groups;
}

export function shallowmerge(source, changes) {
  let keys = Object.keys(changes);
  keys.forEach(property => {
    source[property] = changes[property];
  });

  return source;
}

export function defineConfig<C>(config: C, defaults): C {
  return { ...defaults, ...config };
}

export function genId(): string {
  return Math.random().toString().split('.')[1] + Date.now();
}

export function isFunction(func: () => any) {
  return typeof func === 'function';
}

export function isAsync(func: () => any) {
  return func.constructor.name === 'AsyncFunction';
}

export function normalizeMap(map) {
  return Array.isArray(map) ? map.map(key => ({ key, val: key })) : Object.keys(map).map(key => ({ key, val: map[key] }));
}

export function cleanse(object: any) {
  if (!isWatchableObject(object)) return object;
  const clean = Object.assign({}, object);
  const properties = Object.keys(clean);

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];

    if (isWatchableObject(clean[property])) {
      clean[property] = cleanse(clean[property]);
    }
  }
  return clean;
}

export function validateNumber(mutable, amount) {
  if (typeof amount !== 'number' || typeof mutable !== 'number') {
    return false;
  }
  return true;
}
export function normalizeArray(items: any | Array<any>): Array<any> {
  return Array.isArray(items) ? items : [items];
}
