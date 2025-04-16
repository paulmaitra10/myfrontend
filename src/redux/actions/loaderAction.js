export const isLoading=(value)=>async (dispatch)=>{
    dispatch({type:"SET_LOADER",payload:value});
}
