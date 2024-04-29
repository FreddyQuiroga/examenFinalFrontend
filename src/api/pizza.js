import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const pizzaApi = createApi({

    reducerPath: 'pizzas',
    onError: (error) => {
      console.error('API error:', error);
    },
    baseQuery: retry(fetchBaseQuery({ 
      baseUrl: 'http://localhost:3000',
      prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('sessionJWTToken')
        if (token) {
          headers.set('x-access-token', `${token}`)
        }

        return headers
      },},
    ),
    {maxRetries:1}),

    keepUnusedDataFor: 60,    //Tiempo que se matendra la data en el cache, time in sec
    refetchOnMountOrArgChange: true,  // Revalida lo datos en cada cambio
    refetchOnFocus: true,       // Cuando pone el foco en la informacion revalida
    refetchOnReconnect:true,    // Revalida los datos cuando hay Red

    tagTypes: ["Pizzas"],

    endpoints: (builder) => ({

        getPizzas: builder.query({
            query: () => '/pizzas',
            providesTags: ["Pizzas"],
        }),

        addNewPizza: builder.mutation({
          query: ( newPizza ) => {
            return {
              url: '/pizzas',
              method: 'POST',
              body: newPizza
            };
          },
          invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
        }),

      updatePizza: builder.mutation({
        query(data){
          // const { id, value } = data
          return {
            url: `/pizzas/${data._id}`,
            method: 'PUT',
            body: data,
          }
        },
        invalidatesTags: ["Pizzas"],
        extraOptions: {maxRetries:2}
      }),

      deletePizza: builder.mutation({
        query(id){

          return {
            url: `/pizzas/${id}`,
            method: 'DELETE'
          }
        },
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
        extraOptions: {maxRetries:2}
      }),

      findByDescription: builder.mutation({
        query: (des) => `/pizzas/advanced/byDescripcion/${des}`,
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
      }),

      priceGreaterThan: builder.mutation({
        query: (price) => `/pizzas/advanced/priceGreaterThan/${price}`,
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
      }),
      
      getPizzasByNameStartingWith: builder.mutation({
        query: (size) => `/pizzas/advanced/getPizzasByNameStartingWith/${size}`,
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
      }),

      getPizzasByNameStartingWith: builder.mutation({
        query: (size) => ({
          url: `/pizzas/advanced/getPizzasByNameStartingWith`,
          method: 'PUT',
          body: { letra: size },
        }),
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
      }),

      sortedByPriceDesc: builder.mutation({
        query: () => `/pizzas/advanced/sortedByPriceDesc`,
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
      }),

      mostExpensivePizza: builder.mutation({
        query: () => `/pizzas/advanced/mostExpensivePizza`,
        invalidatesTags: ["Pizzas"], // Invalida la caché de la consulta getPizzas
      }),
      

    })

})

export const { 
 useGetAllPizzasQuery,
  useAddNewPizzaMutation,
  useUpdatePizzaMutation,
  useDeletePizzaMutation,
  useGetPizzasQuery,
  useFindByDescriptionMutation,
  usePriceGreaterThanMutation,
  useGetPizzasByNameStartingWithMutation,
  useSortedByPriceDescMutation,
  useMostExpensivePizzaMutation,
 } = pizzaApi;