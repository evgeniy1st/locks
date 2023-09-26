
        
  // @ts-nocheck
  // eslint-disable
  /** 
  * ---------------------------------------------------
  * 🚗🚦 Generated by nuxt-typed-router. Do not modify !
  * ---------------------------------------------------
  * */
 


        
    
  export type RoutePathSchema = 
    "//:page"|"/"
  ;

  

  type ValidStringPath<T> = T extends `${string} ${string}` ? false : T extends '' ? false : true;

  type ValidParam<T, R extends boolean = true> = T extends `${infer A}/${infer B}`
  ? A extends `${string} ${string}`
    ? false
    : A extends `?${string}`
    ? false
    : A extends `${string} ${string}`
    ? false
    : A extends ''
    ? B extends ''
      ? true
      : false
    : B extends `?${string}`
    ? false
    : B extends `#${string}`
    ? true
    : B extends ''
    ? true
    : false
  : R extends true
  ? T extends ''
    ? false
    : ValidParam<T, false>
  : T extends `?${string}`
  ? false
  : T extends `${string} ${string}`
  ? false
  : true;

  type ValidEndOfPath<T> = T extends `/`
    ? true
    : T extends ''
    ? true
    : T extends `${string} ${string}`
    ? false 
    : T extends `?${string}`
    ? true
    : T extends `#${string}`
    ? true
    : false;

  
    type ValidateMUKTPRZ<T> = T extends `/${infer ZOXYJD}`
    ? ValidParam<ZOXYJD> extends false ? "Parameter {page} of path '//:page' is invalid" : true : false ;

    export type ValidatePath<T extends string> = T extends string 
      ? T extends '/' 
        ? T 
         :ValidateMUKTPRZ<T> extends true ? T 
      : string extends T
      ? T
      : `Error: ${ValidateMUKTPRZ<T>}`
      : never;
  
  
    export type RouteNameFromPath<T extends string> = T extends string 
      ? T extends '/' 
        ? "index"
         : ValidateMUKTPRZ<T> extends true ? "index-page" : never 
       : never; 
  
        
  


  export type TypedPathParameter<T extends string> = ValidatePath<T> | RoutePathSchema;
  

  
      