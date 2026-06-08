import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productos: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductos: (state, action) => {
            state.productos = action.payload
        }
    }
})

export const { setProductos } = productSlice.actions

export default productSlice.reducer